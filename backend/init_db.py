"""
Initialize Database
Creates tables and seeds initial data
Run this script once to set up the database
"""
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings
from app.core.database import Base
from app.models.user import User
from app.models.contact import Contact
from app.core.security import get_password_hash


async def init_db():
    """Initialize database with tables and seed data"""

    # Create async engine
    engine = create_async_engine(settings.DATABASE_URL, echo=True)

    # Create all tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)  # Drop existing
        await conn.run_sync(Base.metadata.create_all)  # Create new

    # Create session
    AsyncSessionLocal = sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False
    )

    # Seed initial data
    async with AsyncSessionLocal() as session:
        # Create admin user
        admin_user = User(
            email="admin@polimata.com",
            hashed_password=get_password_hash("admin123"),
            full_name="Admin User",
            is_active=True,
            is_superuser=True
        )
        session.add(admin_user)

        # Create test user
        test_user = User(
            email="test@example.com",
            hashed_password=get_password_hash("test123"),
            full_name="Test User",
            is_active=True,
            is_superuser=False
        )
        session.add(test_user)

        await session.commit()

        print("✅ Database initialized successfully!")
        print("\n📊 Initial users created:")
        print("   Admin: admin@polimata.com / admin123")
        print("   Test:  test@example.com / test123")

    await engine.dispose()


if __name__ == "__main__":
    print("🚀 Initializing database...")
    asyncio.run(init_db())
