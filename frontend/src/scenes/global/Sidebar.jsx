import React from 'react';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';
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
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [selected, setSelected] = React.useState("Dashboard");
  
  // Use the auth context to get the current user's access level
  const { accessLevel } = useAuth();
  const isAdmin = accessLevel === "Admin";
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
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100]
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Menu
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="5px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="120px"
                  height="140px"
                  src={`../../assets/omlogo.png`}
                  style={{ cursor: "pointer", borderRadius: "0%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Operator मित्र
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]} mt="15px">
                  PPAP Automotive Ltd
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          {!isCollapsed && (
          <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
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
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
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
              to="/"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
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
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
