import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSensors, type Sensor } from "../services/api";

type SensorsState = {
  sensors: Sensor[];
};

const initialState: SensorsState = {
  sensors: [],
};

export const fetchSensors = createAsyncThunk(
  "sensors/fetch",
  async () => getSensors(),
);

const sensorsSlice = createSlice({
  name: "sensors",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSensors.fulfilled, (state, action) => {
      state.sensors = action.payload;
    });
  },
});

export default sensorsSlice.reducer;
