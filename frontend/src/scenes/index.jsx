import { Box, Button, IconButton, Typography, useTheme, useMediaQuery, MenuItem, Select, FormControl, InputLabel, TextField  } from "@mui/material";
import { tokens } from "../../theme";
import { useEffect, useState, setdata } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/header";
import BarChart from "../../components/barchart";
import StatBox from "../../components/StatBox";
import PartNameData from "../../components/partName";
import ModelData from "../../components/model";
import LineSpeedData from "../../components/lineSpeed";
import FactorData from "../../components/factor";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import Process_params from "../../components/process_params";
import Line_Speed_Trend from "../../components/line_speed_trend";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [data, setdata] = useState([]);
  const [dateRange, setDateRange] = useState([dayjs().startOf('month'), dayjs()]);
  const [shift, setShift] = useState('A');
  const [area, setArea] = useState('Line 8');
  const navigate = useNavigate();


  useEffect(() => {
    fetch('http://163.125.101.206:5000/api/common')
      .then(response => response.json())
      .then(data => {
        console.log('Original Data:', data);
        // Transform the data
        const transformedData = Object.keys(data).map(key => {
          return { name: key, ...data[key] };
        });
        console.log('Transformed Data:', transformedData);
        setdata(transformedData);
      })
      .catch(error => console.error('Error fetching card data:', error));
  }, []);

  const [data2, setdata2] = useState([]);

  useEffect(() => {
    fetch('http://163.125.101.206:5000/test')
      .then(response => response.json())
      .then(data => {
        console.log('Original Data:', data);
        // Transform the data
        const transformedData = Object.keys(data).map(key => {
          return { name: key, ...data[key] };
        });
        console.log('Transformed Data:', transformedData);
        setdata2(transformedData);
      })
      .catch(error => console.error('Error fetching card data:', error));
  }, []);

  const handleShiftChange = (event) => {
    setShift(event.target.value);
    console.log()
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handleExtruderClick = (extNumber) => {
    navigate(`/ext${extNumber}`);
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={isSmallScreen ? "column" : "row"}>
        <Header title="DASHBOARD" subtitle="Live Process Quality Parameters Dashboard" />

        <Box display="flex" justifyContent="center" alignItems="center" mr={isSmallScreen ? "0%" : "-3%"}>
                <img
                  alt="ppap logo"
                  width={isSmallScreen ? "80%" : "50%"}
                  height="auto"
                  src={`../../assets/ppaplogo.png`}
                  style={{ borderRadius: "0%" }}
                />
        </Box>
      </Box>

      <Box mb="25px" display="flex" justifyContent="left" alignItems="center" gap="10px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ width: 250, padding:1 }}>
            <DateRangePicker
              startText="Start"
              endText="End"
              value={dateRange}
              style={{height:"10px"}}
              onChange={(newValue) => setDateRange(newValue)}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <TextField {...endProps} />
                </>
              )}
            />
          </Box>
        </LocalizationProvider>

        {/* SHIFT DROPDOWN */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel sx={{ ml: 2.5 }}>Shift</InputLabel>
          <Select
            value={shift}
            onChange={handleShiftChange}
            label="shift"
            sx={{ height: "52px", ml:"20px", mr:"20px", border:"none"}}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
        </FormControl>

        {/* AREA DROPDOWN */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Area</InputLabel>
          <Select
            value={area}
            onChange={handleAreaChange}
            label="Area"
            sx={{ height: "52px" }}
          >
            <MenuItem value="Line 1">Line 1</MenuItem>
            <MenuItem value="Line 2">Line 2</MenuItem>
            <MenuItem value="Line 3">Line 3</MenuItem>
            <MenuItem value="Line 4">Line 4</MenuItem>
            <MenuItem value="Line 5">Line 5</MenuItem>
            <MenuItem value="Line 6">Line 6</MenuItem>
            <MenuItem value="Line 8">Line 8</MenuItem>
          </Select>
        </FormControl>

        <Box display="flex" justifyContent="center" alignItems="center" gap="20px" ml="36%">
          <Button
            variant="contained"
            onClick={() => navigate('/ext1')}
            sx={{
              backgroundColor:colors.whitebg[200],
              color: colors.grey[100],
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', // Shadow effect
              '&:hover': {
                backgroundColor: colors.grey[600], // Lighter shade on hover
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.35)', // Larger shadow on hover
            },
            }}
          >
            Extruder 1
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/ext2')}
            sx={{
              backgroundColor:colors.whitebg[200],
              color: colors.grey[100],
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', // Shadow effect
              '&:hover': {
                backgroundColor: colors.grey[600], // Lighter shade on hover
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.35)', // Larger shadow on hover
            },
            }}
          >
            Extruder 2
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/ext3')}
            sx={{
              backgroundColor:colors.whitebg[200],
              color: colors.grey[100],
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', // Shadow effect
              '&:hover': {
                backgroundColor: colors.grey[600], // Lighter shade on hover
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.35)', // Larger shadow on hover
            },
            }}
          >
            Extruder 3
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/ext4')}
            sx={{
              backgroundColor:colors.whitebg[200],
              color: colors.grey[100],
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', // Shadow effect
              '&:hover': {
                backgroundColor: colors.grey[600], // Lighter shade on hover
                boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.35)', // Larger shadow on hover
            },
            }}
          >
            Extruder 4
          </Button>
        </Box>
      </Box>

    

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={isSmallScreen ? "repeat(3, 1fr)" : isMediumScreen ? "repeat(9, 1fr)" : "repeat(12, 1fr)"}
        gridAutoRows={isSmallScreen ? "80px" : "140px"}
        gap="10px"
      >

{/* <Box m="20px">

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => handleExtruderClick(1)} // Navigate to /ext1
          style={{ cursor: 'pointer' }}
        >
          <Typography variant="h6" fontWeight="600">Extruder 1</Typography>
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => handleExtruderClick(2)} // Navigate to /ext2
          style={{ cursor: 'pointer' }}
        >
          <Typography variant="h6" fontWeight="600">Extruder 2</Typography>
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => handleExtruderClick(3)} // Navigate to /ext3
          style={{ cursor: 'pointer' }}
        >
          <Typography variant="h6" fontWeight="600">Extruder 3</Typography>
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => handleExtruderClick(4)} // Navigate to /ext4
          style={{ cursor: 'pointer' }}
        >
          <Typography variant="h6" fontWeight="600">Extruder 4</Typography>
        </Box>
      </Box> */}


        {/* ROW 1 */}
        <Box
          gridColumn={isSmallScreen ? "span 3" : "span 3"}
          gridRow={isSmallScreen ? "span 1" : "span 1"}
          backgroundColor={colors.whitebg[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow= '0px 4px 10px rgba(0, 0, 0, 0.25)'
          borderRadius="10px"
          height={"100%"}
        >
          <StatBox
            title="Part Name"
            subtitle={<PartNameData/>}
          />
        </Box>
        <Box
          gridColumn={isSmallScreen ? "span 8" : "span 3"}
          gridRow={isSmallScreen ? "span 1" : "span 1"}
          backgroundColor={colors.whitebg[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow= '0px 4px 10px rgba(0, 0, 0, 0.25)'
          borderRadius="10px"
          height={"100%"}
        >
          <StatBox
            title="Model"
            subtitle={<ModelData/>}
          />
        </Box>
        <Box
          gridColumn={isSmallScreen ? "span 8" : "span 3"}
          gridRow={isSmallScreen ? "span 1" : "span 1"}
          backgroundColor={colors.whitebg[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow= '0px 4px 10px rgba(0, 0, 0, 0.25)'
          borderRadius="10px"
          height={"100%"}
        >
          <StatBox
            title="Line Speed"
            subtitle={<LineSpeedData/>}
          />
        </Box>
        <Box
          gridColumn={isSmallScreen ? "span 8" : "span 3"}
          gridRow={isSmallScreen ? "span 1" : "span 1"}
          backgroundColor={colors.whitebg[200]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow= '0px 4px 10px rgba(0, 0, 0, 0.25)'
          borderRadius="10px"
          height={"100%"}
        >
          <StatBox
            title="Factor"
            subtitle={<FactorData/>}
          />
        </Box>




        {/* ROW 2 */}
        <Box
          gridColumn={isSmallScreen ? "span 8" : "span 12"}
          gridRow={isSmallScreen ? "span 3" : "span 2"}
          backgroundColor={colors.whitebg[200]}
          boxShadow= '0px 4px 10px rgba(0, 0, 0, 0.25)'
          borderRadius="10px"
        >
          <Box
            mt="25px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color='{colors.grey[100]}'
                ml='20px'
              >
                Main Die Parameters
              </Typography>
            </Box>
          </Box>
          <Box height="70%" m="20px 0 0 0" width="100%">
            <BarChart dateRange={dateRange} shift={shift} area={area}/>
          </Box>
        </Box>
        <Box
          gridColumn={isSmallScreen ? "span 8" : "span 12"}
          gridRow={isSmallScreen ? "span 3" : "span 2"}
          backgroundColor={colors.whitebg[200]}
          boxShadow= '0px 4px 10px rgba(0, 0, 0, 0.25)'
          borderRadius="10px"
        >
          <Box
            mt="10px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                ml='20px'
              >
                Puller Parameters
              </Typography>
            </Box>
          </Box>
          <Box height="70%" m=" 20px 0 0 0" width="100%">
            <Process_params dateRange={dateRange} shift={shift} area={area}/>
          </Box>
        </Box>
        <Box
          gridColumn={isSmallScreen ? "span 8" : "span 12"}
          gridRow={isSmallScreen ? "span 3" : "span 2"}
          backgroundColor={colors.whitebg[200]}
          boxShadow= '0px 4px 10px rgba(0, 0, 0, 0.25)'
          borderRadius="10px"
        >
          <Box
            mt="10px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
                ml='20px'
              >
                Line Speed Trend
              </Typography>
            </Box>
          </Box>
          <Box height="70%" m=" 20px 0 0 0" width="100%">
            <Line_Speed_Trend dateRange={dateRange} shift={shift} area={area}/>
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`3px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Extruder
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Main Motor Set
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            Main Motor Actual
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Load
            </Typography>
          </Box>
          {data.map((item, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`0px solid ${colors.primary[500]}`}
              p="10px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {`Extruder ${i + 1}`}
                </Typography>
              </Box>
              <Box>
                <Typography color={colors.grey[100]} paddingRight="50px">
                {item.Main_Motor_Set}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{item.Main_Motor_Actual}</Box>
              <Box
                p="5px 20px"
                borderRadius="4px"
              >
                {item.Load}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>
            Extruder 1
          </Typography>
          <Box height="90%" mt="-20px">
            <Extruder1 isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Extruder 2
          </Typography>
          <Box height="90%" mt="-20px">
            <Extruder2 isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`3px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
            Zones
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            BZ1
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            BZ2
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            BZ3
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            BZ4
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            DZ1
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            DZ2
            </Typography>
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
            DZ3
            </Typography>
          </Box>
          {data2.map((item, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`0px solid ${colors.primary[500]}`}
              p="10px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {`Ext ${i + 1}`}
                </Typography>
              </Box>
              <Box>
                <Typography color={colors.grey[100]}>
                {item.BZ1_NC}
                </Typography>
              </Box>
              <Box>
                <Typography color={colors.grey[100]} >
                {item.BZ2_NC}
                </Typography>
              </Box>
              <Box>
                <Typography color={colors.grey[100]} >
                {item.BZ3_NC}
                </Typography>
              </Box>
              <Box>
                <Typography color={colors.grey[100]} >
                {item.BZ4_NC}
                </Typography>
              </Box>
              <Box>
                <Typography color={colors.grey[100]}>
                {item.DZ1_NC}
                </Typography>
              </Box>
              <Box>
                <Typography color={colors.grey[100]} paddingRight="20px">
                {item.DZ2_NC}
                </Typography>
              </Box>
              {/* <Box
                p="5px 20px"
                borderRadius="4px"
              >
                {item.Load}
              </Box> 
            </Box> 
          ))}
        </Box>
        

        {/* Row 4 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Extruder 3
          </Typography>
          <Box height="90%" mt="-20px">
            <Extruder3 isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Extruder 4
          </Typography>
          <Box height="90%" mt="-20px">
            <Extruder4 isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
