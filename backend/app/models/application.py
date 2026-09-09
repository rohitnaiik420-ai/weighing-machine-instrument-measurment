from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Application(Base):
    __tablename__ = "applications"

    id = Column(String(50), primary_key=True, index=True)
    instrument_id = Column(String(50), ForeignKey("instruments.id"), nullable=False, index=True)
    applicant_id = Column(String(50), ForeignKey("users.id"), nullable=False, index=True)
    status = Column(String(50), nullable=False, default="submitted")
    documents = Column(JSON, default=list)
    ocr_extract = Column(JSON, default=dict)
    assigned_officer_id = Column(String(50), ForeignKey("users.id"), nullable=True, index=True)
    schedule_date = Column(String(50), nullable=True)
    field_verification = Column(JSON, nullable=True)
    decision = Column(String(50), nullable=True)  # verified | rejected | re_verification
    decision_date = Column(String(50), nullable=True)
    decision_reason = Column(Text, nullable=True)
    certificate_id = Column(String(50), nullable=True)
    created_at = Column(String(50), nullable=False)

    # Relationships
    instrument = relationship("Instrument", back_populates="applications")
    applicant = relationship("User", foreign_keys=[applicant_id], back_populates="applications")
    officer = relationship("User", foreign_keys=[assigned_officer_id], back_populates="assigned_applications")
    certificate = relationship("Certificate", back_populates="application", uselist=False)
