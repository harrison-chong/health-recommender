from fastapi import APIRouter

from common.api_types import HealthData, DietRecommendation
from services.diet_service import DietService


router = APIRouter(
    tags=["diet"],
)


@router.post("/recommend", response_model=DietRecommendation)
async def recommend_diet(data: HealthData) -> DietRecommendation:
    """
    Recommend a diet based on user health data.
    Args:
        data (HealthData): User's health metrics and goals.
    Returns:
        DietRecommendation: Recommended diet plan.
    """
    service = DietService()
    return service.execute(data)
