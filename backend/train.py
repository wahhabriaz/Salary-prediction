import json
import joblib
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

DATA_PATH = "data.csv"
MODEL_PATH = "artifacts/model.joblib"
METRICS_PATH = "artifacts/metrics.json"

FEATURE_COL = "Experience Years"
TARGET_COL = "Salary"

def train():
    df = pd.read_csv(DATA_PATH)

    # Basic checks (professional habit)
    df = df.dropna()
    df = df.drop_duplicates()

    X = df[[FEATURE_COL]]
    y = df[TARGET_COL]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = LinearRegression()
    model.fit(X_train, y_train)

    preds = model.predict(X_test)

    mae = mean_absolute_error(y_test, preds)
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    r2 = r2_score(y_test, preds)

    slope = float(model.coef_[0])
    intercept = float(model.intercept_)

    # Save model
    joblib.dump(model, MODEL_PATH)

    # Save metrics + model info
    metrics = {
        "mae": float(mae),
        "rmse": float(rmse),
        "r2": float(r2),
        "slope": slope,
        "intercept": intercept,
        "feature_name": FEATURE_COL,
        "target_name": TARGET_COL,
    }

    with open(METRICS_PATH, "w") as f:
        json.dump(metrics, f, indent=2)

    print("✅ Training complete!")
    print(f"MAE={mae:.2f}, RMSE={rmse:.2f}, R2={r2:.3f}")
    print(f"Equation: Salary = {slope:.2f} * Experience + {intercept:.2f}")

if __name__ == "__main__":
    train()
