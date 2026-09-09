from typing import Optional, Any
from pydantic import BaseModel

class KPISummary(BaseModel):
    totalInstruments: int
    pendingVerifications: int
    verifiedThisMonth: int
    expiringIn30Days: int
    activeOfficers: int

class AuditLogResponse(BaseModel):
    id: str
    actor_id: Optional[str] = None
    action: str
    target_id: Optional[str] = None
    details: Optional[str] = None
    timestamp: str

    class Config:
        from_attributes = True

class AuditLogCreate(BaseModel):
    actor_id: Optional[str] = None
    action: str
    target_id: Optional[str] = None
    details: Optional[str] = None
