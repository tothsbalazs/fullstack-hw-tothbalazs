import { Box, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { Sensor } from "../services/api";
import Loading from "./Loading";
import {
  fetchSensors,
  getSensorsError,
  getSensorsLoading,
  selectSensors,
} from "../store/sensorsSlice";
import type { AppDispatch } from "../store/store";

const columns: GridColDef<Sensor>[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "type", headerName: "Type", flex: 1 },
];

function Sensors() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const sensors = useSelector(selectSensors);
  const loading = useSelector(getSensorsLoading);
  const error = useSelector(getSensorsError);

  useEffect(() => {
    dispatch(fetchSensors());
  }, [dispatch]);

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load sensors.</Typography>
      </Box>
    );
  }

  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sensors
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Please click on a sensor to add a new reading to it!
      </Typography>
      <DataGrid
        rows={sensors}
        columns={columns}
        autoHeight
        hideFooter
        disableRowSelectionOnClick
        onRowClick={({ row }) => navigate(`/sensors/${row.id}`)}
        sx={{ "& .MuiDataGrid-row": { cursor: "pointer" } }}
      />
    </Box>
  );
}

export default Sensors;
