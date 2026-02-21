import math

from models.abstract_model import AbstractModel
from common.api_types import BodyFatInput


class BodyFatModel(AbstractModel):
    """
    Model for estimating body fat percentage using the U.S. Navy method.
    Requires circumference measurements and height.
    """

    # Body fat percentage categories based on ACSM guidelines
    BODY_FAT_CATEGORIES = {
        "male": [
            (0, 6, "Essential fat"),
            (6, 14, "Athletes"),
            (14, 18, "Fitness"),
            (18, 25, "Average"),
            (25, 100, "Obese"),
        ],
        "female": [
            (0, 14, "Essential fat"),
            (14, 21, "Athletes"),
            (21, 25, "Fitness"),
            (25, 32, "Average"),
            (32, 100, "Obese"),
        ],
    }

    def execute(self, data: BodyFatInput) -> dict:
        """
        Calculate body fat percentage using U.S. Navy formula.

        Args:
            data: Input with waist, neck, (optional hip for females), and age.

        Returns:
            dict: Body fat percentage and category label.
        """
        gender = data.gender.lower()
        waist = data.waist
        neck = data.neck
        hip = data.hip
        height = data.height

        # All measurements in cm, use logarithms
        if gender == "male":
            # Male formula: BF% = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
            if waist <= neck:
                raise ValueError("Waist must be larger than neck for males")
            log_waist_neck = math.log10(waist - neck)
            log_height = math.log10(height)
            denominator = 1.0324 - 0.19077 * log_waist_neck + 0.15456 * log_height
        elif gender == "female":
            # Female formula: BF% = 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.15400 * log10(height)) - 450
            if hip is None:
                raise ValueError("Hip measurement is required for females")
            if waist + hip <= neck:
                raise ValueError("Sum of waist and hip must be larger than neck for females")
            log_waist_hip_neck = math.log10(waist + hip - neck)
            log_height = math.log10(height)
            denominator = 1.29579 - 0.35004 * log_waist_hip_neck + 0.15400 * log_height
        else:
            raise ValueError("Gender must be 'male' or 'female'")

        if denominator == 0:
            raise ValueError("Invalid measurements resulted in zero denominator")

        body_fat = (495 / denominator) - 450
        body_fat = round(body_fat, 1)

        # Clamp to valid range
        body_fat = max(0.0, min(body_fat, 100.0))

        # Determine category
        category = self._get_category(gender, body_fat)

        return {"body_fat_percentage": body_fat, "category": category}

    def _get_category(self, gender: str, body_fat: float) -> str:
        """Determine body fat category based on gender and percentage."""
        categories = self.BODY_FAT_CATEGORIES.get(gender.lower())
        if not categories:
            return "Unknown"

        for min_val, max_val, label in categories:
            if min_val <= body_fat < max_val:
                return label
        return "Unknown"
