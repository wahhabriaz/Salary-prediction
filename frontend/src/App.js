import { useEffect, useState } from "react";
import axios from "axios";
import SalaryChart from "./components/SalaryChart";

function App() {
  const API = "http://127.0.0.1:8000";

  const [experience, setExperience] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load metrics + dataset on startup
  useEffect(() => {
    const loadEverything = async () => {
      try {
        const metricsRes = await axios.get(`${API}/metrics`);
        const dataRes = await axios.get(`${API}/data`);

        const m = metricsRes.data;
        setMetrics(m);

        // ✅ Convert backend CSV keys to chart-friendly keys
        // Your CSV keys: "Experience Years", "Salary"
        const formatted = dataRes.data.map((row) => ({
          experience: row["Experience Years"],
          salary: row["Salary"],
        }));

        setData(formatted);

        // ✅ Create regression line points
        // Take min and max x from dataset
        const xs = formatted.map((d) => d.experience);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);

        // line equation: y = slope*x + intercept
        const line = [
          { experience: minX, salary: m.slope * minX + m.intercept },
          { experience: maxX, salary: m.slope * maxX + m.intercept },
        ];

        setLineData(line);
      } catch (e) {
        setError("Failed to load metrics/data. Check backend is running.");
      }
    };

    loadEverything();
  }, []);

  const handlePredict = async () => {
    setError("");
    setPrediction(null);

    if (!experience || Number(experience) <= 0) {
      setError("Please enter a valid experience value (> 0).");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API}/predict`, {
        experience_years: Number(experience),
      });
      setPrediction(res.data.predicted_salary);
    } catch (e) {
      setError("Prediction failed. Check backend is running and CORS is enabled.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Predicted point for chart (only show if prediction exists)
  const predictedPoint =
    prediction !== null
      ? {
          experience: Number(experience),
          salary: prediction,
        }
      : null;

  return (
    <div style={{ padding: 30, fontFamily: "Arial", maxWidth: 900, margin: "0 auto" }}>
      <h1>Salary Prediction (Linear Regression)</h1>
      <p>Enter experience years and get predicted salary using a trained model.</p>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <input
          type="number"
          placeholder="Experience years (e.g. 5)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={{ flex: 1, padding: 10, fontSize: 16 }}
        />
        <button
          onClick={handlePredict}
          style={{
            padding: "10px 16px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Predict
        </button>
      </div>

      {loading && <p style={{ marginTop: 15 }}>Predicting...</p>}

      {error && (
        <p style={{ marginTop: 15, color: "crimson" }}>
          {error}
        </p>
      )}

      {prediction !== null && (
        <div style={{ marginTop: 25, padding: 15, border: "1px solid #ddd", borderRadius: 8 }}>
          <h2>Predicted Salary</h2>
          <p style={{ fontSize: 20 }}>${prediction.toFixed(2)}</p>
        </div>
      )}

      {metrics && (
        <div style={{ marginTop: 30, padding: 15, border: "1px solid #ddd", borderRadius: 8 }}>
          <h2>Model Info</h2>
          <p><b>MAE:</b> {metrics.mae.toFixed(2)}</p>
          <p><b>RMSE:</b> {metrics.rmse.toFixed(2)}</p>
          <p><b>R²:</b> {metrics.r2.toFixed(3)}</p>
          <p>
            <b>Equation:</b> Salary = {metrics.slope.toFixed(2)} × Experience +{" "}
            {metrics.intercept.toFixed(2)}
          </p>
        </div>
      )}

      {/* ✅ Chart */}
      {data.length > 0 && metrics && (
        <SalaryChart
          data={data}
          lineData={lineData}
          predictedPoint={predictedPoint}
        />
      )}
    </div>
  );
}

export default App;
