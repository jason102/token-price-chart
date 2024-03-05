import { normalizeChartData, normalizePriceData } from "./normalizers";
import { mockedApiData, mockedChartData, mockedPriceData } from "./mockedData";

describe("normalizers", () => {
  it("Normalizes chart data", () => {
    expect(normalizeChartData(mockedApiData)).toEqual(mockedChartData);
  });

  it("Normalizes price data", () => {
    expect(normalizePriceData(mockedApiData)).toEqual(mockedPriceData);
  });
});
