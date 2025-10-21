"""
User Service
Business logic for user operations
"""
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash, verify_password


class UserService:
    """Service for user-related operations"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_by_email(self, email: str) -> Optional[User]:
        """
        Get user by email

        Args:
            email: User email

        Returns:
            User if found, None otherwise
        """
        result = await self.db.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()

    async def get_user_by_id(self, user_id: int) -> Optional[User]:
        """
        Get user by ID

        Args:
            user_id: User ID

        Returns:
            User if found, None otherwise
        """
        result = await self.db.execute(
            select(User).where(User.id == user_id)
        )
        return result.scalar_one_or_none()

    async def create_user(self, user: UserCreate) -> User:
        """
        Create a new user

        Args:
            user: User creation data

        Returns:
            Created user
        """
        # Hash the password
        hashed_password = get_password_hash(user.password)

        # Create user instance
        db_user = User(
            email=user.email,
            hashed_password=hashed_password,
            full_name=user.full_name,
            is_active=True,
            is_superuser=False
        )

        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)

        return db_user

    async def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """
        Authenticate a user with email and password

        Args:
            email: User email
            password: Plain password

        Returns:
            User if credentials are valid, None otherwise
        """
        user = await self.get_user_by_email(email)

        if not user:
            return None

        if not verify_password(password, user.hashed_password):
            return None

        return user

    async def update_user(self, user_id: int, user_update: UserUpdate) -> Optional[User]:
        """
        Update user information

        Args:
            user_id: User ID
            user_update: Updated user data

        Returns:
            Updated user if found, None otherwise
        """
        db_user = await self.get_user_by_id(user_id)

        if not db_user:
            return None

        # Update fields
        if user_update.email is not None:
            db_user.email = user_update.email

        if user_update.full_name is not None:
            db_user.full_name = user_update.full_name

        if user_update.password is not None:
            db_user.hashed_password = get_password_hash(user_update.password)

        await self.db.commit()
        await self.db.refresh(db_user)

        return db_user

    async def list_users(self, skip: int = 0, limit: int = 100):
        """
        List all users

        Args:
            skip: Number of records to skip
            limit: Maximum number of records to return

        Returns:
            List of users
        """
        result = await self.db.execute(
            select(User)
            .offset(skip)
            .limit(limit)
            .order_by(User.created_at.desc())
        )
        return result.scalars().all()
