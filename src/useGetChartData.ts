import { useEffect, useState, useCallback } from "react";
import { ApiData, ChartData } from "./types";

export enum Tokens {
  Atom = "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
  Neutron = "untrn",
}

const ASTROPORT_URL = "https://app.astroport.fi/api/trpc/charts.prices?input=";
const CHAIN_ID = "neutron-1";

const getEnumKey = (value: string) =>
  Object.keys(Tokens).find(
    (key) => Tokens[key as keyof typeof Tokens] === value
  );

const normalizeChartData = (apiData: ApiData): ChartData[] => {
  const jsonData = apiData.result.data.json;

  const keys = Object.keys(jsonData);
  const firstTokenSeries = jsonData[keys[0]].series;

  const combinedTokenSeries = firstTokenSeries.map<ChartData>((_, index) => {
    const combinedSeriesObject: ChartData = {
      time: new Date(
        jsonData[keys[0]].series[index].time * 1000
      ).toLocaleDateString([], {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
      }),
    };

    keys.forEach((key) => {
      combinedSeriesObject[getEnumKey(key)!] =
        jsonData[key].series[index].value;
    });

    return combinedSeriesObject;
  });

  return combinedTokenSeries;
};

interface Props {
  dateRangeInDays: number;
  tokens: Tokens[];
}

export const useGetChartData = ({ dateRangeInDays, tokens }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);

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

  return { getChartData, errorMessage, isLoading, chartData };
};
