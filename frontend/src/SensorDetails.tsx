import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function SensorDetails() {
  const { id } = useParams();
  const sensorId = Number(id);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sensor details
      </Typography>
      {Number.isInteger(sensorId) && sensorId > 0 && (
        <Typography>Sensor ID: {sensorId}</Typography>
      )}
    </Box>
  );
}

export default SensorDetails;
