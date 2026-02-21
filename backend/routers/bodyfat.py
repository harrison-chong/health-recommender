from fastapi import APIRouter, HTTPException
from pydantic import ValidationError

from common.api_types import BodyFatInput, BodyFatResponse
from services.bodyfat_service import BodyFatService


router = APIRouter(prefix="/bodyfat", tags=["bodyfat"])

bodyfat_service = BodyFatService()


@router.post("/", response_model=BodyFatResponse)
async def calculate_body_fat(data: BodyFatInput) -> BodyFatResponse:
    """
    Calculate body fat percentage using U.S. Navy method.

    Args:
        data: Input with waist, neck, hip (for females), and age.

    Returns:
        BodyFatResponse with estimated body fat percentage and category.
    """
    try:
        result = bodyfat_service.execute(data)
        return result
    except ValidationError:
        raise HTTPException(status_code=422, detail="Invalid input data")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(
            status_code=500, detail="Internal server error during body fat calculation"
        )
