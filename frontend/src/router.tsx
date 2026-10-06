import { createBrowserRouter, Navigate } from "react-router-dom";
import Alerts from "./Alerts";
import SensorReadings from "./SensorReadings";
import Sensors from "./Sensors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sensors" replace />,
  },
  {
    path: "/sensors",
    element: <Sensors />,
  },
  {
    path: "/alerts",
    element: <Alerts />,
  },
  {
    path: "/sensors/:id",
    element: <SensorReadings />,
  },
]);

export default router;
