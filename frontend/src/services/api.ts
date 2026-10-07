export type SensorReadingSubmission = {
  sensorId: string;
  value: number;
  timestamp: string;
};

export type Sensor = {
  id: string;
  name: string;
  type: "TEMPERATURE" | "HUMIDITY" | "ATMOSPHERIC_PRESSURE";
};

export type SensorReading = {
  id: number;
  sensorId: string;
  value: number;
  timestamp: string;
};

export type Alert = {
  id: number;
  sensorId: string;
  message: string;
  timestamp: string;
};

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export function getSensors() {
  return request<Sensor[]>("/api/sensors");
}

export function getSensorReadings() {
  return request<SensorReading[]>("/api/sensor-readings");
}

export function getAlerts() {
  return request<Alert[]>("/api/alerts");
}

export function postSensorReading(reading: SensorReadingSubmission) {
  return request<SensorReadingSubmission>("/api/sensor-readings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reading),
  });
}
