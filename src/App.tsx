import "./App.css";
import { useGetChartData } from "./useGetChartData";
import Chart from "./Chart";
import { Tokens } from "./types";

const DATE_RANGE_IN_DAYS = 7;

const App: React.FC = () => {
  const { isLoading, errorMessage, chartData, priceData, getChartData } =
    useGetChartData({
      tokens: [Tokens.Atom, Tokens.Neutron],
      dateRangeInDays: DATE_RANGE_IN_DAYS,
    });

  const onRefreshData = async () => {
    await getChartData();
  };

  const LoadedChartContent = () => {
    if (isLoading) {
      return <div className="messageContainer">Loading...</div>;
    }

    if (errorMessage) {
      return <div className="messageContainer">{errorMessage}</div>;
    }

    return (
      <>
        <Chart chartData={chartData!} priceData={priceData} />
        <div className="refreshButtonContainer">
          <button onClick={onRefreshData}>Refresh data</button>
        </div>
        <div className="priceContainer">
          {priceData.map(({ token, average, max, min }) => (
            <div key={token}>
              <h4>{`Token: ${token}`}</h4>
              <div>{`Average price: ${average}`}</div>
              <div>{`Minimum price: ${min}`}</div>
              <div>{`Maximum price: ${max}`}</div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="appContainer">
      <h3
        style={{ textAlign: "center" }}
      >{`Token price chart for the past ${DATE_RANGE_IN_DAYS} days`}</h3>
      <LoadedChartContent />
    </div>
  );
};

export default App;
