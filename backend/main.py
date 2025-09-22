"""
Backend API for Health Recommender
Uses FastAPI to serve endpoints for health data input and workout recommendations.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional

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


class HealthData(BaseModel):
    age: int = Field(..., description="User's age in years")
    weight: float = Field(..., description="User's weight in kilograms")
    height: float = Field(..., description="User's height in centimeters")
    fitness_level: str = Field(..., description="User's self-assessed fitness level")
    goals: Optional[str] = Field(None, description="User's health or fitness goals")


class WorkoutRecommendation(BaseModel):
    workout: str
    rationale: str


@app.post("/recommend", response_model=WorkoutRecommendation)
async def recommend_workout(data: HealthData) -> WorkoutRecommendation:
    """
    Recommend a workout based on user health data.
    Args:
        data (HealthData): User's health metrics and goals.
    Returns:
        WorkoutRecommendation: Recommended workout and rationale.
    """
    # Placeholder AI logic for recommendation
    if data.fitness_level.lower() == "beginner":
        workout = "30-minute brisk walk"
        rationale = "Walking is safe and effective for beginners."
    elif data.fitness_level.lower() == "intermediate":
        workout = "20-minute jog + bodyweight exercises"
        rationale = "Combines cardio and strength for balanced fitness."
    else:
        workout = "HIIT session + strength training"
        rationale = "Advanced users benefit from intensity and variety."
    return WorkoutRecommendation(workout=workout, rationale=rationale)


@app.get("/health")
async def health_check() -> dict:
    """Health check endpoint."""
    return {"status": "ok"}
