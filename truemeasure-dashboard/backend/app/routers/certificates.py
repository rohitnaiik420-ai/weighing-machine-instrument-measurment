import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.certificate import Certificate
from backend.app.models.instrument import Instrument
from backend.app.models.user import User
from backend.app.schemas.certificate import CertificateResponse, QRValidationResponse
from backend.app.auth.rbac import get_current_user

router = APIRouter(prefix="/certificates", tags=["Digital Certificates & QR Validation"])

@router.get("", response_model=list[CertificateResponse])
def list_certificates(
    owner_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    List certificates.
    Applicants see certificates for their instruments; officers/admins see all.
    """
    query = db.query(Certificate)
    
    if current_user.role == "applicant":
        user_inst_ids = [i.id for i in db.query(Instrument).filter(Instrument.owner_id == current_user.id).all()]
        query = query.filter(Certificate.instrument_id.in_(user_inst_ids))
    elif owner_id:
        user_inst_ids = [i.id for i in db.query(Instrument).filter(Instrument.owner_id == owner_id).all()]
        query = query.filter(Certificate.instrument_id.in_(user_inst_ids))
        
    return query.all()

@router.get("/{cert_id}", response_model=CertificateResponse)
def get_certificate(
    cert_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get single digital certificate by ID."""
    cert = db.query(Certificate).filter(Certificate.id == cert_id).first()
    if not cert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certificate not found")
    return cert

@router.get("/verify-qr/{code}", response_model=QRValidationResponse)
def verify_qr(code: str, db: Session = Depends(get_db)):
    """
    Public QR Code validation endpoint (no authentication required).
    Verifies authenticity of printed/scanned digital certificates on field weighing machines.
    """
    cert = db.query(Certificate).filter(
        (Certificate.id == code) | (Certificate.qr_payload.contains(code))
    ).first()
    
    if not cert:
        return QRValidationResponse(
            valid=False,
            certificate_id=code,
            status="unregistered_or_forged",
            authority="Legal Metrology Department",
            message="No active government verification record found for this code. Potential fraud."
        )
        
    inst = db.query(Instrument).filter(Instrument.id == cert.instrument_id).first()
    owner = db.query(User).filter(User.id == inst.owner_id).first() if inst else None
    
    return QRValidationResponse(
        valid=(cert.status == "active"),
        certificate_id=cert.id,
        instrument_id=cert.instrument_id,
        owner_name=owner.name if owner else "Unknown",
        category=inst.category if inst else "Unknown",
        serial_number=inst.serial_number if inst else "Unknown",
        issue_date=cert.issue_date,
        expiry_date=cert.expiry_date,
        status=cert.status,
        authority="Legal Metrology Department, Govt of India",
        message="Government digital certificate successfully validated and authenticated."
    )
