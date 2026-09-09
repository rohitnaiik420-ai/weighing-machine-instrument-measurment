from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.audit_log import AuditLog
from backend.app.schemas.analytics import AuditLogResponse, AuditLogCreate
from backend.app.auth.rbac import get_current_user, require_roles
from backend.app.models.user import User

router = APIRouter(prefix="/audit-logs", tags=["Audit Trail"])

@router.get("", response_model=list[AuditLogResponse])
def get_audit_logs(
    actor_id: Optional[str] = None,
    action: Optional[str] = None,
    limit: int = Query(50, le=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "officer"))
):
    """
    Query immutable audit logs.
    Admins and officers inspect compliance logs and activity history.
    """
    query = db.query(AuditLog)
    if actor_id:
        query = query.filter(AuditLog.actor_id == actor_id)
    if action:
        query = query.filter(AuditLog.action.ilike(f"%{action}%"))
        
    return query.order_by(AuditLog.created_at.desc()).limit(limit).all()

@router.post("", response_model=AuditLogResponse)
def create_audit_log(
    log_in: AuditLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Append a custom audit entry."""
    count = db.query(AuditLog).count()
    new_log = AuditLog(
        id=f"AUD-{str(count + 1).zfill(3)}",
        actor_id=log_in.actor_id or current_user.id,
        action=log_in.action,
        target_id=log_in.target_id,
        details=log_in.details,
        timestamp=datetime.utcnow().isoformat()
    )
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log
