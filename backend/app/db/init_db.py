from app.db.database import engine, Base
from app.db.models import User, Resume, JobDescription, AnalysisReport  # noqa: F401


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def close_db():
    await engine.dispose()
