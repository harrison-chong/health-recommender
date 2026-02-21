from models.abstract_model import AbstractModel
from common.api_types import BMRInput


class BmrModel(AbstractModel):
    """
    Model for calculating Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).
    Uses the Mifflin-St Jeor equation.
    """

    # Activity level multipliers for TDEE calculation
    ACTIVITY_MULTIPLIERS = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very_active": 1.9,
    }

    def execute(self, data: BMRInput) -> dict:
        """
        Calculate BMR and TDEE from input data.

        Args:
            data: Input containing age, weight, height, gender, and activity level.

        Returns:
            dict: Dictionary with 'bmr' and 'tdee' values, and activity level.
        """
        # Calculate BMR using Mifflin-St Jeor equation
        if data.gender.lower() == "male":
            bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5
        elif data.gender.lower() == "female":
            bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161
        else:
            raise ValueError("Gender must be 'male' or 'female' for BMR calculation")

        # Round BMR to nearest whole number
        bmr = round(bmr, 0)

        # Get activity multiplier
        activity_key = data.activity_level.lower()
        if activity_key not in self.ACTIVITY_MULTIPLIERS:
            raise ValueError(
                f"Invalid activity level. Must be one of: {', '.join(self.ACTIVITY_MULTIPLIERS.keys())}"
            )

        multiplier = self.ACTIVITY_MULTIPLIERS[activity_key]
        tdee = bmr * multiplier
        tdee = round(tdee, 0)

        return {
            "bmr": bmr,
            "tdee": tdee,
            "activity_level": data.activity_level,
        }
