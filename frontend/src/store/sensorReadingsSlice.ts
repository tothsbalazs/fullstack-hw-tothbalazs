import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  postSensorReading,
  type SensorReadingSubmission,
} from "../services/api";
import { RootState } from "./store";

type SensorReadingsState = {
  lastSubmitted: SensorReadingSubmission | null;
  loading: boolean;
  error: boolean;
};

const initialState: SensorReadingsState = {
  lastSubmitted: null,
  loading: false,
  error: false,
};

export const getSensorReadingsLoading = (state: RootState) =>
  state.sensorReadings.loading;
export const getSensorReadingsError = (state: RootState) =>
  state.sensorReadings.error;

export const submitSensorReading = createAsyncThunk(
  "sensorReadings/submit",
  async (reading: SensorReadingSubmission) => {
    await postSensorReading(reading);
    return reading;
  },
);

const sensorReadingsSlice = createSlice({
  name: "sensorReadings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(submitSensorReading.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(submitSensorReading.fulfilled, (state, action) => {
      state.loading = false;
      state.lastSubmitted = action.payload;
    });
    builder.addCase(submitSensorReading.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default sensorReadingsSlice.reducer;
