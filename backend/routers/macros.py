from fastapi import APIRouter, HTTPException
from pydantic import ValidationError

from common.api_types import MacrosInput, MacrosResponse
from services.macros_service import MacrosService


router = APIRouter(prefix="/macros", tags=["macros"])

macros_service = MacrosService()


@router.post("/", response_model=MacrosResponse)
async def calculate_macros(data: MacrosInput) -> MacrosResponse:
    """
    Calculate macronutrient distribution based on TDEE and goals.

    Args:
        data: Input with TDEE, goal, and optional diet type.

    Returns:
        MacrosResponse with protein, carbs, and fats in grams and percentages.
    """
    try:
        result = macros_service.execute(data)
        return result
    except ValidationError:
        raise HTTPException(status_code=422, detail="Invalid input data")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal server error during macronutrient calculation",
        )
