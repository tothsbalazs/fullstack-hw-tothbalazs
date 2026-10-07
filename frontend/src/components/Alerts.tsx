import { Box, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Alert } from "../services/api";
import Loading from "./Loading";
import {
  fetchAlerts,
  getAlertsError,
  getAlertsLoading,
  getSortedAlerts,
} from "../store/alertsSlice";
import type { AppDispatch } from "../store/store";

const columns: GridColDef<Alert>[] = [
  { field: "message", headerName: "Message", flex: 2 },
  { field: "sensorId", headerName: "Sensor ID", flex: 1 },
  { field: "timestamp", headerName: "Timestamp", flex: 1 },
];

function Alerts() {
  const dispatch = useDispatch<AppDispatch>();

  const alerts = useSelector(getSortedAlerts);
  const loading = useSelector(getAlertsLoading);
  const error = useSelector(getAlertsError);

  useEffect(() => {
    dispatch(fetchAlerts());

    const intervalId = window.setInterval(() => {
      dispatch(fetchAlerts());
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [dispatch]);

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load alerts.</Typography>
      </Box>
    );
  }

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Alerts
      </Typography>
      {alerts.length === 0 ? (
        <Typography>No alerts found.</Typography>
      ) : (
        <DataGrid rows={alerts} columns={columns} autoHeight hideFooter />
      )}
    </Box>
  );
}

export default Alerts;
