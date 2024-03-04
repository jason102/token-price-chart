import "./App.css";
import { useGetChartData } from "./useGetChartData";

const DATE_RANGE_IN_DAYS = 7;

const App: React.FC = () => {
  const { getChartData, isLoading, errorMessage, chartData } =
    useGetChartData(DATE_RANGE_IN_DAYS);

  return (
    <>
      <h1>Token Price Chart</h1>
    </>
  );
};

export default App;
