import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import Header from "../../components/header";
import SPQuantBar from "../../components/spQuantBar";
import SPQuantPie from "../../components/spQuantPie";
import StatBox from "../../components/StatBox";
import SPTotalTask from "../../components/spTotalSpare";
import SPInvCost from "../../components/spInvCost";
import SPReorders from "../../components/spReorders";
import SPLowStock from "../../components/spLowStock";
import SPObsolete from "../../components/spObsolete";

const Spare_Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box ml="10px" mr="10px">
      {/* Header Section */}
      <Box 
  display="flex" 
  justifyContent={isSmallScreen ? "center" : "space-between"} 
  alignItems="center" 
  flexDirection={isSmallScreen ? "column" : "row"}
>
  <Header title="Spare Parts Management" />

  {/* Logo and Download Button */}
  <Box 
    display="flex" 
    flexDirection="column" 
    alignItems="flex-end" 
    sx={{
      marginLeft: "auto",
      gap: "10px",
      mb: "10px",
      mt: "10px"
    }}
  >
    {/* Logo */}
    <img
      alt="ppap logo"
      width={isSmallScreen ? "80px" : "100px"}
      height="auto"
      src={`../../assets/ppaplogo.png`}
      style={{
        borderRadius: "0%",
      }}
    />
  </Box>
</Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="10px"
        mb="10px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor="#3B8FF3"
          boxShadow="0px 6px 12px rgba(0, 0, 0, 0.35)"
          borderRadius="10px"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox title="Total Spares" subtitle={<SPTotalTask />} />
        </Box>
        {/* <Box
          gridColumn="span 2"
          backgroundColor="#04d1af"
          boxShadow="0px 6px 12px rgba(0, 0, 0, 0.35)"
          borderRadius="10px"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox title="Total Inventory Cost" subtitle={<SPInvCost />} />
        </Box> */}
        <Box
          gridColumn="span 3"
          backgroundColor="#50C878"
          boxShadow="0px 6px 12px rgba(0, 0, 0, 0.35)"
          borderRadius="10px"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox title="Active Spares" subtitle={<SPLowStock />} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="#f78d97"
          boxShadow="0px 6px 12px rgba(0, 0, 0, 0.35)"
          borderRadius="10px"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox title="Obsolete Spares" subtitle={<SPObsolete />} />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor="#f5d142"
          boxShadow="0px 6px 12px rgba(0, 0, 0, 0.35)"
          borderRadius="10px"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox title="Reordered Spares" subtitle={<SPReorders />} />
        </Box>
        </Box>
        <Box
        display="grid"
        gridTemplateColumns="repeat(10, 1fr)"
        gridAutoRows="140px"
        gap="10px"
        mb="10px"
      >

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.whitebg[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
          borderRadius="10px"
          height="100%"
        >
          <Box width="100%" height="100%">
            <SPQuantBar />
          </Box>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 3"
          backgroundColor={colors.whitebg[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
          borderRadius="10px"
          height="100%"
          overflow="auto"
        >
          <Box width="100%" overflow="auto" height="100%">
            <SPQuantPie />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Spare_Dashboard;
