interface ApiTokenSeries {
  time: number;
  value: number;
}

interface ApiTokenData {
  [token: string]: {
    series: ApiTokenSeries[];
    priceChangePercentage: number;
    minValue: number;
    maxValue: number;
  };
}

export interface ApiData {
  result: {
    data: {
      json: ApiTokenData;
    };
  };
}

export interface ChartData {
  time: number | string; // Time is a formatted Date string
  [token: string]: number | string; // The value of each token as a number
}
