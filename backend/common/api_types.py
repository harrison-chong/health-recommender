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


class DietRecommendation(BaseModel):
    """Response model containing the diet recommendation."""

    diet_recommendation: str


class BMICalculationInput(BaseModel):
    """Input for BMI calculation."""

    weight: float = Field(..., gt=0, description="Weight in kilograms")
    height: float = Field(..., gt=0, description="Height in centimetres")


class BMIResponse(BaseModel):
    """Response for BMI calculation."""

    bmi: float = Field(..., description="Calculated BMI value")


# BMR/TDEE Input and Response Models
class BMRInput(BaseModel):
    """Input for BMR and TDEE calculation."""

    age: int = Field(..., gt=0, description="Age in years")
    weight: float = Field(..., gt=0, description="Weight in kilograms")
    height: float = Field(..., gt=0, description="Height in centimeters")
    gender: str = Field(..., description="Gender: 'male' or 'female'")
    activity_level: str = Field(
        ...,
        description="Activity level: sedentary, light, moderate, active, very_active",
    )


class BMRResponse(BaseModel):
    """Response for BMR and TDEE calculation."""

    bmr: float = Field(..., description="Basal Metabolic Rate (calories/day)")
    tdee: float = Field(
        ..., description="Total Daily Energy Expenditure (calories/day)"
    )
    activity_level: str = Field(..., description="Activity level used for calculation")


# Body Fat Percentage Input and Response Models (US Navy Method)
class BodyFatInput(BaseModel):
    """Input for body fat percentage calculation using US Navy method."""

    age: int = Field(..., gt=0, description="Age in years")
    gender: str = Field(..., description="Gender: 'male' or 'female'")
    height: float = Field(..., gt=0, description="Height in centimeters")
    waist: float = Field(..., gt=0, description="Waist circumference in cm")
    neck: float = Field(..., gt=0, description="Neck circumference in cm")
    hip: Optional[float] = Field(
        None, ge=0, description="Hip circumference in cm (required for females)"
    )


class BodyFatResponse(BaseModel):
    """Response for body fat percentage calculation."""

    body_fat_percentage: float = Field(..., description="Estimated body fat percentage")
    category: str = Field(
        ...,
        description="Body fat category (e.g., essential, athletes, fitness, average, obese)",
    )


# Macronutrient Calculator Input and Response Models
class MacrosInput(BaseModel):
    """Input for macronutrient calculation."""

    tdee: float = Field(
        ..., gt=0, description="Total Daily Energy Expenditure (calories)"
    )
    goal: str = Field(
        ..., description="Goal: 'lose_weight', 'maintain', 'build_muscle'"
    )
    diet_type: Optional[str] = Field(
        None,
        description="Diet type: 'standard', 'keto', 'paleo', 'vegetarian', 'vegan' (default: standard)",
    )


class MacrosResponse(BaseModel):
    """Response for macronutrient calculation."""

    calories: float = Field(
        ..., description="Daily calorie target (may be adjusted from TDEE)"
    )
    protein_grams: float = Field(..., description="Daily protein intake in grams")
    carbs_grams: float = Field(..., description="Daily carbohydrate intake in grams")
    fats_grams: float = Field(..., description="Daily fat intake in grams")
    protein_percentage: float = Field(
        ..., description="Protein percentage of total calories"
    )
    carbs_percentage: float = Field(
        ..., description="Carbohydrate percentage of total calories"
    )
    fats_percentage: float = Field(..., description="Fat percentage of total calories")
    goal: str = Field(..., description="Goal used for calculation")
    diet_type: str = Field(..., description="Diet type used for calculation")
