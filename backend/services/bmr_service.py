from services.abstract_service import AbstractService
from models.bmr_model import BmrModel
from common.api_types import BMRInput, BMRResponse


class BmrService(AbstractService):
    """
    Service for BMR and TDEE calculation.
    Orchestrates the BMR model and wraps the result.
    """

    def __init__(self):
        self.model = BmrModel()

    def execute(self, data: BMRInput) -> BMRResponse:
        """
        Calculate BMR and TDEE using the model.

        Args:
            data: Input data with age, weight, height, gender, and activity level.

        Returns:
            BMRResponse with calculated BMR and TDEE values.
        """
        result = self.model.execute(data)
        return BMRResponse(**result)
