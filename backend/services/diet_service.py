from common.api_types import HealthData, DietRecommendation

from services.abstract_service import AbstractService
from models.diet_model import DietModel


class DietService(AbstractService):
    """
    Service for diet recommendations.
    Inherits from AbstractService and uses DietModel.
    """

    def __init__(self):
        self.model = DietModel()

    def execute(self, data: HealthData) -> DietRecommendation:
        """
        Execute the diet recommendation service.

        Args:
            data (HealthData): User's health metrics and goals.

        Returns:
            DietRecommendation: Recommended diet plan.
        """
        recommendation_text = self.model.execute(data)
        return DietRecommendation(
            diet_recommendation=recommendation_text,
        )
