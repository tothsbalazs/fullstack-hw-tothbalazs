import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sensorsReducer from "./sensorsSlice";
import sensorReadingsReducer from "./sensorReadingsSlice";
import alertsReducer from "./alertsSlice";

export const rootReducer = combineReducers({
  sensors: sensorsReducer,
  sensorReadings: sensorReadingsReducer,
  alerts: alertsReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
