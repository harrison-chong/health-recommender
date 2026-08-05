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
            # Female formula: BF% = 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
            if hip is None:
                raise ValueError("Hip measurement is required for females")
            if waist + hip <= neck:
                raise ValueError(
                    "Sum of waist and hip must be larger than neck for females"
                )
            log_waist_hip_neck = math.log10(waist + hip - neck)
            log_height = math.log10(height)
            denominator = 1.29579 - 0.35004 * log_waist_hip_neck + 0.22100 * log_height
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


if __name__ == "__main__":
    # If the coefficients drift, these asserts fail. Run: python -m models.bodyfat_model
    from common.api_types import BodyFatInput

    model = BodyFatModel()

    # Male (82/38/175): published U.S. Navy metric formula → 14.5%
    male = model.execute(BodyFatInput(age=30, gender="male", height=175, waist=82, neck=38))
    assert abs(male["body_fat_percentage"] - 14.5) < 0.1, male

    # Female (78/96/34.5/165): published metric formula → ~28.2% (healthy range,
    # not the 100% clamp the pre-fix 0.15400 coefficient produced).
    female = model.execute(
        BodyFatInput(age=30, gender="female", height=165, waist=78, neck=34.5, hip=96)
    )
    assert abs(female["body_fat_percentage"] - 28.2) < 0.1, female

    print("bodyfat_model self-checks passed")

