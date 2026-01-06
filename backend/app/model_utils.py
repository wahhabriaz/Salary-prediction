import json
import joblib
import numpy as np
from pathlib import Path

ARTIFACTS_DIR = Path(__file__).resolve().parent.parent / "artifacts"

MODEL_PATH = ARTIFACTS_DIR / "model.joblib"
METRICS_PATH = ARTIFACTS_DIR / "metrics.json"

def load_model():
    if not MODEL_PATH.exists():
        raise FileNotFoundError("Model not found. Run train.py first.")
    return joblib.load(MODEL_PATH)

def load_metrics():
    if not METRICS_PATH.exists():
        raise FileNotFoundError("Metrics not found. Run train.py first.")
    with open(METRICS_PATH, "r") as f:
        return json.load(f)

def predict_salary(model, years: float) -> float:
    x = np.array([[years]])
    return float(model.predict(x)[0])
