import { http, HttpResponse } from "msw";
import { alerts, sensorReadings, sensors } from "./data";

export const handlers = [
  http.get("/api/sensors", () => HttpResponse.json(sensors)),
  http.get("/api/sensor-readings", () => HttpResponse.json(sensorReadings)),
  http.get("/api/alerts", () => HttpResponse.json(alerts)),
];
