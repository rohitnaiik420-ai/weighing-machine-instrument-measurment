from typing import Optional, Callable
from fastapi import Depends, HTTPException, status, Header
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.user import User
from backend.app.auth.jwt_handler import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)

def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    x_user_id: Optional[str] = Header(None, alias="X-User-Id"),
    db: Session = Depends(get_db)
) -> User:
    """
    Authenticate user via Bearer JWT token, with fallback to X-User-Id header
    for developer ease & seamless frontend simulation.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # 1. Check Bearer JWT token if present
    if token:
        payload = decode_access_token(token)
        if payload and "sub" in payload:
            user_id = payload["sub"]
            user = db.query(User).filter(User.id == user_id, User.is_active == True).first()
            if user:
                return user
        raise credentials_exception

    # 2. Check X-User-Id header (useful for rapid UI testing across personas)
    if x_user_id:
        user = db.query(User).filter(User.id == x_user_id, User.is_active == True).first()
        if user:
            return user

    # 3. Default fallback to first active user if no auth header provided (demo mode safe)
    default_user = db.query(User).filter(User.is_active == True).first()
    if default_user:
        return default_user

    raise credentials_exception

def require_roles(*allowed_roles: str) -> Callable:
    """Role-Based Access Control (RBAC) dependency factory."""
    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied: role '{current_user.role}' lacks permission. Required: {', '.join(allowed_roles)}"
            )
        return current_user
    return role_checker
