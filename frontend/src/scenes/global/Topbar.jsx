import { Box, useTheme, IconButton } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
<<<<<<< HEAD
    localStorage.removeItem("isAuthenticated"); 
    localStorage.removeItem("accessLevel"); 
=======
    // Clear any authentication tokens or user data
    localStorage.removeItem("authToken"); // Example: Remove auth token from local storage
    // Add any other necessary cleanup here

    // Redirect to the login page
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
    navigate("/login");
  };

  return (
<<<<<<< HEAD
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{
        backgroundColor: '#EBEFFA',
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2900, // Ensure it's on top of other elements
        padding: "0px 20px", // Add padding for spacing
      }}
    >
=======
    <Box display="flex" justifyContent="space-between">
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
      <Box display="flex"  borderRadius="3px">
      </Box>

      {/* Icons */}
<<<<<<< HEAD
      <Box display="flex">
=======
      <Box display="flex" mr="15px">
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <PowerSettingsNewIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
