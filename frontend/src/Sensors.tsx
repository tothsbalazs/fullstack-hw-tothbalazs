import { Box, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

type Sensor = {
  id: number;
  name: string;
  type: string;
};

const sensors: Sensor[] = [
  { id: 1, name: "Temperature sensor", type: "Temperature" },
  { id: 2, name: "Humidity sensor", type: "Humidity" },
  { id: 3, name: "Atmospheric pressure sensor", type: "Atmospheric pressure" },
];

const columns: GridColDef<Sensor>[] = [
  { field: "name", headerName: "Name", flex: 1 },
  { field: "type", headerName: "Type", flex: 1 },
];

function Sensors() {
  return (
    <Box component="main" sx={{ p: 3 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Sensors
      </Typography>
      <DataGrid
        rows={sensors}
        columns={columns}
        autoHeight
        hideFooter
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default Sensors;
