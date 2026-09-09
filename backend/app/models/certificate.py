from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(String(50), primary_key=True, index=True)
    application_id = Column(String(50), ForeignKey("applications.id"), unique=True, nullable=False)
    instrument_id = Column(String(50), ForeignKey("instruments.id"), nullable=False, index=True)
    qr_payload = Column(Text, nullable=False)
    issue_date = Column(String(50), nullable=False)
    expiry_date = Column(String(50), nullable=False)
    status = Column(String(50), nullable=False, default="active")  # active | expired | revoked
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    application = relationship("Application", back_populates="certificate")
    instrument = relationship("Instrument", back_populates="certificates")
