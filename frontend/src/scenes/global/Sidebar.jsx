import React from 'react';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useAuth } from '../../context/AuthProvider';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [selected, setSelected] = React.useState("Dashboard");
  
  // Use the auth context to get the current user's access level
  const { accessLevel } = useAuth();
  const isAdmin = accessLevel === "Admin";

  return (
    <Box
  sx={{
    height: '100%',
    position: 'fixed',
    zIndex: 3000,
    transition: "all 0.3s ease",
    "& .pro-sidebar-inner": {
      background: `#283953 !important`
    },
    "& .pro-icon-wrapper": {
      backgroundColor: "transparent !important"
    },
    "& .pro-inner-item": {
      padding: "5px 35px 5px 20px !important",
      color: '#EBEFFA',
    },
    "& .pro-inner-item:hover": {
      color: "#617180 !important"
    },
    "& .pro-menu-item.active": {
      color: "#6870fa !important"
    }
  }}
  onMouseEnter={() => setIsCollapsed(false)}
  onMouseLeave={() => setIsCollapsed(true)}
>

      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={<img src="./assets/sidebar.png" alt="icon" style={{ width: isCollapsed ? '40px' : '25px', height: 'auto' }} />}
            style={{
              margin: "10px 0 20px 0",
              color: 'white',
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color='#EBEFFA'>
                  Taskbar
                </Typography>
                
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="5px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="220px"
                  height="200px"
                  src={`../../assets/oblogo.png`}
                  style={{ cursor: "pointer", borderRadius: "0%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color='#d6c529'
                  fontWeight="bold"
                  fontSize="30px"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Project Management
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]} mt="10px">
                  PPAP Automotive Ltd
                </Typography>
              </Box>
            </Box>
          )}

          <Box 
            paddingLeft={isCollapsed ? undefined : "10%"}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: !isCollapsed ? "20px" : "50px"
            }}
          >
          {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Dashboards
            </Typography>
            <Item
              title="Projects"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="OEE Dashboard"
              to="/db2"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {isAdmin && (
            <Item
              title="Dashboard"
              to="/"
              icon={<img src="./assets/dash.png" alt="icon" style={{ width: isCollapsed ? '40px' : '25px', height: 'auto' }} />}
              selected={selected}
              setSelected={setSelected}
              sx={{ mb: isCollapsed ? '10px': '4px' , mt: '200px'}}

            />
            )}
              {/* Planning
            </Typography>
            <Item
              title="Milestone"
              to="/test2"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            > */}
            <Item
              title="MOM"
              to="/mom"
              icon={<img src="./assets/meeting.png" alt="icon" style={{ width: isCollapsed ? '40px' : '25px', height: 'auto' }} />}
              selected={selected}
              setSelected={setSelected}
              sx={{ mb: isCollapsed ? '10px': '4px' , mt: '200px'}}
            />
            {/* <Item
              title="Main Dashboard"
              to="/"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
             <Item
              title="Event"
              to="/Event"
              icon={<img src="./assets/event.png" alt="icon" style={{ width: isCollapsed ? '40px' : '25px', height: 'auto' }} />}
              selected={selected}
              setSelected={setSelected}
              sx={{ mb: isCollapsed ? '10px': '4px' , mt: '200px'}}
            />

              <Item
              title="Project Team"
              to="/Digitaltwin"
              icon={<img src="./assets/digital-twin.png" alt="icon" style={{ width: isCollapsed ? '40px' : '25px', height: 'auto' }} />}
              selected={selected}
              setSelected={setSelected}
              sx={{ mb: isCollapsed ? '10px': '4px' , mt: '200px'}}
            /> 
            <Item
              title="Digital Twin"
              to="/Digitaltwin1"
              icon={<img src="./assets/digital-twin.png" alt="icon" style={{ width: isCollapsed ? '40px' : '25px', height: 'auto' }} />}
              selected={selected}
              setSelected={setSelected}
              sx={{ mb: isCollapsed ? '10px': '4px' , mt: '200px'}}
            /> 
            <Item
              title="Meeting Booking"
              to="/Booking"
              icon={<img src="./assets/calendar.png" alt="icon" style={{ width: isCollapsed ? '40px' : '25px', height: 'auto' }} />}
              selected={selected}
              setSelected={setSelected}
              sx={{ mb: isCollapsed ? '10px': '4px' , mt: '200px'}}
            /> 
            <Item
              title="Master"
              to="/master"
              icon={<img src="./assets/calendar.png" alt="icon" style={{ width: isCollapsed ? '40px' : '25px', height: 'auto' }} />}
              selected={selected}
              setSelected={setSelected}
              sx={{ mb: isCollapsed ? '10px': '4px' , mt: '200px'}}
            /> 
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
