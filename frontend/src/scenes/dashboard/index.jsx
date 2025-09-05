<<<<<<< HEAD
import { Box, Button, IconButton, Typography, useTheme, useMediaQuery, MenuItem, Select, FormControl, InputLabel, TextField  } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState, setdata } from "react";
import { useNavigate } from 'react-router-dom';
import Annual_Plan from "../../components/Annual_Plan";
=======
import {Box,Drawer,Button,IconButton,Typography,useTheme,useMediaQuery,MenuItem,Select,FormControl,InputLabel,TextField} from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Annual_Plan from "../../components/Annual_Plan";
import Header from "../../components/header";
import TotalTask from "../../components/TotalTask";
import CompleteTask from "../../components/CompleteTask";
import UpcomingTask from "../../components/UpcomingTask";
import DelayedTask from "../../components/DelayedTask";
import StatBox from "../../components/StatBox";
import MonthlyCal from "../../components/MonthlyCal";
import PieChart from "../../components/PieChart";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import PlanIDCard from "../../components/ActivePlanID";
import MouldIDCard from "../../components/ActiveMouldID";
import MouldCount from "../../components/ActiveMouldCount";
import FirstTimeStamp from "../../components/ActiveFirstTime";
import LastTimeStamp from "../../components/ActiveLastTime";
import MouldBarChart from "../../components/MouldBar";
import LastMouldName from "../../components/ActiveMouldName";
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const navigate = useNavigate();
<<<<<<< HEAD

  return (
    <Box m="20px">   

      {/* GRID & CHARTS */}
      <Box
=======
  const [exportData, setExportData] = useState(null);

  // Function to download the annual plan data
  const downloadAnnualPlan = () => {
    if (exportData) {
      // Convert data to CSV format using PapaParse
      const csvData = Papa.unparse(exportData);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `annual_plan_${new Date().toISOString().split("T")[0]}.csv`); // Download as CSV
    } else {
      console.warn("No data available to download.");
    }
  };

  return (
    <Box ml="10px" mr="10px">

<Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={isSmallScreen ? "column" : "row"}>
  {/* Header and Subtitle on the Left */}
  <Box display="flex" flexDirection="column" alignItems="flex-start">
    <Header title="DASHBOARD" subtitle="Annual Plan Dashboard" />
  </Box>

  {/* Logo and Button on the Right */}
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    alignItems="flex-end" 
    sx={{
      marginLeft: "auto", // Push the whole section to the far right
      gap: "5px",
      mb: "10px",
      mt: "10px"
    }}
    mr={isSmallScreen ? "0%" : "0%"}
  >
    <img
      alt="ppap logo"
      width={isSmallScreen ? "80%" : "50%"}
      height="auto"
      src={`../../assets/ppaplogo.png`}
      style={{ borderRadius: "0%" }}
    />
    <Button
      variant="contained"
      color="primary"
      onClick={downloadAnnualPlan}
    >
      Download Annual Plan
    </Button>
  </Box>
</Box>


      {/* GRID & CHARTS */}
      <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="100px"
          gap="10px"
          mb="10px"
        >
        <Box
          gridColumn="span 2"
          backgroundColor='#EFE8FC'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Active Plan ID"
            subtitle={<PlanIDCard/>}
          />
          </Box>
          <Box
          gridColumn="span 2"
          backgroundColor='#EFE8FC'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Active Mould ID"
            subtitle={<MouldIDCard/>}
          />
          </Box>
          <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor='white'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%"  height="100%" pl="10px" pb="10px">
            <MouldBarChart />
          </Box>
          </Box>
          <Box
          gridColumn="span 3"
          gridRow="span 3"
          backgroundColor='white'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%"  height="100%">
            <PieChart />
          </Box>
          </Box>
          <Box
          gridColumn="span 2"
          backgroundColor='#EFE8FC'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Active Mould Name"
            subtitle={<LastMouldName/>}
          />
          </Box>
          <Box
          gridColumn="span 2"
          backgroundColor='#EFE8FC'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Active Mould Count"
            subtitle={<MouldCount/>}
          />
          </Box>
          <Box
          gridColumn="span 2"
          backgroundColor='#EFE8FC'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Active Since"
            subtitle={<FirstTimeStamp/>}
          />
          </Box>
          <Box
          gridColumn="span 2"
          backgroundColor='#EFE8FC'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Last Active"
            subtitle={<LastTimeStamp/>}
          />
          </Box>
          
        {/* <Box
          gridColumn="span 1"
          backgroundColor='#3B8FF3'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Total PM"
            subtitle={<TotalTask/>}
          />
          </Box>
          <Box
          gridColumn="span 1"
          backgroundColor='#04d1af'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Completed PM"
            subtitle={<CompleteTask/>}
          />
          </Box> */}
          
          {/* <Box
          gridColumn="span 1"
          backgroundColor='#f5d142'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Upcoming PM"
            subtitle={<UpcomingTask/>}
          />
          </Box>
          <Box
          gridColumn="span 1"
          backgroundColor='#F65448'
          boxShadow= '0px 6px 12px rgba(0, 0, 0, 0.35)'
          borderRadius="10px"
          height={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Delayed PM"
            subtitle={<DelayedTask/>}
          />
          </Box> */}
        </Box>

      <Box
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
        display="grid"
        gridTemplateColumns={isSmallScreen ? "repeat(3, 1fr)" : isMediumScreen ? "repeat(9, 1fr)" : "repeat(12, 1fr)"}
        gridAutoRows={isSmallScreen ? "80px" : "140px"}
        gap="10px"
      >

<<<<<<< HEAD
        {/* ROW 1 */}
        <Box
          gridColumn={isSmallScreen ? "span 12" : "span 12"}
          gridRow={isSmallScreen ? "span 3" : "span 3"}
=======
        {/* ROW 3 */}
        <Box
          gridColumn={isSmallScreen ? "span 12" : "span 12"}
          gridRow={isSmallScreen ? "span 4" : "span 4"}
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
          backgroundColor={colors.whitebg[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
<<<<<<< HEAD
          boxShadow= '0px 4px 10px rgba(0, 0, 0, 0.25)'
          borderRadius="10px"
          height={"100%"}
        >
        <Annual_Plan/>
=======
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
          borderRadius="10px"
          height={"100%"}
          overflow="hidden" 
          flexDirection="column"
        >
        <Box
          width="100%"
          bgcolor="#a2abf6" // Optional background for title
          p={2} // Padding for spacing
          textAlign="center"
          borderTopLeftRadius="10px"
          borderTopRightRadius="10px"
        >
          <Typography variant="h6" fontWeight="bold" color={colors.grey[100]}>
            Annual Plan Table
          </Typography>
        </Box>
          {/* Contain the Annual Plan within scrollable box */}
        <Box width="100%"  overflow="hidden" height="100%">
          <Annual_Plan onExportData={(data) => setExportData(data)}/>
        </Box>
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
        </Box>
      </Box>
    </Box>
  );
};

<<<<<<< HEAD
=======

>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
export default Dashboard;
