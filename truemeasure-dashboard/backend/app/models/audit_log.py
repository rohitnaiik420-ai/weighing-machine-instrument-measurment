from datetime import datetime
from sqlalchemy import Column, String, DateTime, Text
from backend.app.database import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(50), primary_key=True, index=True)
    actor_id = Column(String(50), nullable=True, index=True)
    action = Column(String(150), nullable=False, index=True)
    target_id = Column(String(50), nullable=True, index=True)
    details = Column(Text, nullable=True)
    timestamp = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
