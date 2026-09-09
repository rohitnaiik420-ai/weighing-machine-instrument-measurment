from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Instrument(Base):
    __tablename__ = "instruments"

    id = Column(String(50), primary_key=True, index=True)
    owner_id = Column(String(50), ForeignKey("users.id"), nullable=False, index=True)
    category = Column(String(100), nullable=False)
    model_number = Column(String(100), nullable=False)
    serial_number = Column(String(100), nullable=False)
    manufacturer = Column(String(100), nullable=False)
    capacity = Column(String(50), nullable=False)
    accuracy_class = Column(String(50), nullable=False)
    location = Column(String(200), nullable=False)
    installation_date = Column(String(50), nullable=True)
    status = Column(String(50), nullable=False, default="registered")
    last_verified_date = Column(String(50), nullable=True)
    expiry_date = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    owner = relationship("User", back_populates="instruments")
    applications = relationship("Application", back_populates="instrument", cascade="all, delete-orphan")
    certificates = relationship("Certificate", back_populates="instrument", cascade="all, delete-orphan")
