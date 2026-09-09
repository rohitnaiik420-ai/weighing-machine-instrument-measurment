from typing import Optional, Any
from pydantic import BaseModel

class ApplicationCreate(BaseModel):
    instrument_id: str
    documents: Optional[list[Any]] = None
    ocr_extract: Optional[dict[str, Any]] = None

class AssignOfficerRequest(BaseModel):
    officer_id: str
    schedule_date: str

class FieldVerificationRequest(BaseModel):
    checklist: Optional[dict[str, bool]] = None
    gps_coordinates: Optional[str] = None
    findings: Optional[str] = None
    inspection_photos: Optional[list[str]] = None
    standards_used: Optional[str] = None

class DecisionRequest(BaseModel):
    decision: str  # verified | rejected | re_verification
    reason: str

class ApplicationResponse(BaseModel):
    id: str
    instrument_id: str
    applicant_id: str
    status: str
    documents: Optional[list[Any]] = None
    ocr_extract: Optional[dict[str, Any]] = None
    assigned_officer_id: Optional[str] = None
    schedule_date: Optional[str] = None
    field_verification: Optional[dict[str, Any]] = None
    decision: Optional[str] = None
    decision_date: Optional[str] = None
    decision_reason: Optional[str] = None
    certificate_id: Optional[str] = None
    created_at: str

    class Config:
        from_attributes = True
