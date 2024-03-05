import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App";
import * as useGetChartData from "./useGetChartData";

const mockedPriceData = [
  { token: "Atom", average: 11.689069767441863, min: 10.93, max: 12.83 },
  { token: "Neutron", average: 1.5732558139534882, min: 1.39, max: 1.91 },
];

const mockedChartData = [
  { time: "2/26, 4 PM", Atom: 11.15, Neutron: 1.82 },
  { time: "2/26, 8 PM", Atom: 11.38, Neutron: 1.91 },
  { time: "2/27, 12 AM", Atom: 11.12, Neutron: 1.8 },
  { time: "2/27, 4 AM", Atom: 11.05, Neutron: 1.78 },
  { time: "2/27, 8 AM", Atom: 11, Neutron: 1.75 },
  { time: "2/27, 12 PM", Atom: 11.29, Neutron: 1.75 },
  { time: "2/27, 4 PM", Atom: 11.21, Neutron: 1.75 },
  { time: "2/27, 8 PM", Atom: 11.14, Neutron: 1.74 },
  { time: "2/28, 12 AM", Atom: 11.39, Neutron: 1.74 },
];

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
