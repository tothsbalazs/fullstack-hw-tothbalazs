import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSensors, type Sensor } from "../services/api";
import type { RootState } from "./store";

type SensorsState = {
  sensors: Sensor[];
  loading: boolean;
  error: boolean;
};

const initialState: SensorsState = {
  sensors: [],
  loading: false,
  error: false,
};

export const selectSensors = (state: RootState) => state.sensors.sensors;
export const getSensorsLoading = (state: RootState) => state.sensors.loading;
export const getSensorsError = (state: RootState) => state.sensors.error;

export const fetchSensors = createAsyncThunk("sensors/fetch", async () =>
  getSensors(),
);

const sensorsSlice = createSlice({
  name: "sensors",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSensors.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchSensors.fulfilled, (state, action) => {
      state.loading = false;
      state.sensors = action.payload;
    });
    builder.addCase(fetchSensors.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default sensorsSlice.reducer;
