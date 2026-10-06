import { Box, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sensors
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Please click on a sensor to check its readings!
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
