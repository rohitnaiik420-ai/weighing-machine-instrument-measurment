from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from backend.app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False, default="applicant")  # applicant | officer | admin
    phone = Column(String(20), nullable=True)
    business_name = Column(String(150), nullable=True)
    region = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    instruments = relationship("Instrument", back_populates="owner", cascade="all, delete-orphan")
    applications = relationship("Application", foreign_keys="Application.applicant_id", back_populates="applicant")
    assigned_applications = relationship("Application", foreign_keys="Application.assigned_officer_id", back_populates="officer")
