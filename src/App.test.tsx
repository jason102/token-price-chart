import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App";
import * as useGetChartData from "./useGetChartData";
import { mockedChartData, mockedPriceData } from "./mockedData";

const mockedUseGetChartData = {
  errorMessage: "",
  getChartData: vi.fn(),
  isLoading: false,
  chartData: mockedChartData,
  priceData: mockedPriceData,
};

vi.mock("recharts");

describe("App.tsx test cases", () => {
  it("Renders a mocked chart", () => {
    vi.spyOn(useGetChartData, "useGetChartData").mockImplementationOnce(
      () => mockedUseGetChartData
    );

    render(<App />);

    const headerText = screen.getByText(
      "Token price chart for the past 7 days"
    );
    const neutronPriceHeader = screen.getByText("Token: Neutron");
    const atomPriceHeader = screen.getByText("Token: Atom");

    expect(headerText).toBeVisible();
    expect(neutronPriceHeader).toBeVisible();
    expect(atomPriceHeader).toBeVisible();
  });

  it("Shows a loading UI when loading", () => {
    vi.spyOn(useGetChartData, "useGetChartData").mockImplementationOnce(() => ({
      ...mockedUseGetChartData,
      isLoading: true,
    }));

    render(<App />);

    const loadingText = screen.getByText("Loading...");

    expect(loadingText).toBeVisible();
  });

  it("Shows an error when there is an error", () => {
    vi.spyOn(useGetChartData, "useGetChartData").mockImplementationOnce(() => ({
      ...mockedUseGetChartData,
      errorMessage: "Error!",
    }));

    render(<App />);

    const errorText = screen.getByText("Error!");

    expect(errorText).toBeVisible();
  });

  it("Refreshes the mocked chart when the Refresh chart button is clicked", async () => {
    const spy = vi
      .spyOn(useGetChartData, "useGetChartData")
      .mockImplementationOnce(() => mockedUseGetChartData);

    render(<App />);

    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
