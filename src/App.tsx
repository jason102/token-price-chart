import "./App.css";
import { useGetChartData, Tokens } from "./useGetChartData";
import Chart from "./Chart";

const DATE_RANGE_IN_DAYS = 7;

const App: React.FC = () => {
  const { isLoading, errorMessage, chartData } = useGetChartData({
    tokens: [Tokens.Atom, Tokens.Neutron],
    dateRangeInDays: DATE_RANGE_IN_DAYS,
  });

  const ChartContainer = () => {
    if (isLoading) {
      return <div className="messageContainer">Loading...</div>;
    }

    if (errorMessage) {
      return <div className="messageContainer">{errorMessage}</div>;
    }

    return <Chart chartData={chartData!} />;
  };

  return (
    <div className="appContainer">
      <h3 style={{ textAlign: "center" }}>Token Price Chart</h3>
      <ChartContainer />
    </div>
  );
};

export default App;
