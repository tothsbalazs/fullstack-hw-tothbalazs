import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SensorReadings from "../components/SensorReadings";
import { postSensorReading } from "../services/api";
import sensorReadingsReducer from "../store/sensorReadingsSlice";

vi.mock("../services/api", () => ({
  postSensorReading: vi.fn(),
}));

describe("sensorReadings component test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderComponent() {
    const store = configureStore({
      reducer: { sensorReadings: sensorReadingsReducer },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/sensors/sensor-UUID"]}>
          <Routes>
            <Route path="/sensors/:id" element={<SensorReadings />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    return store;
  }

  it("submits a sensor reading successfully", async () => {
    const user = userEvent.setup();
    const sensorReading = {
      sensorId: "sensor-UUID",
      value: 27.4,
      timestamp: "2024-07-15T12:00",
    };
    vi.mocked(postSensorReading).mockResolvedValue(sensorReading);
    renderComponent();

    await user.type(
      screen.getByRole("spinbutton", { name: "Value" }),
      sensorReading.value.toString(),
    );
    const timestampInput = screen.getByLabelText(/Timestamp/);
    await user.clear(timestampInput);
    await user.type(timestampInput, sensorReading.timestamp);
    await user.click(screen.getByRole("button", { name: "Submit reading" }));

    await waitFor(() => {
      expect(postSensorReading).toHaveBeenCalledWith(sensorReading);
    });

    expect(
      screen.queryByText("Failed to submit sensor reading."),
    ).not.toBeInTheDocument();
  });

  it("shows an error when submitting a sensor reading fails", async () => {
    const user = userEvent.setup();
    vi.mocked(postSensorReading).mockRejectedValue(new Error("Request failed"));
    renderComponent();

    await user.type(screen.getByRole("spinbutton", { name: "Value" }), "27.4");
    await user.click(screen.getByRole("button", { name: "Submit reading" }));

    expect(
      await screen.findByText("Failed to submit sensor reading."),
    ).toBeInTheDocument();
  });
});
