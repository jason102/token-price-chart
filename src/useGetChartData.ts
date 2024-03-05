import { useEffect, useState, useCallback } from "react";
import { ApiData, ChartData, PriceData, Tokens } from "./types";
import { normalizeChartData, normalizePriceData } from "./normalizers";

const ASTROPORT_URL = "https://app.astroport.fi/api/trpc/charts.prices?input=";
const CHAIN_ID = "neutron-1";

interface Props {
  dateRangeInDays: number;
  tokens: Tokens[];
}

export const useGetChartData = ({ dateRangeInDays, tokens }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [priceData, setPriceData] = useState<PriceData[]>([]);

  const getChartData = useCallback(async () => {
    setErrorMessage("");
    setIsLoading(true);

    const inputParam = {
      json: {
        tokens: tokens,
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

      const normalizedData = normalizeChartData(apiData);
      setChartData(normalizedData);

      const normalizedPriceData = normalizePriceData(apiData);
      setPriceData(normalizedPriceData);
    } catch (error) {
      // In a real app, report to error logging software instead of console logging it
      console.error(error);
      setErrorMessage("Uh oh, something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load the data when the component renders the first time
  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return { getChartData, errorMessage, isLoading, chartData, priceData };
};
