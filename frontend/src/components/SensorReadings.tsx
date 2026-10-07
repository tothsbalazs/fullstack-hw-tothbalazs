import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch } from "../store/store";
import {
  submitSensorReading,
  getSensorReadingsLoading,
  getSensorReadingsError,
} from "../store/sensorReadingsSlice";

function getCurrentLocalDateTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

function SensorReadings() {
  const { id } = useParams();
  const sensorId = id ?? "";

  const error = useSelector(getSensorReadingsError);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sensor readings
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Sensor ID: {sensorId}
      </Typography>
      <SensorReadingForm key={sensorId} sensorId={sensorId} />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Failed to submit sensor reading.
        </Typography>
      )}
    </Box>
  );
}

type SensorReadingFormProps = {
  sensorId: string;
};

function SensorReadingForm({ sensorId }: SensorReadingFormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [value, setValue] = useState("");
  const [timestamp, setTimestamp] = useState(getCurrentLocalDateTime);

  const loading = useSelector(getSensorReadingsLoading);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      submitSensorReading({ sensorId, value: Number(value), timestamp }),
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 480 }}>
      <Stack spacing={2}>
        <TextField
          label="Value"
          type="number"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Timestamp"
          type="datetime-local"
          value={timestamp}
          onChange={(event) => setTimestamp(event.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? (
            <CircularProgress
              size={24}
              color="inherit"
              aria-label="Submitting reading"
            />
          ) : (
            "Submit reading"
          )}
        </Button>
      </Stack>
    </Box>
  );
}

export default SensorReadings;
