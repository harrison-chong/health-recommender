"""
Backend API for Health Recommender
Uses FastAPI to serve endpoints for health data input and workout recommendations.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from common.api_types import HealthData, WorkoutRecommendation
from api.handler import get_recommendation

app = FastAPI(
    title="Health Recommender API",
    description="API for health data input and workout recommendations.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # only your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/recommend", response_model=WorkoutRecommendation)
async def recommend_workout(data: HealthData) -> WorkoutRecommendation:
    """
    Recommend a workout based on user health data.
    Args:
        data (HealthData): User's health metrics and goals.
    Returns:
        WorkoutRecommendation: Recommended workout as string.
    """
    return get_recommendation(data)


@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint."""
    return {"status": "ok"}
