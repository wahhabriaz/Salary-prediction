# Salary Prediction (Full Stack ML Project)

A full-stack Machine Learning project using **Simple Linear Regression** to predict salary based on years of experience.

✅ **Backend:** FastAPI + Scikit-learn  
✅ **Frontend:** React  
✅ **Model:** Linear Regression (1 feature)  
✅ **Features:** Prediction API, Model Metrics, Dataset Visualization (scatter + regression line)

---

## 📌 Project Structure

```
Salary-prediction/
  backend/
    app/
      main.py
      model_utils.py
      schemas.py
    artifacts/
      model.joblib
      metrics.json
    data.csv
    train.py
    requirements.txt
  frontend/
    src/
    package.json
  .gitignore
  README.md
```

---

## ✅ Dataset

The dataset contains:

- `Experience Years` → feature (input)
- `Salary` → target (output)

Example:

```csv
Experience Years,Salary
1.1,39343
1.2,42774
...
10.5,121872
```

---

## ⚙️ Backend Setup (FastAPI)

### 1) Go to backend folder

```bash
cd backend
```

### 2) Create and activate virtual environment

```bash
python -m venv venv
source venv/bin/activate
```

> On Windows:
```bash
venv\Scripts\activate
```

### 3) Install dependencies

```bash
pip install -r requirements.txt
```

---

## 🧠 Train the Model

Run training script:

```bash
python train.py
```

This generates:

- `artifacts/model.joblib`
- `artifacts/metrics.json`

---

## 🚀 Run Backend Server

```bash
uvicorn app.main:app --reload
```

Backend runs at:

- API: http://127.0.0.1:8000  
- Swagger Docs: http://127.0.0.1:8000/docs  

---

## 🔌 API Endpoints

| Method | Endpoint   | Description |
|--------|-----------|-------------|
| GET    | `/health` | Health check |
| GET    | `/metrics` | Model performance + equation |
| GET    | `/data` | Returns dataset for chart |
| POST   | `/predict` | Returns predicted salary |

### Example `/predict` Request

```json
{
  "experience_years": 5
}
```

### Example Response

```json
{
  "experience_years": 5,
  "predicted_salary": 73000.25
}
```

---

## 🎨 Frontend Setup (React)

### 1) Go to frontend folder

```bash
cd ../frontend
```

### 2) Install dependencies

```bash
npm install
```

### 3) Start the frontend

```bash
npm start
```

Frontend runs at:

- http://localhost:3000

---

## 📊 Frontend Features

✅ Input years of experience  
✅ Predict salary using FastAPI backend  
✅ View model metrics (MAE, RMSE, R²)  
✅ View regression equation  
✅ View scatter plot + regression line  
✅ Highlight predicted point on chart  

---

## 🛠 Common Issues

### ✅ CORS Error (React can't call backend)

Make sure you added CORS middleware in `backend/app/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Restart backend after changes.

---

## ✅ `.gitignore`

This project ignores common folders like:
- `venv/`
- `node_modules/`
- `__pycache__/`

---

## 🌟 Future Improvements (Optional)

- Add `/retrain` endpoint
- Add Docker support
- Deploy backend on Render/Railway
- Deploy frontend on Vercel/Netlify
- Add confidence interval visualization
- Support multiple regression (multiple features)

---

## 👤 Author

**Abdul Wahaab**  
Built for learning full-stack Machine Learning engineering.
