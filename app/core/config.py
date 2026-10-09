import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(BASE_DIR / ".env")

class Settings:
    PROJECT_NAME: str = "MedJourney.ai Backend"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "medjourney_super_secret_hackathon_key_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'data' / 'medjourney.db'}")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:5173")
    
    UPLOADS_DIR: Path = BASE_DIR / "uploads"
    DATA_DIR: Path = BASE_DIR / "data"
    
    AI_API_KEY: str = os.getenv("AI_API_KEY", "")

settings = Settings()

# Ensure directories exist
settings.UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
settings.DATA_DIR.mkdir(parents=True, exist_ok=True)
