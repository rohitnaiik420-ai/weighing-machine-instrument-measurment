import os
import shutil
import uuid
from pathlib import Path
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from fastapi.responses import FileResponse
from backend.app.config import settings
from backend.app.auth.rbac import get_current_user
from backend.app.models.user import User

router = APIRouter(prefix="/documents", tags=["Document & Cloud Storage"])

ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".doc", ".docx"}

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    doc_type: str = "general",
    current_user: User = Depends(get_current_user)
):
    """
    Secure document upload endpoint (invoices, specs, calibration certificates, photos).
    Corresponds to 'Documents Upload' and 'Cloud Storage' in SIH 2026 architecture.
    """
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
        
    unique_filename = f"{uuid.uuid4().hex[:12]}_{file.filename.replace(' ', '_')}"
    destination_path = settings.UPLOAD_DIR / unique_filename
    
    try:
        with open(destination_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Could not save uploaded document: {str(e)}"
        )
        
    return {
        "fileName": unique_filename,
        "originalName": file.filename,
        "docType": doc_type,
        "fileUrl": f"/api/documents/{unique_filename}",
        "uploadedBy": current_user.id
    }

@router.get("/{filename}")
def get_document(filename: str):
    """Serve stored verification document."""
    file_path = settings.UPLOAD_DIR / filename
    if not file_path.exists() or not file_path.is_file():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")
    return FileResponse(file_path)
