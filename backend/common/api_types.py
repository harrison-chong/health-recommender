from pydantic import BaseModel, Field
from typing import Optional


class HealthData(BaseModel):
    age: int = Field(..., description="User's age in years")
    weight: float = Field(..., description="User's weight in kilograms")
    height: float = Field(..., description="User's height in centimeters")
    fitness_level: str = Field(..., description="User's self-assessed fitness level")
    goals: Optional[str] = Field(None, description="User's health or fitness goals")


class WorkoutRecommendation(BaseModel):
    workout_recommendation: str