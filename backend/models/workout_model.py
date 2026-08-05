from common.api_types import HealthData
from common.config import config
from common.client import client
from common.utils import render_template, build_human_metrics

from models.abstract_model import AbstractModel


class WorkoutModel(AbstractModel):
    """
    Model for generating workout recommendations using AI.
    Inherits from AbstractModel and implements execute() method.
    """

    def execute(self, data: HealthData) -> str:
        """
        Generate workout recommendation using AI model.

        Args:
            data (HealthData): User's health metrics and goals.

        Returns:
            str: AI-generated recommendation string.
        """
        human_metrics = build_human_metrics(data)

        # Render template using the general utility function
        # Provide the relative path to the template for loading from the prompts directory
        rendered_prompt = render_template(
            "prompts/workout_recommender.jinja2", human_metrics=human_metrics
        )

        # Call OpenAI
        response = client.chat.completions.create(
            model=config.MODEL_NAME,
            messages=[{"role": "user", "content": rendered_prompt}],
        )

        return response.choices[0].message.content
