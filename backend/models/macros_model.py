from models.abstract_model import AbstractModel
from common.api_types import MacrosInput


class MacrosModel(AbstractModel):
    """
    Model for calculating macronutrient distribution based on TDEE and goals.
    """

    # Macronutrient ratios (protein%, carbs%, fats%) based on goals
    GOAL_RATIOS = {
        "lose_weight": {"protein": 0.30, "carbs": 0.40, "fats": 0.30},
        "maintain": {"protein": 0.25, "carbs": 0.50, "fats": 0.25},
        "build_muscle": {"protein": 0.35, "carbs": 0.45, "fats": 0.20},
    }

    # Diet type adjustments (overrides goal ratios if specified)
    DIET_RATIOS = {
        "standard": None,  # Use goal ratios
        "keto": {"protein": 0.25, "carbs": 0.05, "fats": 0.70},
        "paleo": {"protein": 0.30, "carbs": 0.40, "fats": 0.30},
        "vegetarian": None,  # Use goal ratios, but could add protein source notes
        "vegan": None,  # Use goal ratios, but could add protein source notes
    }

    # Gram calories per macronutrient
    CALORIES_PER_GRAM = {"protein": 4, "carbs": 4, "fats": 9}

    def execute(self, data: MacrosInput) -> dict:
        """
        Calculate macronutrient distribution based on TDEE and goals.

        Args:
            data: Input with TDEE, goal, and optional diet type.

        Returns:
            dict: Macronutrient breakdown in grams and percentages.
        """
        tdee = data.tdee
        goal = data.goal.lower()
        diet_type = (data.diet_type or "standard").lower()

        # Determine which ratios to use
        if diet_type in self.DIET_RATIOS and self.DIET_RATIOS[diet_type] is not None:
            ratios = self.DIET_RATIOS[diet_type]
        elif goal in self.GOAL_RATIOS:
            ratios = self.GOAL_RATIOS[goal]
        else:
            raise ValueError(f"Invalid goal. Must be one of: {', '.join(self.GOAL_RATIOS.keys())}")

        # Calculate grams for each macronutrient
        protein_grams = (tdee * ratios["protein"]) / self.CALORIES_PER_GRAM["protein"]
        carbs_grams = (tdee * ratios["carbs"]) / self.CALORIES_PER_GRAM["carbs"]
        fats_grams = (tdee * ratios["fats"]) / self.CALORIES_PER_GRAM["fats"]

        # Round to nearest gram
        protein_grams = round(protein_grams)
        carbs_grams = round(carbs_grams)
        fats_grams = round(fats_grams)

        # Recalculate actual calorie distribution from rounded grams
        actual_calories = (
            protein_grams * self.CALORIES_PER_GRAM["protein"]
            + carbs_grams * self.CALORIES_PER_GRAM["carbs"]
            + fats_grams * self.CALORIES_PER_GRAM["fats"]
        )

        # Adjust to match TDEE if rounding caused significant deviation
        if abs(actual_calories - tdee) > 10:
            # Distribute the difference proportionally
            diff = tdee - actual_calories
            if diff > 0:
                protein_grams += round(diff * ratios["protein"] / self.CALORIES_PER_GRAM["protein"])
                carbs_grams += round(diff * ratios["carbs"] / self.CALORIES_PER_GRAM["carbs"])
                fats_grams += round(diff * ratios["fats"] / self.CALORIES_PER_GRAM["fats"])
            else:
                protein_grams -= round(abs(diff) * ratios["protein"] / self.CALORIES_PER_GRAM["protein"])
                carbs_grams -= round(abs(diff) * ratios["carbs"] / self.CALORIES_PER_GRAM["carbs"])
                fats_grams -= round(abs(diff) * ratios["fats"] / self.CALORIES_PER_GRAM["fats"])

            # Recalculate actual calories
            actual_calories = (
                (protein_grams if protein_grams > 0 else 0) * self.CALORIES_PER_GRAM["protein"]
                + (carbs_grams if carbs_grams > 0 else 0) * self.CALORIES_PER_GRAM["carbs"]
                + (fats_grams if fats_grams > 0 else 0) * self.CALORIES_PER_GRAM["fats"]
            )

        # Calculate percentages based on final values
        if actual_calories > 0:
            protein_percentage = (protein_grams * self.CALORIES_PER_GRAM["protein"] / actual_calories) * 100
            carbs_percentage = (carbs_grams * self.CALORIES_PER_GRAM["carbs"] / actual_calories) * 100
            fats_percentage = (fats_grams * self.CALORIES_PER_GRAM["fats"] / actual_calories) * 100
        else:
            protein_percentage = carbs_percentage = fats_percentage = 0

        # Round percentages to one decimal
        protein_percentage = round(protein_percentage, 1)
        carbs_percentage = round(carbs_percentage, 1)
        fats_percentage = round(fats_percentage, 1)

        return {
            "calories": round(actual_calories, 0),
            "protein_grams": max(0, protein_grams),
            "carbs_grams": max(0, carbs_grams),
            "fats_grams": max(0, fats_grams),
            "protein_percentage": protein_percentage,
            "carbs_percentage": carbs_percentage,
            "fats_percentage": fats_percentage,
            "goal": data.goal,
            "diet_type": diet_type,
        }
