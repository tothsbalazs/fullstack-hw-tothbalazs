import { Box, Typography } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

type Sensor = {
  id: string;
  name: string;
  type: string;
};

const sensors: Sensor[] = [
  {
    id: "e3242ea2-0514-46d3-aad8-b2012980c41c",
    name: "Temperature Sensor 1",
    type: "TEMPERATURE",
  },
  {
    id: "ac723c77-955f-469d-9d6a-d56bac39c202",
    name: "Humidity Sensor 1",
    type: "HUMIDITY",
  },
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
