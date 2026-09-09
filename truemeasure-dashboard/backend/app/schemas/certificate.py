from typing import Optional, Any
from pydantic import BaseModel

class CertificateResponse(BaseModel):
    id: str
    application_id: str
    instrument_id: str
    qr_payload: str
    issue_date: str
    expiry_date: str
    status: str

    class Config:
        from_attributes = True

class QRValidationResponse(BaseModel):
    valid: bool
    certificate_id: str
    instrument_id: Optional[str] = None
    owner_name: Optional[str] = None
    category: Optional[str] = None
    serial_number: Optional[str] = None
    issue_date: Optional[str] = None
    expiry_date: Optional[str] = None
    status: str
    authority: str
    message: str
