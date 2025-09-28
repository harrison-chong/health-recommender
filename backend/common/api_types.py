from pydantic import BaseModel, Field
from typing import Optional


class HealthData(BaseModel):
    """Input model for user's health and fitness data."""
    age: int = Field(..., description="User's age in years")
    weight: float = Field(..., description="User's weight in kilograms")
    height: float = Field(..., description="User's height in centimeters")
    fitness_level: str = Field(..., description="User's self-assessed fitness level")
    gender: str = Field(..., description="User's gender (e.g., male, female, other)")
    occupation: str = Field(..., description="User's occupation")
    average_sleep_hours: float = Field(..., description="Average sleep hours per night")
    body_fat_percentage: Optional[float] = Field(
        None, description="User's body fat percentage"
    )
    goals: Optional[str] = Field(None, description="User's health or fitness goals")


class WorkoutRecommendation(BaseModel):
    """Response model containing the workout recommendation."""
    workout_recommendation: str


class BMICalculationInput(BaseModel):
    """Input for BMI calculation."""
    weight: float = Field(..., gt=0, description="Weight in kilograms")
    height: float = Field(..., gt=0, description="Height in centimetres")


class BMIResponse(BaseModel):
    """Response for BMI calculation."""
    bmi: float = Field(..., description="Calculated BMI value")
