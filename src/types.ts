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

export interface PriceData {
  token: string;
  min: number;
  max: number;
  average: number;
}

export enum Tokens {
  Atom = "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9",
  Neutron = "untrn",
}
