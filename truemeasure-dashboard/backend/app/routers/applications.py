import json
from datetime import date, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.application import Application
from backend.app.models.instrument import Instrument
from backend.app.models.certificate import Certificate
from backend.app.models.audit_log import AuditLog
from backend.app.models.user import User
from backend.app.schemas.application import (
    ApplicationCreate, AssignOfficerRequest, FieldVerificationRequest,
    DecisionRequest, ApplicationResponse
)
from backend.app.auth.rbac import get_current_user, require_roles

router = APIRouter(prefix="/applications", tags=["Applications & Verification Lifecycle"])

@router.get("", response_model=list[ApplicationResponse])
def list_applications(
    status_filter: Optional[str] = None,
    officer_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    List applications based on role.
    Applicants see their own; officers see assigned ones; admins see all.
    """
    query = db.query(Application)
    
    if current_user.role == "applicant":
        query = query.filter(Application.applicant_id == current_user.id)
    elif current_user.role == "officer":
        query = query.filter(Application.assigned_officer_id == current_user.id)
    elif officer_id:
        query = query.filter(Application.assigned_officer_id == officer_id)
        
    if status_filter:
        query = query.filter(Application.status == status_filter)
        
    return query.all()

@router.get("/{application_id}", response_model=ApplicationResponse)
def get_application(
    application_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Retrieve full application details by ID."""
    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
        
    if current_user.role == "applicant" and app.applicant_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
        
    return app

@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def create_application(
    app_in: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Submit a new verification application for a registered instrument.
    (Step 3 & 4 in Hackathon Implementation Flow)
    """
    inst = db.query(Instrument).filter(Instrument.id == app_in.instrument_id).first()
    if not inst:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instrument not found")
        
    count = db.query(Application).count()
    app_id = f"APP-{str(count + 1).zfill(3)}"
    today_str = date.today().isoformat()
    
    new_app = Application(
        id=app_id,
        instrument_id=app_in.instrument_id,
        applicant_id=current_user.id,
        status="submitted",
        documents=app_in.documents or [],
        ocr_extract=app_in.ocr_extract or {},
        created_at=today_str
    )
    inst.status = "submitted"
    
    db.add(new_app)
    
    # Audit trail
    audit_count = db.query(AuditLog).count()
    db.add(AuditLog(
        id=f"AUD-{str(audit_count + 1).zfill(3)}",
        actor_id=current_user.id,
        action="Application Submitted",
        target_id=app_id,
        details=f"Verification request filed for {inst.category} ({inst.id})",
        timestamp=today_str
    ))
    
    db.commit()
    db.refresh(new_app)
    return new_app

@router.put("/{application_id}/assign", response_model=ApplicationResponse)
def assign_officer(
    application_id: str,
    assign_in: AssignOfficerRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "officer"))
):
    """
    Assign an inspector/officer and schedule field verification date.
    (Step 5 in Hackathon Implementation Flow)
    """
    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
        
    officer = db.query(User).filter(User.id == assign_in.officer_id, User.role == "officer").first()
    if not officer:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Target user is not an active officer")
        
    app.assigned_officer_id = assign_in.officer_id
    app.scheduleDate = assign_in.schedule_date
    app.schedule_date = assign_in.schedule_date
    app.status = "officer_assigned"
    
    inst = db.query(Instrument).filter(Instrument.id == app.instrument_id).first()
    if inst:
        inst.status = "officer_assigned"
        
    audit_count = db.query(AuditLog).count()
    db.add(AuditLog(
        id=f"AUD-{str(audit_count + 1).zfill(3)}",
        actor_id=current_user.id,
        action="Officer Assigned",
        target_id=app.id,
        details=f"Assigned to {officer.name} for schedule on {assign_in.schedule_date}",
        timestamp=date.today().isoformat()
    ))
    
    db.commit()
    db.refresh(app)
    return app

@router.post("/{application_id}/verification", response_model=ApplicationResponse)
def submit_field_verification(
    application_id: str,
    verif_in: FieldVerificationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("officer", "admin"))
):
    """
    Submit on-site field verification checklist, GPS coordinate stamps, and photos.
    Transitions stage to 'decision'.
    """
    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
        
    app.field_verification = verif_in.model_dump()
    app.status = "decision"
    
    inst = db.query(Instrument).filter(Instrument.id == app.instrument_id).first()
    if inst:
        inst.status = "decision"
        
    db.commit()
    db.refresh(app)
    return app

@router.post("/{application_id}/decision", response_model=ApplicationResponse)
def submit_decision(
    application_id: str,
    decision_in: DecisionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("officer", "admin"))
):
    """
    Final verification decision.
    - Verified: Generates Digital Certificate + tamper-proof QR code + updates instrument.
    - Non-Verified/Rejected: Records reason and flags for Re-Verification.
    """
    app = db.query(Application).filter(Application.id == application_id).first()
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
        
    today_str = date.today().isoformat()
    app.decision = decision_in.decision
    app.decision_date = today_str
    app.decision_reason = decision_in.reason
    
    inst = db.query(Instrument).filter(Instrument.id == app.instrument_id).first()
    
    if decision_in.decision == "verified":
        app.status = "certified"
        cert_count = db.query(Certificate).count()
        cert_id = f"CERT-{str(cert_count + 1).zfill(3)}"
        expiry_str = (date.today() + timedelta(days=365)).isoformat()
        
        qr_data = {
            "cert": cert_id,
            "instrument": inst.id if inst else "N/A",
            "category": inst.category if inst else "N/A",
            "serial": inst.serial_number if inst else "N/A",
            "verified": today_str,
            "expiry": expiry_str,
            "officer": current_user.name,
            "authority": "Legal Metrology Department, Govt of India"
        }
        
        new_cert = Certificate(
            id=cert_id,
            application_id=app.id,
            instrument_id=app.instrument_id,
            qr_payload=json.dumps(qr_data),
            issue_date=today_str,
            expiry_date=expiry_str,
            status="active"
        )
        db.add(new_cert)
        app.certificate_id = cert_id
        
        if inst:
            inst.status = "certified"
            inst.last_verified_date = today_str
            inst.expiry_date = expiry_str
            
        action_name = "Certificate Issued"
        action_detail = f"Verified by {current_user.name}. Certificate {cert_id} generated."
    elif decision_in.decision == "re_verification":
        app.status = "re_verification"
        if inst:
            inst.status = "re_verification"
        action_name = "Re-Verification Requested"
        action_detail = f"Discrepancies found: {decision_in.reason}"
    else:
        app.status = "rejected"
        if inst:
            inst.status = "rejected"
        action_name = "Application Rejected"
        action_detail = f"Reason: {decision_in.reason}"
        
    audit_count = db.query(AuditLog).count()
    db.add(AuditLog(
        id=f"AUD-{str(audit_count + 1).zfill(3)}",
        actor_id=current_user.id,
        action=action_name,
        target_id=app.id,
        details=action_detail,
        timestamp=today_str
    ))
    
    db.commit()
    db.refresh(app)
    return app
