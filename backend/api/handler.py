from common.api_types import HealthData, WorkoutRecommendation
from model.core import generate_recommendation


def get_recommendation(data: HealthData) -> WorkoutRecommendation:
    """
    Get workout recommendation from core model.
    Args:
        data (HealthData): User's health metrics and goals.
    Returns:
        WorkoutRecommendation: Recommended workout.
    """
    recommendation_text = generate_recommendation(data)
    return WorkoutRecommendation(
        workout_recommendation=recommendation_text,
    )
