from sqlmodel import create_engine, Session
from app.config import settings

# PostgreSQL-specific configuration for proper connection handling
# Use psycopg driver (v3) with binary support
def get_engine():
    database_url = settings.DATABASE_URL
    
    # Ensure we use the psycopg driver instead of psycopg2
    if database_url and database_url.startswith("postgresql://"):
        database_url = database_url.replace("postgresql://", "postgresql+psycopg://", 1)
    
    connect_args = {
        "pool_pre_ping": True,  # Verify connections are alive before using them
        "connect_args": {
            "connect_timeout": 10,
            "options": "-c statement_timeout=30000"  # 30s statement timeout
        }
    }
    
    return create_engine(database_url, echo=True, **connect_args)

engine = get_engine()

def get_session():
    with Session(engine) as session:
        yield session