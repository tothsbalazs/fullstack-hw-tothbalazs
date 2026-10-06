import { configureStore } from "@reduxjs/toolkit";
import sensorReadingsReducer from "./sensorReadingsSlice";

export const store = configureStore({
  reducer: {
    sensorReadings: sensorReadingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
