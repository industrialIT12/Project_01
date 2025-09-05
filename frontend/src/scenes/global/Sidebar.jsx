import React from 'react';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
<<<<<<< HEAD
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
=======
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
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
<<<<<<< HEAD
  const [isCollapsed, setIsCollapsed] = React.useState(true);
=======
  const [isCollapsed, setIsCollapsed] = React.useState(false);
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
  const [selected, setSelected] = React.useState("Dashboard");
  
  // Use the auth context to get the current user's access level
  const { accessLevel } = useAuth();
  const isAdmin = accessLevel === "Admin";
<<<<<<< HEAD

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

=======
  console.log("the Admin is : ", isAdmin)

  return (
    <Box
      sx={{
        height: '100vh', 
        "& .pro-sidebar-inner": {
          background: `${colors.blueAccent[900]} !important`
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important"
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important"
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important"
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important"
        }
      }}
    >
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
<<<<<<< HEAD
            icon={<img src="./assets/sidebar.png" alt="icon" style={{ width: isCollapsed ? '40px' : '25px', height: 'auto' }} />}
            style={{
              margin: "10px 0 20px 0",
              color: 'white',
=======
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100]
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
<<<<<<< HEAD
                <Typography variant="h3" color='#EBEFFA'>
                  Taskbar
                </Typography>
                
=======
                <Typography variant="h3" color={colors.grey[100]}>
                  Menu
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="5px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
<<<<<<< HEAD
                  width="220px"
                  height="200px"
                  src={`../../assets/oblogo.png`}
=======
                  width="120px"
                  height="140px"
                  src={`../../assets/omlogo.png`}
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
                  style={{ cursor: "pointer", borderRadius: "0%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
<<<<<<< HEAD
                  color='#d6c529'
                  fontWeight="bold"
                  fontSize="30px"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Project Management
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]} mt="10px">
=======
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Operator मित्र
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]} mt="15px">
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
                  PPAP Automotive Ltd
                </Typography>
              </Box>
            </Box>
          )}

<<<<<<< HEAD
          <Box 
            paddingLeft={isCollapsed ? undefined : "10%"}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: !isCollapsed ? "20px" : "50px"
            }}
          >
          {/* <Typography
=======
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          {!isCollapsed && (
          <Typography
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
<<<<<<< HEAD
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
=======
              Mould Maintenance
            </Typography>
          )}
            <Item
              title="Annual Plan"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Mould Master"
              to="/mouldmaster"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Mould Master History"
              to="/mouldmasterhistory"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="PM Done Report"
              to="/pmupdate"
              icon={<SummarizeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Mold Health & History"
              to="/moldhistory"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed && (
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
<<<<<<< HEAD
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
=======
            >
              Spare Management
            </Typography>
            )}
            <Item
              title="Dashboard"
              to="/sparedash"
              icon={<SpaceDashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Spare Part List"
              to="/spreport"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Spare Part Report"
              to="/spupdatehistory"
              icon={<AssessmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Breakdown History"
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
              to="/"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
<<<<<<< HEAD
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
=======
            />
            
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              PM
            </Typography>
            <Item
              title="PM Questions"
              to="/pmques"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Questions"
              to="/addques"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
