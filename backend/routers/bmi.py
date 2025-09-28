from fastapi import APIRouter, HTTPException
from pydantic import ValidationError

from common.api_types import BMICalculationInput, BMIResponse
from services.bmi_service import BmiService


router = APIRouter(prefix="/bmi", tags=["bmi"])


bmi_service = BmiService()


@router.post("/", response_model=BMIResponse)
async def calculate_bmi(data: BMICalculationInput) -> BMIResponse:
    """
    Calculate BMI based on user weight and height.
    """
    try:
        result = bmi_service.execute(data)
        return result
    except ValidationError:
        raise HTTPException(status_code=422, detail="Invalid input data")
    except Exception:
        raise HTTPException(
            status_code=500, detail="Internal server error during BMI calculation"
        )
