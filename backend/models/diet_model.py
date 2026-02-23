from typing import Optional

from common.api_types import HealthData
from common.config import config
from common.client import client
from common.utils import render_template

from models.abstract_model import AbstractModel


class DietModel(AbstractModel):
    """
    Model for generating diet recommendations using AI.
    Inherits from AbstractModel and implements execute() method.
    """

    def execute(self, data: HealthData) -> str:
        """
        Generate diet recommendation using AI model.

        Args:
            data (HealthData): User's health metrics and goals.

        Returns:
            str: AI-generated recommendation string.
        """
        # Construct human metrics string
        goals: Optional[str] = data.goals or "None"
        body_fat = (
            f"{data.body_fat_percentage}%"
            if data.body_fat_percentage is not None
            else "Not provided"
        )
        human_metrics = (
            f"Age: {data.age}, Weight: {data.weight}kg, Height: {data.height}cm, "
            f"Fitness Level: {data.fitness_level}, Gender: {data.gender}, "
            f"Occupation: {data.occupation}, Average Sleep: {data.average_sleep_hours} hours, "
            f"Body Fat: {body_fat}, Goals: {goals}"
        )

        # Render template using the general utility function
        # Provide the relative path to the template for loading from the prompts directory
        rendered_prompt = render_template(
            "prompts/diet_recommender.jinja2", human_metrics=human_metrics
        )

        # Call OpenAI
        response = client.chat.completions.create(
            model=config.MODEL_NAME,
            messages=[{"role": "user", "content": rendered_prompt}],
        )

        return response.choices[0].message.content
