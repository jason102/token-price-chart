import { ApiData, ChartData, PriceData, Tokens } from "./types";

const getEnumKey = (value: string) =>
  Object.keys(Tokens).find(
    (key) => Tokens[key as keyof typeof Tokens] === value
  );

export const normalizeChartData = (apiData: ApiData): ChartData[] => {
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

export const normalizePriceData = (apiData: ApiData): PriceData[] => {
  const jsonData = apiData.result.data.json;

  return Object.keys(jsonData).map<PriceData>((key) => {
    const tokenData = jsonData[key];

    const total = tokenData.series.reduce((accumulated, nextValue) => {
      return accumulated + nextValue.value;
    }, 0);

    const average = total / tokenData.series.length;

    return {
      token: getEnumKey(key)!,
      average,
      min: tokenData.minValue,
      max: tokenData.maxValue,
    };
  });
};
