import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";

// Custom tooltip for nicer display
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div style={{ background: "white", padding: 10, border: "1px solid #ccc" }}>
        <p><b>Experience:</b> {d.experience}</p>
        <p><b>Salary:</b> {d.salary}</p>
      </div>
    );
  }
  return null;
}

export default function SalaryChart({ data, lineData, predictedPoint }) {
  return (
    <div style={{ height: 400, marginTop: 30 }}>
      <h2>Experience vs Salary</h2>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>
          <CartesianGrid />

          <XAxis
            type="number"
            dataKey="experience"
            name="Experience"
            label={{ value: "Experience (Years)", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            type="number"
            dataKey="salary"
            name="Salary"
            label={{ value: "Salary", angle: -90, position: "insideLeft" }}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Scatter points (dataset) */}
          <Scatter name="Actual Data" data={data} />

          {/* Regression Line */}
          <Line
            type="linear"
            dataKey="salary"
            data={lineData}
            dot={false}
            name="Regression Line"
          />

          {/* Predicted point (optional) */}
          {predictedPoint && (
            <Scatter
              name="Your Prediction"
              data={[predictedPoint]}
              shape="circle"
            />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
