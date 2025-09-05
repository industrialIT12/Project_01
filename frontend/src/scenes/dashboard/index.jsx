import { Box, Button, IconButton, Typography, useTheme, useMediaQuery, MenuItem, Select, FormControl, InputLabel, TextField  } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState, setdata } from "react";
import { useNavigate } from 'react-router-dom';
import Annual_Plan from "../../components/Annual_Plan";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const navigate = useNavigate();

  return (
    <Box m="20px">   

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={isSmallScreen ? "repeat(3, 1fr)" : isMediumScreen ? "repeat(9, 1fr)" : "repeat(12, 1fr)"}
        gridAutoRows={isSmallScreen ? "80px" : "140px"}
        gap="10px"
      >

        {/* ROW 1 */}
        <Box
          gridColumn={isSmallScreen ? "span 12" : "span 12"}
          gridRow={isSmallScreen ? "span 3" : "span 3"}
          backgroundColor={colors.whitebg[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow= '0px 4px 10px rgba(0, 0, 0, 0.25)'
          borderRadius="10px"
          height={"100%"}
        >
        <Annual_Plan/>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
