import { configureStore } from "@reduxjs/toolkit";
import sensorsReducer from "./sensorsSlice";
import sensorReadingsReducer from "./sensorReadingsSlice";
import alertsReducer from "./alertsSlice";

export const store = configureStore({
  reducer: {
    sensors: sensorsReducer,
    sensorReadings: sensorReadingsReducer,
    alerts: alertsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
