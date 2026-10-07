import { Box, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSensors, type Sensor } from "../services/api";

const columns: GridColDef<Sensor>[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "type", headerName: "Type", flex: 1 },
];

function Sensors() {
  const navigate = useNavigate();
  const [sensors, setSensors] = useState<Sensor[]>([]);

  useEffect(() => {
    void getSensors().then(setSensors);
  }, []);

  return (
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
