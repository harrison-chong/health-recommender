# Backend Structure and Usage

This FastAPI backend follows a layered architecture for scalability: routers (HTTP endpoints), services (orchestration/validation), and models (core logic). Shared utilities are in `common/`.

## Layers Overview

### Models (`backend/models/`)
- **Purpose**: Pure domain logic (e.g., AI calls, computations). Stateless, focused on "what" to compute.
- **AbstractModel**: Enforces `execute()` for consistency. Subclasses define inputs/outputs via docstrings (flexible: params or state-based).
- **Example**: `WorkoutModel.execute(data)` renders prompts and calls OpenAI—no HTTP awareness.
- **Focus**: Logic only; raise exceptions on failure—let services handle.

### Services (`backend/services/`)
- **Purpose**: Orchestrates models, adds "how" (e.g., validation, error handling, composition). Acts as glue between routers and models.
- **AbstractService**: Enforces `execute()` for entry point. Subclasses handle specifics (e.g., call models, wrap responses).
- **Example**: `WorkoutService.execute(data)` validates input, calls model, returns Pydantic-wrapped result.
- **Focus**: API robustness (e.g., catch errors → HTTP 400); reusable for multiple endpoints.

**Why separate?** Models stay pure/testable; services enable composition (e.g., cache model output) without bloating routers. Not overkill—scales as features grow (e.g., auth/logging in services).

## Adding a New Endpoint (e.g., `/nutrition/plan`)

1. **Create Model** (if new logic):
   - Add `models/nutrition_model.py`: Inherit `AbstractModel`, implement `execute()` (e.g., AI call with new prompt in `prompts/`).
   - Example: Render template, call OpenAI → return str/dict.

2. **Create Service** (orchestration):
   - Add `services/nutrition_service.py`: Inherit `AbstractService`, in `__init__` create model, in `execute()` call model & wrap result (e.g., new Pydantic if needed in `common/api_types.py`).

3. **Create Router** (endpoint):
   - Add `routers/nutrition.py`: Use `APIRouter` (prefix="/nutrition" for grouping).
   - Define route (e.g., `@router.post("/plan")`), call service.execute().

4. **Include in main.py**:
   - Import: `from routers.nutrition import router as nutrition_router`
   - Add: `app.include_router(nutrition_router)`

5. **Test**:
   - Run: `uv run uvicorn main:app --reload`
   - Use `/docs` Swagger or curl: Verify input validation/response.
   - Debug: Check imports in REPL (`python -c "from backend...; print('OK')"`).

Add prompts to `prompts/`, update `pyproject.toml`/`uv lock` for new deps. Structure supports versioning (e.g., `/v1/nutrition`).

For questions, see logs or FastAPI docs.