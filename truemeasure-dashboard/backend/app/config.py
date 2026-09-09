import os
from pathlib import Path
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "TRUEMEASURE - Weighing & Measuring Verification API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Secret Key & JWT Config
    SECRET_KEY: str = os.getenv("SECRET_KEY", "truemeasure-sih2026-super-secure-secret-key-32chars")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Database Config: Defaults to SQLite for immediate local execution.
    # PostgreSQL URL can be supplied via DATABASE_URL env var:
    # e.g., postgresql+psycopg2://user:password@localhost:5432/truemeasure
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'truemeasure.db'}")
    
    # Document Storage
    UPLOAD_DIR: Path = BASE_DIR / "storage" / "documents"
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"
    ]

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()

# Ensure uploads directory exists
settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
