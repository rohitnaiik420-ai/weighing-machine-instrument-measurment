from typing import Optional
from pydantic import BaseModel

class InstrumentBase(BaseModel):
    category: str
    model_number: str
    serial_number: str
    manufacturer: str
    capacity: str
    accuracy_class: str
    location: str
    installation_date: Optional[str] = None

class InstrumentCreate(InstrumentBase):
    owner_id: Optional[str] = None

class InstrumentUpdate(BaseModel):
    category: Optional[str] = None
    model_number: Optional[str] = None
    serial_number: Optional[str] = None
    manufacturer: Optional[str] = None
    capacity: Optional[str] = None
    accuracy_class: Optional[str] = None
    location: Optional[str] = None
    status: Optional[str] = None

class InstrumentResponse(InstrumentBase):
    id: str
    owner_id: str
    status: str
    last_verified_date: Optional[str] = None
    expiry_date: Optional[str] = None

    class Config:
        from_attributes = True
