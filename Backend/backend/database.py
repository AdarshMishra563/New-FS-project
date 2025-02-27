from sqlalchemy.ext.asyncio import create_async_engine
import asyncio

DATABASE_URL = "postgresql+asyncpg://postgres:Mishra%40123@localhost:5432/postgres"

# Create an async engine
engine = create_async_engine(DATABASE_URL, echo=True)

async def fetch_tables():
    async with engine.connect() as conn:
        result = await conn.execute("SELECT tablename FROM pg_tables WHERE schemaname = 'public';")
        tables = [row[0] for row in result.fetchall()]

        for table in tables:
            print(f"\nData from {table}:")
            result = await conn.execute(f"SELECT * FROM {table} LIMIT 10;")  # Fetch first 10 rows
            rows = result.fetchall()
            for row in rows:
                print(row)

asyncio.run(fetch_tables())
