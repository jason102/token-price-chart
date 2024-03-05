import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

vi.mock("./useGetChartData", () => ({
  useGetChartData: () => ({
    errorMessage: "",
    getChartData: vi.fn(),
    isLoading: false,
    chartData: [],
    priceData: [],
  }),
}));

vi.mock("./Chart");

describe("App", () => {
  it("Renders ", () => {
    render(<App />);

    const headerText = screen.getByText(
      "Token price chart for the past 7 days"
    );
    expect(headerText).toBeInTheDocument();
  });
});
