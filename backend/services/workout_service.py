from common.api_types import HealthData, WorkoutRecommendation

from services.abstract_service import AbstractService
from models.workout_model import WorkoutModel


class WorkoutService(AbstractService):
    """
    Service for workout recommendations.
    Inherits from AbstractService and uses WorkoutModel.
    """

    def __init__(self):
        self.model = WorkoutModel()

    def execute(self, data: HealthData) -> WorkoutRecommendation:
        """
        Execute the workout recommendation service.

        Args:
            data (HealthData): User's health metrics and goals.

        Returns:
            WorkoutRecommendation: Recommended workout.
        """
        recommendation_text = self.model.execute(data)
        return WorkoutRecommendation(
            workout_recommendation=recommendation_text,
        )
