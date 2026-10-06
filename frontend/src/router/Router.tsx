import { createBrowserRouter, Navigate } from "react-router-dom";
import Alerts from "../components/Alerts";
import SensorReadings from "../components/SensorReadings";
import Sensors from "../components/Sensors";

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
