from fastapi import APIRouter, HTTPException
from pydantic import ValidationError

from common.api_types import BMRInput, BMRResponse
from services.bmr_service import BmrService


router = APIRouter(prefix="/bmr", tags=["bmr"])

bmr_service = BmrService()


@router.post("/", response_model=BMRResponse)
async def calculate_bmr(data: BMRInput) -> BMRResponse:
    """
    Calculate BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure).

    Args:
        data: Input containing age, weight, height, gender, and activity level.

    Returns:
        BMRResponse with BMR and TDEE values.
    """
    try:
        result = bmr_service.execute(data)
        return result
    except ValidationError:
        raise HTTPException(status_code=422, detail="Invalid input data")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=500, detail="Internal server error during BMR calculation"
        )
