import { configureStore } from "@reduxjs/toolkit";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { postSensorReading } from "../services/api";
import sensorReadingsReducer, {
  submitSensorReading,
} from "../store/sensorReadingsSlice";

vi.mock("../services/api", () => ({
  postSensorReading: vi.fn(),
}));

describe("sensorReadings reducer tests", () => {
  const reading = {
    sensorId: "sensor-UUID",
    value: 27.4,
    timestamp: "2024-07-15T12:00",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("test submitSensorReading pending", () => {
    const nextState = sensorReadingsReducer(undefined, {
      type: submitSensorReading.pending.type,
    });

    expect(nextState).toEqual({
      lastSubmitted: null,
      loading: true,
      error: false,
    });
  });

  it("test submitSensorReading fulfilled", async () => {
    vi.mocked(postSensorReading).mockResolvedValue(reading);

    const store = configureStore({
      reducer: { sensorReadings: sensorReadingsReducer },
    });

    await store.dispatch(submitSensorReading(reading));

    expect(postSensorReading).toHaveBeenCalledWith(reading);
    expect(store.getState().sensorReadings).toEqual({
      lastSubmitted: reading,
      loading: false,
      error: false,
    });
  });

  it("test submitSensorReading rejected", () => {
    const nextState = sensorReadingsReducer(undefined, {
      type: submitSensorReading.rejected.type,
      error: { message: "Request failed" },
    });

    expect(nextState).toEqual({
      lastSubmitted: null,
      loading: false,
      error: true,
    });
  });
});
