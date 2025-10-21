"""
Quick script to create users with SQL
"""
import asyncio
import asyncpg

async def main():
    # Connect to database
    conn = await asyncpg.connect(
        user='polimata',
        password='polimata_dev',
        database='polimata_db',
        host='postgres'
    )

    # Hash de admin123: $2b$12$LQvZnlWQkqRfGQb1iOc8I.WNhVnJWnXJLXp9k0PeUJYFJa8LQ6Q3u
    # Hash de test123: $2b$12$6K6FZwCGQpVQ0K8.7AZ3ZOa4uIGNqn7kNt5P3rWDvJr/X3.pV9LPu

    try:
        # Create users table
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(200) UNIQUE NOT NULL,
                hashed_password VARCHAR(200) NOT NULL,
                full_name VARCHAR(100),
                is_active BOOLEAN DEFAULT TRUE,
                is_superuser BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        ''')

        # Delete existing users
        await conn.execute('DELETE FROM users WHERE email IN ($1, $2)',
                          'admin@polimata.com', 'test@example.com')

        # Insert admin
        await conn.execute('''
            INSERT INTO users (email, hashed_password, full_name, is_active, is_superuser)
            VALUES ($1, $2, $3, $4, $5)
        ''', 'admin@polimata.com',
             '$2b$12$LQv4wZCqRi9Fq3v.uYB4zOGKI8aE3YvC9tB0Z5Hs3X7Y1K2M6N8Oe',
             'Admin User', True, True)

        # Insert test user
        await conn.execute('''
            INSERT INTO users (email, hashed_password, full_name, is_active, is_superuser)
            VALUES ($1, $2, $3, $4, $5)
        ''', 'test@example.com',
             '$2b$12$6K6FZwCGQpVQ0K8.7AZ3ZOa4uIGNqn7kNt5P3rWDvJr/X3.pV9LPu',
             'Test User', True, False)

        print("✅ Users created successfully!")
        print("   Admin: admin@polimata.com / admin123")
        print("   Test:  test@example.com / test123")

    finally:
        await conn.close()

if __name__ == "__main__":
    asyncio.run(main())
