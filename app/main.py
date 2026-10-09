from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .core.config import settings
from .core.database import engine, Base, SessionLocal
from .services.seed_service import seed_demo_data_if_empty

# Import routers
from .api import (
    auth,
    patient,
    dashboard,
    upload,
    reports,
    lab_results,
    medications,
    timeline,
    trends,
    compare,
    chat,
    doctor_summary
)

# 1. Create tables in SQLite
Base.metadata.create_all(bind=engine)

# 2. Seed initial demo data
try:
    with SessionLocal() as db:
        seed_demo_data_if_empty(db)
except Exception as e:
    print(f"Seed initialization notice: {e}")

# 3. Initialize FastAPI application
app = FastAPI(
    title="MedJourney.ai API",
    description="Real working backend for MedJourney AI — Personal Health Copilot. Provides OCR, clinical extraction, longitudinal trend analysis, and grounded health copilot services.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 4. CORS configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    settings.FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for hackathon convenience, or origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 5. Health Check Endpoint
@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "ok",
        "service": "MedJourney.ai Backend",
        "version": "1.0.0"
    }

# 6. Include API Routers
app.include_router(auth.router, prefix=settings.API_PREFIX)
app.include_router(patient.router, prefix=settings.API_PREFIX)
app.include_router(dashboard.router, prefix=settings.API_PREFIX)
app.include_router(upload.router, prefix=settings.API_PREFIX)
app.include_router(reports.router, prefix=settings.API_PREFIX)
app.include_router(lab_results.router, prefix=settings.API_PREFIX)
app.include_router(medications.router, prefix=settings.API_PREFIX)
app.include_router(timeline.router, prefix=settings.API_PREFIX)
app.include_router(trends.router, prefix=settings.API_PREFIX)
app.include_router(compare.router, prefix=settings.API_PREFIX)
app.include_router(chat.router, prefix=settings.API_PREFIX)
app.include_router(doctor_summary.router, prefix=settings.API_PREFIX)
