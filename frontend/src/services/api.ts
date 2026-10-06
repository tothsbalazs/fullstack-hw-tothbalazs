export type SensorReadingSubmission = {
  sensorId: string;
  value: number;
  timestamp: string;
};

export function postSensorReading(reading: SensorReadingSubmission) {
  return fetch("/api/sensor-readings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reading),
  });
}
