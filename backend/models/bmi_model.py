from models.abstract_model import AbstractModel
from common.api_types import BMICalculationInput


class BmiModel(AbstractModel):
    """
    Model for calculating BMI.
    BMI = weight (kg) / (height (m))^2, where height_m = height_cm / 100.
    """

    def execute(self, data: BMICalculationInput) -> float:
        """
        Calculate BMI from input data.

        Args:
            data: Input containing weight and height.

        Returns:
            BMI value as float (rounded to nearest whole number).
        """
        # Convert height from cm to m
        height_m = data.height / 100
        # Calculate BMI
        bmi = data.weight / (height_m**2)
        # Round to nearest whole number
        rounded_bmi = round(bmi, 0)
        return rounded_bmi
