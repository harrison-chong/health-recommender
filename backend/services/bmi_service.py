from services.abstract_service import AbstractService
from models.bmi_model import BmiModel
from common.api_types import BMICalculationInput, BMIResponse


class BmiService(AbstractService):
    """
    Service for BMI calculation.
    Orchestrates the BMI model and wraps the result.
    """

    def __init__(self):
        self.model = BmiModel()

    def execute(self, data: BMICalculationInput) -> BMIResponse:
        """
        Calculate BMI using the model.

        Args:
            data: Input data with weight and height.

        Returns:
            BMIResponse with calculated BMI.
        """
        bmi_value = self.model.execute(data)
        return BMIResponse(bmi=bmi_value)
