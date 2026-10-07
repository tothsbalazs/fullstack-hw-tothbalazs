import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getAlerts, type Alert } from "../services/api";
import type { RootState } from "./store";

type AlertsState = {
  alerts: Alert[];
  loading: boolean;
  error: boolean;
};

const initialState: AlertsState = {
  alerts: [],
  loading: false,
  error: false,
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

export const getAlertsLoading = (state: RootState) => state.alerts.loading;
export const getAlertsError = (state: RootState) => state.alerts.error;

export const fetchAlerts = createAsyncThunk("alerts/fetch", async () =>
  getAlerts(),
);

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAlerts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchAlerts.fulfilled, (state, action) => {
      state.loading = false;
      state.alerts = action.payload;
    });
    builder.addCase(fetchAlerts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default alertsSlice.reducer;
