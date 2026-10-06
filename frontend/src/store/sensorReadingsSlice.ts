import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  postSensorReading,
  type SensorReadingSubmission,
} from "../services/api";

type SensorReadingsState = {
  lastSubmitted: SensorReadingSubmission | null;
};

const initialState: SensorReadingsState = {
  lastSubmitted: null,
};

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
    builder.addCase(submitSensorReading.fulfilled, (state, action) => {
      state.lastSubmitted = action.payload;
    });
  },
});

export default sensorReadingsSlice.reducer;
