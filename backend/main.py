"""
Backend API for Health Recommender
Uses FastAPI to serve endpoints for Health Recommender Application.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.bmi import router as bmi_router
from routers.workout import router as workout_router

app = FastAPI(
    title="Health Recommender API",
    description="APIs for Health Recommender Application",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # only your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(bmi_router)

app.include_router(workout_router)


@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint."""
    return {"status": "ok"}
