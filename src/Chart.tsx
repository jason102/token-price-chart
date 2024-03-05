import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartData, PriceData } from "./types";
import "./Chart.css";

const CHART_X_AXIS_INTERVAL = 8;

const TOKEN_COLORS: { [key: string]: string } = {
  Atom: "red",
  Neutron: "green",
};

interface Props {
  chartData: ChartData[];
  priceData: PriceData[];
}

const Chart: React.FC<Props> = ({ chartData, priceData }) => (
  <div className="chartContainer">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        {priceData.map(({ token }) => (
          <Line
            key={token}
            type="monotone"
            dataKey={token}
            stroke={TOKEN_COLORS[token]}
          />
        ))}
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="time"
          interval={CHART_X_AXIS_INTERVAL}
          label={{
            value: "Date, Time",
            position: "insideBottomRight",
            offset: -10,
          }}
        />
        <YAxis
          label={{ value: "Value", angle: -90, position: "outsideLeft" }}
        />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Chart;
