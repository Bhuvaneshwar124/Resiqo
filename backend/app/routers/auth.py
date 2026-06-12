from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.db.models import User
from app.schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse,
    TokenResponse,
    UserUpdate,
    PasswordChange,
    GoogleToken,
)
import jwt
from app.core.security import hash_password, verify_password, create_access_token
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post(
    "/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED
)
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    """Register a new user and return an access token."""
    # Check if email exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    # Create user
    user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)

    # Create token
    access_token = create_access_token(data={"sub": str(user.id)})

    return TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(user),
    )


@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin, db: AsyncSession = Depends(get_db)):
    """Authenticate a user and return an access token."""
    result = await db.execute(select(User).where(User.email == user_data.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(data={"sub": str(user.id)})

    return TokenResponse(
        access_token=access_token,
        user=UserResponse.model_validate(user),
    )


@router.post("/google", response_model=TokenResponse)
async def google_login(token_data: GoogleToken, db: AsyncSession = Depends(get_db)):
    """Authenticate a user via Firebase Google Sign-In and return our backend JWT."""
    try:
        # Decode the Firebase token (without signature verification for this prototype)
        # In a strict production environment, you should verify the signature using firebase-admin SDK
        decoded_token = jwt.decode(token_data.token, options={"verify_signature": False})
        
        email = decoded_token.get("email")
        name = decoded_token.get("name") or "Google User"

        if not email:
            raise HTTPException(status_code=400, detail="Invalid Google token: missing email")

        # Check if user exists
        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()

        if not user:
            # Create user if they don't exist
            import secrets
            # Generate a random secure password for OAuth users since they don't use it
            random_password = secrets.token_urlsafe(32)
            user = User(
                name=name,
                email=email,
                hashed_password=hash_password(random_password),
            )
            db.add(user)
            await db.flush()
            await db.refresh(user)

        # Issue our backend JWT
        access_token = create_access_token(data={"sub": str(user.id)})

        return TokenResponse(
            access_token=access_token,
            user=UserResponse.model_validate(user),
        )
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid authentication token: {str(e)}")


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get the current authenticated user's profile."""
    return UserResponse.model_validate(current_user)


@router.put("/profile", response_model=UserResponse)
async def update_profile(
    update_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update the current user's profile."""
    if update_data.name is not None:
        current_user.name = update_data.name
    if update_data.email is not None:
        # Check if email is taken
        result = await db.execute(
            select(User).where(
                User.email == update_data.email, User.id != current_user.id
            )
        )
        if result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use",
            )
        current_user.email = update_data.email

    await db.flush()
    await db.refresh(current_user)
    return UserResponse.model_validate(current_user)


@router.post("/change-password")
async def change_password(
    password_data: PasswordChange,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Change the current user's password."""
    if not verify_password(
        password_data.current_password, current_user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )

    current_user.hashed_password = hash_password(password_data.new_password)
    await db.flush()

    return {"message": "Password updated successfully"}
