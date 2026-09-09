import sys
import os
import argparse
from pathlib import Path

# Add project root to sys.path so backend.app.* imports resolve smoothly
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

def test_imports():
    """Verify all backend modules and database connection load cleanly."""
    print("Testing backend modules and database connection...")
    try:
        from backend.app.main import app
        from backend.app.database import engine, Base
        from backend.app.models import User, Instrument, Application, Certificate, AuditLog
        print("[OK] All models, routers, and schemas imported successfully!")
        
        # Test table creation
        Base.metadata.create_all(bind=engine)
        print("[OK] Database tables verified/created successfully!")
        return True
    except Exception as e:
        print(f"[ERROR] Import/Database test failed: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    parser = argparse.ArgumentParser(description="TRUEMEASURE FastAPI Server Runner")
    parser.add_argument("--host", default="0.0.0.0", help="Host address (default: 0.0.0.0)")
    parser.add_argument("--port", type=int, default=8000, help="Port number (default: 8000)")
    parser.add_argument("--reload", action="store_true", default=False, help="Enable auto-reload on code change")
    parser.add_argument("--test-only", action="store_true", help="Test imports and database without running server")
    args = parser.parse_args()

    if args.test_only:
        success = test_imports()
        sys.exit(0 if success else 1)

    print("\n" + "=" * 60)
    print("   TRUEMEASURE BACKEND SERVER - SIH 2026 (Alpha Coders)")
    print("=" * 60)
    print(f" * Server running at: http://localhost:{args.port}")
    print(f" * Interactive API Docs: http://localhost:{args.port}/docs")
    print(f" * ReDoc Documentation: http://localhost:{args.port}/redoc")
    print("=" * 60 + "\n")

    import uvicorn
    uvicorn.run(
        "backend.app.main:app",
        host=args.host,
        port=args.port,
        reload=args.reload
    )

if __name__ == "__main__":
    main()
