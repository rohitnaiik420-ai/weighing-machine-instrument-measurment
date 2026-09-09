from backend.app.routers.auth import router as auth_router
from backend.app.routers.instruments import router as instruments_router
from backend.app.routers.applications import router as applications_router
from backend.app.routers.certificates import router as certificates_router
from backend.app.routers.documents import router as documents_router
from backend.app.routers.audit_logs import router as audit_logs_router
from backend.app.routers.analytics import router as analytics_router

__all__ = [
    "auth_router",
    "instruments_router",
    "applications_router",
    "certificates_router",
    "documents_router",
    "audit_logs_router",
    "analytics_router"
]
