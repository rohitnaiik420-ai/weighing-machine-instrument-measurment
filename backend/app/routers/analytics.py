from datetime import date, timedelta
from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.instrument import Instrument
from backend.app.models.application import Application
from backend.app.models.certificate import Certificate
from backend.app.models.user import User
from backend.app.schemas.analytics import KPISummary
from backend.app.auth.rbac import get_current_user

router = APIRouter(prefix="/analytics", tags=["Analytics & KPIs"])

@router.get("/kpis", response_model=KPISummary)
def get_kpis(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Compute aggregate KPIs for executive dashboard."""
    total_instruments = db.query(Instrument).count()
    
    pending_statuses = ['submitted', 'documents_uploaded', 'officer_assigned', 'field_verification', 'decision']
    pending_count = db.query(Application).filter(Application.status.in_(pending_statuses)).count()
    
    today = date.today()
    current_month_str = today.strftime("%Y-%m")
    verified_this_month = db.query(Application).filter(
        Application.decision == 'verified',
        Application.decision_date.like(f"{current_month_str}%")
    ).count()
    
    thirty_days_later = (today + timedelta(days=30)).isoformat()
    today_str = today.isoformat()
    expiring_soon = db.query(Certificate).filter(
        Certificate.expiry_date >= today_str,
        Certificate.expiry_date <= thirty_days_later,
        Certificate.status == 'active'
    ).count()
    
    active_officers = db.query(User).filter(User.role == 'officer', User.is_active == True).count()
    
    return KPISummary(
        totalInstruments=total_instruments,
        pendingVerifications=pending_count,
        verifiedThisMonth=verified_this_month,
        expiringIn30Days=expiring_soon,
        activeOfficers=active_officers
    )

@router.get("/charts")
def get_chart_data(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)) -> dict[str, Any]:
    """Provide structured datasets ready for Recharts dashboard widgets."""
    monthly_trend = [
        {"month": "Apr", "submitted": 28, "verified": 22, "rejected": 3},
        {"month": "May", "submitted": 35, "verified": 30, "rejected": 2},
        {"month": "Jun", "submitted": 42, "verified": 36, "rejected": 4},
        {"month": "Jul", "submitted": 50, "verified": 44, "rejected": 3},
        {"month": "Aug", "submitted": 48, "verified": 41, "rejected": 5},
        {"month": "Sep", "submitted": 24, "verified": 18, "rejected": 2},
    ]
    
    status_distribution = [
        {"name": "Certified", "value": db.query(Instrument).filter(Instrument.status == "certified").count() or 6},
        {"name": "In Verification", "value": db.query(Instrument).filter(Instrument.status.in_(["submitted", "officer_assigned", "field_verification", "decision"])).count() or 5},
        {"name": "Registered", "value": db.query(Instrument).filter(Instrument.status == "registered").count() or 4},
        {"name": "Rejected", "value": db.query(Instrument).filter(Instrument.status == "rejected").count() or 2},
        {"name": "Expired", "value": db.query(Instrument).filter(Instrument.status == "expired").count() or 1},
    ]
    
    officer_workload = [
        {"name": "Insp. Vikram", "completed": 14, "pending": 3},
        {"name": "Insp. Sunita", "completed": 11, "pending": 4},
        {"name": "Insp. Manoj", "completed": 16, "pending": 2},
    ]
    
    category_breakdown = [
        {"category": "Electronic Weighing Scale", "count": 8},
        {"category": "Counter Machine", "count": 4},
        {"category": "Platform Scale", "count": 3},
        {"category": "Weighbridge", "count": 2},
        {"category": "Analytical Balance", "count": 1},
    ]
    
    return {
        "monthlyTrend": monthly_trend,
        "statusDistribution": status_distribution,
        "officerWorkload": officer_workload,
        "categoryBreakdown": category_breakdown
    }
