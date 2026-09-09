from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.app.config import settings
from backend.app.database import engine, Base, SessionLocal
from backend.app.seed_data import seed_database
from backend.app.routers import (
    auth_router,
    instruments_router,
    applications_router,
    certificates_router,
    documents_router,
    audit_logs_router,
    analytics_router
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan event: initialize tables and seed mock data on startup."""
    print("Initializing TRUEMEASURE Database Tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield

app = FastAPI(
    title="TRUEMEASURE API — Legal Metrology & Instrument Verification",
    description=(
        "Production-ready FastAPI backend for Smart India Hackathon 2026 (Alpha Coders).\n\n"
        "Features:\n"
        "- Role-Based Access Control (RBAC): Applicant, Officer / Inspector, Admin\n"
        "- JWT Authentication & Bearer Tokens\n"
        "- Full 9-stage Instrument Verification Lifecycle\n"
        "- Field Inspection, GPS Stamps & Evidence Photos\n"
        "- Digital Certificate Issuance & Public QR Validation\n"
        "- Immutable Audit Logging & Analytics KPIs"
    ),
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS for Frontend Integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include All Routers under /api
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(instruments_router, prefix=settings.API_V1_STR)
app.include_router(applications_router, prefix=settings.API_V1_STR)
app.include_router(certificates_router, prefix=settings.API_V1_STR)
app.include_router(documents_router, prefix=settings.API_V1_STR)
app.include_router(audit_logs_router, prefix=settings.API_V1_STR)
app.include_router(analytics_router, prefix=settings.API_V1_STR)

# Mount Document Uploads as Static Directory for fast file downloads
app.mount("/static/documents", StaticFiles(directory=str(settings.UPLOAD_DIR)), name="documents")

@app.get("/", tags=["System"])
def root_status():
    """Welcome and quick API status endpoint."""
    return {
        "project": "TRUEMEASURE",
        "description": "Weighing & Measuring Instrument Digital Verification API",
        "status": "online",
        "version": settings.VERSION,
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    }

@app.get("/api/health", tags=["System"])
def health_check():
    """Service health check endpoint."""
    return {"status": "healthy", "service": "truemeasure-backend"}
