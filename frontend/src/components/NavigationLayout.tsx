import { Box, Button } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

function NavigationLayout() {
  return (
    <>
      <Box
        component="nav"
        aria-label="Navigation bar"
        sx={{ display: "flex", gap: 1, bgcolor: "grey.200", px: 3, py: 1 }}
      >
        <Button component={NavLink} to="/sensors">
          Sensors
        </Button>
        <Button component={NavLink} to="/alerts">
          Alerts
        </Button>
      </Box>
      <Outlet />
    </>
  );
}

export default NavigationLayout;
