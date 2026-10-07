import { afterEach, describe, expect, it, vi } from "vitest";
import { postSensorReading } from "../services/api";

describe("sensorReadings api tests", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts a sensor reading and returns the response", async () => {
    const sensorReading = {
      sensorId: "sensor-UUID",
      value: 27.4,
      timestamp: "2024-07-15T12:00",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(sensorReading), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(postSensorReading(sensorReading)).resolves.toEqual(
      sensorReading,
    );
    expect(fetch).toHaveBeenCalledWith("/api/sensor-readings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sensorReading),
    });
  });
});
