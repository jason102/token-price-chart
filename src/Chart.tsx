import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartData } from "./types";
import "./Chart.css";

const CHART_X_AXIS_INTERVAL = 8;

interface Props {
  chartData: ChartData[];
}

const Chart: React.FC<Props> = ({ chartData }) => (
  <div className="chartContainer">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="Atom" stroke="red" />
        <Line type="monotone" dataKey="Neutron" stroke="green" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" interval={CHART_X_AXIS_INTERVAL} />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default Chart;
