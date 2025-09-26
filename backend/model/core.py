from common.api_types import HealthData
from common.config import config
from common.client import client
from common.utils import render_template


def generate_recommendation(data: HealthData) -> str:
    """
    Generate workout recommendation using AI model.
    Args:
        data (HealthData): User's health metrics and goals.
    Returns:
        str: AI-generated recommendation string.
    """
    # Construct human metrics string
    goals = data.goals or "None"
    human_metrics = f"Age: {data.age}, Weight: {data.weight}kg, Height: {data.height}cm, Fitness Level: {data.fitness_level}, Gender: {data.gender}, Occupation: {data.occupation}, Average Sleep: {data.average_sleep_hours} hours, Body Fat: {data.body_fat_percentage}%, Goals: {goals}"

    # Render template
    rendered_prompt = render_template(
        "model/prompt/recommender.jinja2", human_metrics=human_metrics
    )

    # Call OpenAI
    response = client.chat.completions.create(
        model=config.MODEL_NAME,
        messages=[{"role": "user", "content": rendered_prompt}],
    )

    return response.choices[0].message.content
