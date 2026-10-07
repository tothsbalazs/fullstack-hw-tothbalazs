import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAlerts, type Alert } from "../services/api";

type AlertsState = {
  alerts: Alert[];
};

const initialState: AlertsState = {
  alerts: [],
};

export const fetchAlerts = createAsyncThunk(
  "alerts/fetch",
  async () => getAlerts(),
);

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAlerts.fulfilled, (state, action) => {
      state.alerts = action.payload;
    });
  },
});

export default alertsSlice.reducer;
