from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from app.schemas import PredictRequest, PredictResponse
from app.model_utils import load_model, load_metrics, predict_salary

app = FastAPI(title="Salary Prediction API", version="1.0.0")

# CORS (so React can call FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model()
metrics = load_metrics()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/metrics")
def get_metrics():
    return metrics

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    pred = predict_salary(model, req.experience_years)
    return {
        "experience_years": req.experience_years,
        "predicted_salary": pred
    }
@app.get("/data")
def get_data():
    df = pd.read_csv("data.csv")
    return df.to_dict(orient="records")