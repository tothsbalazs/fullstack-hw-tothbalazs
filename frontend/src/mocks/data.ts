import type { Alert, Sensor, SensorReading } from "../services/api";

export const sensors: Sensor[] = [
  {
    id: "e3242ea2-0514-46d3-aad8-b2012980c41c",
    name: "Temperature Sensor 1",
    type: "TEMPERATURE",
  },
  {
    id: "ac723c77-955f-469d-9d6a-d56bac39c202",
    name: "Humidity Sensor 1",
    type: "HUMIDITY",
  },
  {
    id: "d96195c1-8a9f-4e33-b0bf-80a6fd387aa1",
    name: "Pressure Sensor 1",
    type: "ATMOSPHERIC_PRESSURE",
  },
];

const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60_000).toISOString();

export const sensorReadings: SensorReading[] = [
  {
    id: 1,
    sensorId: sensors[0].id,
    value: 22.4,
    timestamp: minutesAgo(12),
  },
  {
    id: 2,
    sensorId: sensors[0].id,
    value: 31.8,
    timestamp: minutesAgo(4),
  },
  {
    id: 3,
    sensorId: sensors[1].id,
    value: 46,
    timestamp: minutesAgo(8),
  },
  {
    id: 4,
    sensorId: sensors[2].id,
    value: 1013.2,
    timestamp: minutesAgo(2),
  },
];

export const alerts: Alert[] = [
  {
    id: 1,
    sensorId: sensors[0].id,
    message: "Temperature reading exceeded the configured upper limit.",
    timestamp: minutesAgo(4),
  },
  {
    id: 2,
    sensorId: sensors[1].id,
    message: "Humidity reading is below the configured lower limit.",
    timestamp: minutesAgo(36),
  },
];
