import os
from jinja2 import Environment, FileSystemLoader


def render_template(template_path: str, **context) -> str:
    """
    Render a Jinja2 template with provided context.
    Args:
        template_path (str): Full path to the template file.
        **context: Variables to pass to the template.
    Returns:
        str: Rendered template string.
    """
    template_dir = os.path.dirname(template_path)
    template_name = os.path.basename(template_path)
    loader = FileSystemLoader(template_dir)
    env = Environment(loader=loader)
    template = env.get_template(template_name)
    return template.render(**context)
