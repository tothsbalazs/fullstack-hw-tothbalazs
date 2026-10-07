import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getAlerts, type Alert } from "../services/api";
import type { RootState } from "./store";

type AlertsState = {
  alerts: Alert[];
};

const initialState: AlertsState = {
  alerts: [],
};

export const getSortedAlerts = createSelector(
  [(state: RootState) => state.alerts.alerts],
  (alerts) =>
    [...alerts].sort(
      (first, second) =>
        new Date(second.timestamp).getTime() -
        new Date(first.timestamp).getTime(),
    ),
);

export const fetchAlerts = createAsyncThunk("alerts/fetch", async () =>
  getAlerts(),
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
