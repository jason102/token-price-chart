interface ApiTokenSerie {
  time: number;
  value: number;
}

interface ApiTokenData {
  [token: string]: {
    series: ApiTokenSerie[];
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
