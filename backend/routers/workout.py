from fastapi import APIRouter

from common.api_types import HealthData, WorkoutRecommendation
from services.workout_service import WorkoutService


router = APIRouter(
    tags=["workout"],
)


@router.post("/recommend", response_model=WorkoutRecommendation)
async def recommend_workout(data: HealthData) -> WorkoutRecommendation:
    """
    Recommend a workout based on user health data.
    Args:
        data (HealthData): User's health metrics and goals.
    Returns:
        WorkoutRecommendation: Recommended workout.
    """
    service = WorkoutService()
    return service.execute(data)
