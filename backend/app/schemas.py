from pydantic import BaseModel, Field

class PredictRequest(BaseModel):
    experience_years: float = Field(..., gt=0, description="Years of experience (must be > 0)")

class PredictResponse(BaseModel):
    experience_years: float
    predicted_salary: float
