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
    localStorage.removeItem("isAuthenticated"); 
    localStorage.removeItem("accessLevel"); 

    navigate("/login");
  };

  return (
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
      <Box display="flex"  borderRadius="3px">
      </Box>

      {/* Icons */}
      <Box display="flex">

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
