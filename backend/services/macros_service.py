from services.abstract_service import AbstractService
from models.macros_model import MacrosModel
from common.api_types import MacrosInput, MacrosResponse


class MacrosService(AbstractService):
    """
    Service for macronutrient calculation.
    Orchestrates the Macros model and wraps the result.
    """

    def __init__(self):
        self.model = MacrosModel()

    def execute(self, data: MacrosInput) -> MacrosResponse:
        """
        Calculate macronutrient distribution using the model.

        Args:
            data: Input data with TDEE, goal, and optional diet type.

        Returns:
            MacrosResponse with macronutrient breakdown in grams and percentages.
        """
        result = self.model.execute(data)
        return MacrosResponse(**result)
