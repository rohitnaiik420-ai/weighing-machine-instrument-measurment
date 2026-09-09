from datetime import date
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.instrument import Instrument
from backend.app.models.user import User
from backend.app.models.audit_log import AuditLog
from backend.app.schemas.instrument import InstrumentCreate, InstrumentUpdate, InstrumentResponse
from backend.app.auth.rbac import get_current_user

router = APIRouter(prefix="/instruments", tags=["Instruments"])

@router.get("", response_model=list[InstrumentResponse])
def get_instruments(
    owner_id: Optional[str] = None,
    status_filter: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get instruments. Applicants see their own; officers and admins see all
    or filter by owner_id or status.
    """
    query = db.query(Instrument)
    
    if current_user.role == "applicant":
        query = query.filter(Instrument.owner_id == current_user.id)
    elif owner_id:
        query = query.filter(Instrument.owner_id == owner_id)
        
    if status_filter:
        query = query.filter(Instrument.status == status_filter)
        
    return query.all()

@router.get("/{instrument_id}", response_model=InstrumentResponse)
def get_instrument(
    instrument_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Retrieve details for a single instrument."""
    inst = db.query(Instrument).filter(Instrument.id == instrument_id).first()
    if not inst:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instrument not found")
    
    if current_user.role == "applicant" and inst.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
        
    return inst

@router.post("", response_model=InstrumentResponse, status_code=status.HTTP_201_CREATED)
def register_instrument(
    instrument_in: InstrumentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Register a new weighing/measuring instrument."""
    owner_id = instrument_in.owner_id if (instrument_in.owner_id and current_user.role in ["admin", "officer"]) else current_user.id
    
    count = db.query(Instrument).count()
    new_id = f"INS-{str(count + 1).zfill(3)}"
    
    today_str = date.today().isoformat()
    new_inst = Instrument(
        id=new_id,
        owner_id=owner_id,
        category=instrument_in.category,
        model_number=instrument_in.model_number,
        serial_number=instrument_in.serial_number,
        manufacturer=instrument_in.manufacturer,
        capacity=instrument_in.capacity,
        accuracy_class=instrument_in.accuracy_class,
        location=instrument_in.location,
        installation_date=instrument_in.installation_date or today_str,
        status="registered"
    )
    db.add(new_inst)
    
    # Audit log entry
    audit_count = db.query(AuditLog).count()
    audit_entry = AuditLog(
        id=f"AUD-{str(audit_count + 1).zfill(3)}",
        actor_id=current_user.id,
        action="Registered Instrument",
        target_id=new_id,
        details=f"Category: {instrument_in.category}, S/N: {instrument_in.serial_number}",
        timestamp=today_str
    )
    db.add(audit_entry)
    
    db.commit()
    db.refresh(new_inst)
    return new_inst

@router.put("/{instrument_id}", response_model=InstrumentResponse)
def update_instrument(
    instrument_id: str,
    update_data: InstrumentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update instrument fields."""
    inst = db.query(Instrument).filter(Instrument.id == instrument_id).first()
    if not inst:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Instrument not found")
        
    for key, value in update_data.model_dump(exclude_unset=True).items():
        setattr(inst, key, value)
        
    db.commit()
    db.refresh(inst)
    return inst
