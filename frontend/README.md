# IoT Monitoring Dashboard

This is a monitoring app for listing sensors, adding sensor readings and monitoring alerts.

## Stack

- React 19
- Vite + TypeScript
- Redux Toolkit
- Material UI
- React Router
- MSW for API mocking during development

## Local setup

Requirements

- Node.js `^20.19.0 || >=22.12.0` (the project includes an `.nvmrc` for Node 24)
- npm

Install dependencies:

```sh
npm ci
```

Start the app in development mode:

```sh
npm run dev
```

## Backend assumptions

The frontend expects the following API contract from the backend:

- `GET /api/sensors`
- `GET /api/sensor-readings`
- `POST /api/sensor-readings`
- `GET /api/alerts`

The app assumes the sensor and alert payloads follow the task structure:

- `Sensor`: `id`, `name`, `type`
- `SensorReading`: `id`, `sensorId`, `value`, `timestamp`
- `Alert`: `id`, `sensorId`, `message`, `timestamp`

Note: in the current backend implemetation POST /api/sensor-readings returns a SensorReading entity which causes submitting sensor reading to signal faliure. The sensor reading is saved however. This could be fixed on the backend by returning a SensorReading DTO that fits the above assumption.

## Scaling for high-frequency sensor data

For managing high-frequency sensor data I would consider the following improvements:

- Use pagination or time-based queries for historical data
- Use WebSockets or SSEs for real-time updates
- Batch or throttle incoming updates to avoid excessive UI rendering
