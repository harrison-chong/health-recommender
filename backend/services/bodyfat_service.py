from services.abstract_service import AbstractService
from models.bodyfat_model import BodyFatModel
from common.api_types import BodyFatInput, BodyFatResponse


class BodyFatService(AbstractService):
    """
    Service for body fat percentage calculation.
    Orchestrates the BodyFat model and wraps the result.
    """

    def __init__(self):
        self.model = BodyFatModel()

    def execute(self, data: BodyFatInput) -> BodyFatResponse:
        """
        Calculate body fat percentage using the model.

        Args:
            data: Input data with waist, neck, hip (for females), and age.

        Returns:
            BodyFatResponse with estimated body fat percentage and category.
        """
        result = self.model.execute(data)
        return BodyFatResponse(**result)
