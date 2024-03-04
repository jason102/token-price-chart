import { useEffect, useState, useCallback } from "react";
import { ApiData } from "./types";

const ASTROPORT_URL = "https://app.astroport.fi/api/trpc/charts.prices?input=";
const TOKENS = [
  "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
  "untrn",
];
const CHAIN_ID = "neutron-1";

export const useGetChartData = (dateRangeInDays: number) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<ApiData | null>(null);

  const getChartData = useCallback(async () => {
    setErrorMessage("");
    setIsLoading(true);

    const inputParam = {
      json: {
        tokens: TOKENS,
        chainId: CHAIN_ID,
        dateRange: `D${dateRangeInDays}`,
      },
    };

    const fullUrl = `${ASTROPORT_URL}${encodeURIComponent(
      JSON.stringify(inputParam)
    )}`;

    try {
      const response = await fetch(fullUrl);

      if (!response.ok) {
        setErrorMessage(response.statusText);
        setIsLoading(false);
        return;
      }

      const apiData: ApiData = await response.json();

      setChartData(apiData);
    } catch (error) {
      // In a real app, report to error logging software instead of console logging it
      console.error(error);
      setErrorMessage("Uh oh, something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [dateRangeInDays]);

  // Load the data when the component renders the first time
  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return { getChartData, errorMessage, isLoading, chartData };
};
