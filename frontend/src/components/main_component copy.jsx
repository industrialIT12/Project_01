import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, Modal, TextField, TableCell, Typography, FormControl, FormGroup, FormControlLabel, Checkbox, Grid } from '@mui/material';
import Annual_Plan from './Annual_Plan';
import StatBox from './StatBox';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import Project_card from './availability';
import Inj_Count from './Inj_part_count';
import Pie_chart from './pie_chart';
import GanttChart from './Multi_series';
import Business_PieChart from './business_piechart';
import BusinessBarChart from './businessBar';
import OpenConcern_Line from './openconcern_line';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Details2 = () => {
  const [projectname, setprojectname] = useState('');
  const [customername, setcustomername] = useState('');
  const [customercategory, setcustomercategory] = useState('');
  const [nosofproject, setnosofproject] = useState('');
  const [sopdate, setsopdate] = useState('');
  const [apqpphase, setapqpphase] = useState('');
  const [epdmparts, setepdmparts] = useState(0);
  const [extparts, setextparts] = useState(0);
  const [zone, setzone] = useState('');
  const [plant, setplant] = useState('');
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [injparts, setinjparts] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [error, setError] = useState(null);
  const [plans, setPlans] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [proj_mgmt_team, setProjectManagementTeam] = useState([]);
  const [bussiness_dev_team, setbussiness_dev_team] = useState([]);
  const [proj_eng_team, setprojengTeam] = useState([]);
  const [SupplyChainManagementTeam, setSupplyChainManagementTeam] = useState([]);
  const [tool_develop_team, setToolDevelopTeam] = useState([]);
  const [lab, setlab] = useState('');
  const [spm_dev, setspm_dev] = useState('');
  const [plmc, setPlmc] = useState('');
  const [mfg, setmfg] = useState('');
  const [partname, setpartname] = useState('');
  const [partno, setpartno] = useState('');
  const [annual_vol, setannual_vol] = useState('');
  const [firstpart_subbmission, setfirstpart_subbmission] = useState('');
  const [productdsgn_resp, setproductdsgn_resp] = useState('');
  const [tooling_resp, settooling_resp] = useState('');
  const [mfg_location, setmfg_location] = useState('');
  const [dev, setdev] = useState('');

  // List of options
  const options2 = ['C.P. Saxena', 'Ashish Dubey', 'Kuldeep Kumar'];

  // Generic handler
  const handleCheckboxChange2 = (event) => {
    const { value, checked } = event.target;
    setPlmc((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const options_dev = ['Trived Kumar', 'Narendra Gupta','Sohan Singh Rawat','Anurag Bhardwaj','Raj devaker Singh'];

  // Generic handler
  const handleCheckboxChange_dev = (event) => {
    const { value, checked } = event.target;
    setdev((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };


  useEffect(() => {
    fetch('http://163.125.102.142:6500/api/project_data')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPlans(data);
        const aggregatedData = data.reduce((acc, project) => {
          const { customer_name } = project;
          if (!acc[customer_name]) {
            acc[customer_name] = { projectCount: 0 };
          }
          acc[customer_name].projectCount += 1;
          return acc;
        }, {});

        setCustomerDetails(Object.entries(aggregatedData).map(([name, details]) => ({
          customerName: name,
          projectCount: details.projectCount,
        })));
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit2 = async () => {
    try {
      const projectData = {
        project_name: projectname,
        start_date: startdate,
        end_date: enddate,
        customer_name: customername,
        customercategory: customercategory,
        nosofproject: nosofproject,
        sopdate: sopdate,
        apqpphase: apqpphase,
        injparts: injparts,
        extparts: extparts,
        zone: zone,
        plant: plant,
        epdmparts: epdmparts,
        proj_eng_team: proj_eng_team,
        supplychain_mgmt: SupplyChainManagementTeam,
        bussiness_dev_team: bussiness_dev_team,
        proj_mgmt_team: proj_mgmt_team,
        tool_develop_team: tool_develop_team,
        lab: lab,
        spm_dev: spm_dev,
        plmc: plmc,
        mfg: mfg,
        partname: partname,
        partno: partno,
        annual_vol: annual_vol,
        firstpart_subbmission: firstpart_subbmission,
        productdsgn_resp: productdsgn_resp,
        tooling_resp: tooling_resp,
        mfg_location: mfg_location, 
      };

      const response = await fetch('http://163.125.102.142:6500/api/add_project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        handleClose2();
        console.log("Plan updated successfully");
      } else {
        console.log("Failed to update plan");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const sendmail = async () => {
    try {
      const response = await fetch('http://163.125.102.142:6500/api/sendmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("Mail sent successfully");
      } else {
        console.log("Failed to send mail");
      }
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

  const data = {
    labels: customerDetails.map(customer => customer.customerName),
    datasets: [
      {
        label: 'Total Projects',
        data: customerDetails.map(customer => customer.projectCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)',
          'rgba(103, 242, 209, 1)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Customer Wise Projects',
        font: {
          size: 20,  
          weight: 'bold',
          color:"black"
        }
      }
    }  
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      if (event.target.closest('fieldset').querySelector('legend').textContent === 'Project Management Team') {
        setProjectManagementTeam([...proj_mgmt_team, value]);
      } else {
        setbussiness_dev_team([...bussiness_dev_team, value]);
      }
    } else {
      if (event.target.closest('fieldset').querySelector('legend').textContent === 'Project Management Team') {
        setProjectManagementTeam(proj_mgmt_team.filter((teamMember) => teamMember !== value));
      } else {
        setbussiness_dev_team(bussiness_dev_team.filter((teamMember) => teamMember !== value));
      }
    }
  };

  return (
    <div>
     <TableCell 
  style={{
    fontWeight: 'bold', 
    fontSize: '35px', 
    padding:"0px",
    marginTop:"-20px",
    backgroundColor: 'White', 
    display: 'flex', 
    justifyContent: 'center',
    border:"none"
  }} 
  align="center"
>
<Box display="flex" justifyContent="flex-start" alignItems="center">
  <img
    alt="ppap logo"
    src={`../../assets/ppaplogo.png`}
    style={{ borderRadius: "0%", width: "100px", height: "auto" }}
  />
</Box>


  PROJECT MANAGEMENT DASHBOARD
</TableCell>

<Box ml="20px" display='flex' justifyContent="flex-end" gap={2} mb={2}>
        {/* <Button variant="contained" color="secondary" onClick={sendmail}>Send Mail</Button> */}
        <Button variant="contained" color="secondary" onClick={handleOpen2}>Add New Project</Button>
      </Box>
      
      <Box
  display="grid"
  gridTemplateColumns="repeat(12, 1fr)" 
  gridAutoRows="100px"
  gap={2} // Gap between items
  padding={2} // Padding around the container
>
  {/* <Box
    gridColumn="span 6" // Occupy 6 columns for Extrusion Projects
    gridRow="span 1"
    backgroundColor="white"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
    borderRadius="10px"
    padding={2}
  >
    <StatBox
      title={<span style={{ fontSize: '20px' }}>Extrusion Projects</span>}
      subtitle={<Project_card />}
    />
  </Box> */}

  {/* <Box
    gridColumn="span 6" // Occupy 6 columns for Injection Projects
    gridRow="span 1"
    backgroundColor="white"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
    borderRadius="10px"
    padding={2}
  >
    <StatBox
      title={<span style={{ fontSize: '20px', marginTop: "20px" }}>Injection Projects</span>}
      subtitle={<Inj_Count />}
    />
  </Box> */}
</Box>



    <Box
  display="grid"
  gridTemplateColumns="repeat(12, 1fr)" 
  gridAutoRows="100px"
  gap={2} // Gap between items
  padding={2} // Padding around the container
>
<Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gridColumn="span 3" // Adjust to span 4 columns for the Pie Chart
    gridRow="span 4"
    backgroundColor="white"
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
    marginRight="10px"
    borderRadius="30px"
    padding={2}
  >
    <Typography variant="h6" sx={{fontWeight:"bold", fontSize:"20px"}} gutterBottom>
      Business Pie Chart
    </Typography>
    <Business_PieChart />
  </Box>
  {/* <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gridColumn="span 3" // Adjust to span 4 columns for the Pie Chart
    gridRow="span 4"
    backgroundColor="white"
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
    marginRight="10px"
    borderRadius="30px"
    padding={2}
  >
    <Typography variant="h6" sx={{fontWeight:"bold", fontSize:"20px"}} gutterBottom>
      Projects Pie Chart
    </Typography>
    <Pie_chart />
  </Box> */}
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gridColumn="span 6" // Adjust to span 4 columns for the Pie Chart
    gridRow="span 4"
    backgroundColor="white"
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
    marginRight="10px"
    borderRadius="30px"
    padding={2}
  >
    <Typography variant="h6" sx={{fontWeight:"bold", fontSize:"20px"}} gutterBottom>
      Business - Segment Wise Pie Chart
    </Typography>
    <BusinessBarChart />
  </Box>
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    mt={1} 
    boxShadow={5} 
    borderRadius={10} 
    gridColumn="span 3" 
    gridRow="span 4"
    backgroundColor="white"
  >
    <Bar 
      data={data} 
      options={{
        ...options,
        responsive: true,
        maintainAspectRatio: false,
      }} 
    />
  </Box>
  {/* <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    gridColumn="span 6" // Adjust to span 4 columns for the Pie Chart
    gridRow="span 4"
    backgroundColor="white"
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
    marginRight="10px"
    borderRadius="30px"
    padding={2}
  >
    <GanttChart />
  </Box> */}
  
</Box>




      
<Box 
  display="flex"
  justifyContent="left"
  width="99%" 
  border={1} 
  borderColor="white" 
  mt={2}
>
  <Annual_Plan plans={plans} />
</Box>



      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: 'background.paper',
          border: '0px solid #000',
          boxShadow: 24,
          height: '80%',
          p: 4,
          borderRadius: '10px',
          overflowY: 'auto',
          overflowX: 'auto',
        }}>
          <Typography id="modal-title" fontSize="20px" fontWeight="bold" variant="h6" component="h2">Add New Project</Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="body1" sx={{ mt: 2, mb: 0 }}>Start Date</Typography>
            <DesktopDatePicker
              value={startdate}
              onChange={(newValue) => setstartdate(newValue)}
              renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="body1" sx={{ mt: 2, mb: 0 }}>End Date</Typography>
            <DesktopDatePicker
              value={enddate}
              onChange={(newValue) => setenddate(newValue)}
              renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
            />
          </LocalizationProvider>

          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>Project Name</Typography>
          <TextField fullWidth value={projectname} onChange={(e) => setprojectname(e.target.value)} sx={{ mt: 2 }} />

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Customer Name</Typography>
          <Select
            fullWidth
            value={customername}
            onChange={(e) => setcustomername(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="MSIL">MSIL</MenuItem>
            <MenuItem value="HCIL">HCIL</MenuItem>
            <MenuItem value="EXICOM">EXICOM</MenuItem>
            <MenuItem value="SMIPL">SMIPL</MenuItem>
            <MenuItem value="TATA">TATA</MenuItem>
            <MenuItem value="Avinya Customer1">Avinya Customer1</MenuItem>
            <MenuItem value="Avinya Customer2">Avinya Customer2</MenuItem>
            <MenuItem value="Elpis Customer1">Elpis Customer1</MenuItem>
            <MenuItem value="Elpis Customer2">Elpis Customer2</MenuItem>
          </Select>

          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>Customer Category</Typography>
          <Select
            fullWidth
            value={customercategory}
            onChange={(e) => setcustomercategory(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="OEM">OEM</MenuItem>
            <MenuItem value="Avinya">Avinya</MenuItem>
            <MenuItem value="Elpis">Elpis</MenuItem>
          </Select>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>No. of Projects</Typography>
          <TextField
            type="number"
            fullWidth
            value={nosofproject}
            onChange={(e) => setnosofproject(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>SOP Date</Typography>
          <TextField
            fullWidth
            type="date"
            value={sopdate}
            onChange={(e) => setsopdate(e.target.value)}
            sx={{ mt: 2 }}
          />


          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>APQP Phase</Typography>
          <TextField
            type="number"
            fullWidth
            value={apqpphase}
            onChange={(e) => setapqpphase(e.target.value)}
            sx={{ mt: 2 }}
          />

        
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Plastic Injection</Typography>
          <TextField
            type="number"
            fullWidth
            value={injparts}
            onChange={(e) => setinjparts(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Plastic Extrusion</Typography>
          <TextField
            type="number"
            fullWidth
            value={extparts}
            onChange={(e) => setextparts(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Rubber Extrusion(EPDM)</Typography>
          <TextField
            type="number"
            fullWidth
            value={epdmparts}
            onChange={(e) => setepdmparts(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Plant</Typography>
          <Select
            fullWidth
            value={plant}
            onChange={(e) => setplant(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="PP02">PP02</MenuItem>
            <MenuItem value="PP03">PP03</MenuItem>
            <MenuItem value="PP04">PP04</MenuItem>
            <MenuItem value="PP05">PP05</MenuItem>
            <MenuItem value="PP06">PP06</MenuItem>
          </Select>
          
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Zone</Typography>
          <Select
            fullWidth
            value={zone}
            onChange={(e) => setzone(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="North">North</MenuItem>
            <MenuItem value="North-West">North-West</MenuItem>
            <MenuItem value="WEST-I">WEST-I</MenuItem>
            <MenuItem value="WEST-II">WEST-II</MenuItem>
            <MenuItem value="SOUTH-I">SOUTH-I</MenuItem>
            <MenuItem value="SOUTH-II">SOUTH-II</MenuItem>
          </Select>
      

          <Grid container spacing={2}>
  {/* Combine all teams in one row */}
  
  {/* Project Management Team */}
  <Grid item xs={3}>
  <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>Project Management Team</Typography>
  <FormControl component="fieldset" sx={{ mt: 2 }}>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            value="Priyadarsi Nayak"
            checked={proj_mgmt_team.includes('Priyadarsi Nayak')}
            onChange={(e) => {
              if (e.target.checked) {
                setProjectManagementTeam([...proj_mgmt_team, 'Priyadarsi Nayak']);
              } else {
                setProjectManagementTeam(proj_mgmt_team.filter((item) => item !== 'Priyadarsi Nayak'));
              }
            }}
          />
        }
        label="Priyadarsi Nayak"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Manoj Kumar"
            checked={proj_mgmt_team.includes('Manoj Kumar')}
            onChange={(e) => {
              if (e.target.checked) {
                setProjectManagementTeam([...proj_mgmt_team, 'Manoj Kumar']);
              } else {
                setProjectManagementTeam(proj_mgmt_team.filter((item) => item !== 'Manoj Kumar'));
              }
            }}
          />
        }
        label="Manoj Kumar"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Anil Singh"
            checked={proj_mgmt_team.includes('Anil Singh')}
            onChange={(e) => {
              if (e.target.checked) {
                setProjectManagementTeam([...proj_mgmt_team, 'Anil Singh']);
              } else {
                setProjectManagementTeam(proj_mgmt_team.filter((item) => item !== 'Anil Singh'));
              }
            }}
          />
        }
        label="Anil Singh"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Deepak Jangir"
            checked={proj_mgmt_team.includes('Deepak Jangir')}
            onChange={(e) => {
              if (e.target.checked) {
                setProjectManagementTeam([...proj_mgmt_team, 'Deepak Jangir']);
              } else {
                setProjectManagementTeam(proj_mgmt_team.filter((item) => item !== 'Deepak Jangir'));
              }
            }}
          />
        }
        label="Deepak Jangir"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Aditya Sharma"
            checked={proj_mgmt_team.includes('Aditya Sharma')}
            onChange={(e) => {
              if (e.target.checked) {
                setProjectManagementTeam([...proj_mgmt_team, 'Aditya Sharma']);
              } else {
                setProjectManagementTeam(proj_mgmt_team.filter((item) => item !== 'Aditya Sharma'));
              }
            }}
          />
        }
        label="Aditya Sharma"
      />
    </FormGroup>
  </FormControl>
</Grid>

  <Grid item xs={3}>
  <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>Business Development Team</Typography>
  <FormControl component="fieldset" sx={{ mt: 2 }}>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            value="Maloy Kumar"
            checked={bussiness_dev_team.includes('Maloy Kumar')}
            onChange={(e) => {
              if (e.target.checked) {
                setbussiness_dev_team([...bussiness_dev_team, 'Maloy Kumar']);
              } else {
                setbussiness_dev_team(bussiness_dev_team.filter((item) => item !== 'Maloy Kumar'));
              }
            }}
          />
        }
        label="Maloy Kumar"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Vishal Khosla"
            checked={bussiness_dev_team.includes('Vishal Khosla')}
            onChange={(e) => {
              if (e.target.checked) {
                setbussiness_dev_team([...bussiness_dev_team, 'Vishal Khosla']);
              } else {
                setbussiness_dev_team(bussiness_dev_team.filter((item) => item !== 'Vishal Khosla'));
              }
            }}
          />
        }
        label="Vishal Khosla"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Raushan"
            checked={bussiness_dev_team.includes('Raushan')}
            onChange={(e) => {
              if (e.target.checked) {
                setbussiness_dev_team([...bussiness_dev_team, 'Raushan']);
              } else {
                setbussiness_dev_team(bussiness_dev_team.filter((item) => item !== 'Raushan'));
              }
            }}
          />
        }
        label="Raushan"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Sarita Jha"
            checked={bussiness_dev_team.includes('Sarita Jha')}
            onChange={(e) => {
              if (e.target.checked) {
                setbussiness_dev_team([...bussiness_dev_team, 'Sarita Jha']);
              } else {
                setbussiness_dev_team(bussiness_dev_team.filter((item) => item !== 'Sarita Jha'));
              }
            }}
          />
        }
        label="Sarita Jha"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Mukesh Kumar"
            checked={bussiness_dev_team.includes('Mukesh Kumar')}
            onChange={(e) => {
              if (e.target.checked) {
                setbussiness_dev_team([...bussiness_dev_team, 'Mukesh Kumar']);
              } else {
                setbussiness_dev_team(bussiness_dev_team.filter((item) => item !== 'Mukesh Kumar'));
              }
            }}
          />
        }
        label="Mukesh Kumar"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Tamilbalan"
            checked={bussiness_dev_team.includes('Tamilbalan')}
            onChange={(e) => {
              if (e.target.checked) {
                setbussiness_dev_team([...bussiness_dev_team, 'Tamilbalan']);
              } else {
                setbussiness_dev_team(bussiness_dev_team.filter((item) => item !== 'Tamilbalan'));
              }
            }}
          />
        }
        label="Tamilbalan"
      />
    </FormGroup>
  </FormControl>
</Grid>


  <Grid item xs={3}>
  <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>Production Engineering</Typography>
  <FormControl component="fieldset" sx={{ mt: 2 }}>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            value="Sanjay Kumar"
            checked={proj_eng_team.includes('Sanjay Kumar')}
            onChange={(e) => {
              if (e.target.checked) {
                setprojengTeam([...proj_eng_team, 'Sanjay Kumar']);
              } else {
                setprojengTeam(proj_eng_team.filter((item) => item !== 'Sanjay Kumar'));
              }
            }}
          />
        }
        label="Sanjay Kumar"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Sandeep Kumar"
            checked={proj_eng_team.includes('Sandeep Kumar')}
            onChange={(e) => {
              if (e.target.checked) {
                setprojengTeam([...proj_eng_team, 'Sandeep Kumar']);
              } else {
                setprojengTeam(proj_eng_team.filter((item) => item !== 'Sandeep Kumar'));
              }
            }}
          />
        }
        label="Sandeep Kumar"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Harshit"
            checked={proj_eng_team.includes('Harshit')}
            onChange={(e) => {
              if (e.target.checked) {
                setprojengTeam([...proj_eng_team, 'Harshit']);
              } else {
                setprojengTeam(proj_eng_team.filter((item) => item !== 'Harshit'));
              }
            }}
          />
        }
        label="Harshit"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="PS Chauhan"
            checked={proj_eng_team.includes('PS Chauhan')}
            onChange={(e) => {
              if (e.target.checked) {
                setprojengTeam([...proj_eng_team, 'PS Chauhan']);
              } else {
                setprojengTeam(proj_eng_team.filter((item) => item !== 'PS Chauhan'));
              }
            }}
          />
        }
        label="PS Chauhan"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Dinesh Yadav"
            checked={proj_eng_team.includes('Dinesh Yadav')}
            onChange={(e) => {
              if (e.target.checked) {
                setprojengTeam([...proj_eng_team, 'Dinesh Yadav']);
              } else {
                setprojengTeam(proj_eng_team.filter((item) => item !== 'Dinesh Yadav'));
              }
            }}
          />
        }
        label="Dinesh Yadav"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Priyadarsi Nayak"
            checked={proj_eng_team.includes('Priyadarsi Nayak')}
            onChange={(e) => {
              if (e.target.checked) {
                setprojengTeam([...proj_eng_team, 'Priyadarsi Nayak']);
              } else {
                setprojengTeam(proj_eng_team.filter((item) => item !== 'Priyadarsi Nayak'));
              }
            }}
          />
        }
        label="Priyadarsi Nayak"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="User2"
            checked={proj_eng_team.includes('User2')}
            onChange={(e) => {
              if (e.target.checked) {
                setprojengTeam([...proj_eng_team, 'User2']);
              } else {
                setprojengTeam(proj_eng_team.filter((item) => item !== 'User2'));
              }
            }}
          />
        }
        label="User2"
      />
    </FormGroup>
  </FormControl>
</Grid>


  <Grid item xs={3}>
  <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>Supply Chain Management</Typography>
  <FormControl component="fieldset" sx={{ mt: 2 }}>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            value="D.K.Shukla"
            checked={SupplyChainManagementTeam.includes('D.K.Shukla')}
            onChange={(e) => {
              if (e.target.checked) {
                setSupplyChainManagementTeam([...SupplyChainManagementTeam, 'D.K.Shukla']);
              } else {
                setSupplyChainManagementTeam(SupplyChainManagementTeam.filter((item) => item !== 'D.K.Shukla'));
              }
            }}
          />
        }
        label="D.K.Shukla"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Mohd. Muneeb"
            checked={SupplyChainManagementTeam.includes('Mohd. Muneeb')}
            onChange={(e) => {
              if (e.target.checked) {
                setSupplyChainManagementTeam([...SupplyChainManagementTeam, 'Mohd. Muneeb']);
              } else {
                setSupplyChainManagementTeam(SupplyChainManagementTeam.filter((item) => item !== 'Mohd. Muneeb'));
              }
            }}
          />
        }
        label="Mohd. Muneeb"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Abhishek Rajput"
            checked={SupplyChainManagementTeam.includes('Abhishek Rajput')}
            onChange={(e) => {
              if (e.target.checked) {
                setSupplyChainManagementTeam([...SupplyChainManagementTeam, 'Abhishek Rajput']);
              } else {
                setSupplyChainManagementTeam(SupplyChainManagementTeam.filter((item) => item !== 'Abhishek Rajput'));
              }
            }}
          />
        }
        label="Abhishek Rajput"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Mukesh Kumar"
            checked={SupplyChainManagementTeam.includes('Mukesh Kumar')}
            onChange={(e) => {
              if (e.target.checked) {
                setSupplyChainManagementTeam([...SupplyChainManagementTeam, 'Mukesh Kumar']);
              } else {
                setSupplyChainManagementTeam(SupplyChainManagementTeam.filter((item) => item !== 'Mukesh Kumar'));
              }
            }}
          />
        }
        label="Mukesh Kumar"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="User4"
            checked={SupplyChainManagementTeam.includes('User4')}
            onChange={(e) => {
              if (e.target.checked) {
                setSupplyChainManagementTeam([...SupplyChainManagementTeam, 'User4']);
              } else {
                setSupplyChainManagementTeam(SupplyChainManagementTeam.filter((item) => item !== 'User4'));
              }
            }}
          />
        }
        label="User4"
      />
    </FormGroup>
  </FormControl>
</Grid>
</Grid>

<Grid item xs={3}>
    <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>Tool Development</Typography>
    <FormControl component="fieldset" sx={{ mt: 2 }}>
      <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            value="Brij Bhushan"
            checked={tool_develop_team.includes('Brij Bhushan')}
            onChange={(e) => {
              if (e.target.checked) {
                setToolDevelopTeam([...tool_develop_team, 'Brij Bhushan']); // Add 'Brij Bhushan' if checked
              } else {
                setToolDevelopTeam(tool_develop_team.filter((item) => item !== 'Brij Bhushan')); // Remove 'Brij Bhushan' if unchecked
              }
            }}
          />
        }
        label="Brij Bhushan"
      />
        <FormControlLabel
        control={
          <Checkbox
            value="Abhishek Pandey"
            checked={tool_develop_team.includes('Abhishek Pandey')}
            onChange={(e) => {
              if (e.target.checked) {
                setToolDevelopTeam([...tool_develop_team, 'Abhishek Pandey']); // Add 'Abhishek Pandey' if checked
              } else {
                setToolDevelopTeam(tool_develop_team.filter((item) => item !== 'Abhishek Pandey')); // Remove 'Abhishek Pandey' if unchecked
              }
            }}
          />
        }
        label="Abhishek Pandey"
      />
        
      </FormGroup>
    </FormControl>
  </Grid>

  <Grid item xs={3}>
  <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>Laboratory</Typography>
  <FormControl component="fieldset" sx={{ mt: 2 }}>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            value="C.R. SAHA"
            checked={lab.includes('C.R. SAHA')}
            onChange={(e) => {
              if (e.target.checked) {
                setlab([...lab, 'C.R. SAHA']); // Add 'C.R. SAHA' if checked
              } else {
                setlab(lab.filter((item) => item !== 'C.R. SAHA')); // Remove 'C.R. SAHA' if unchecked
              }
            }}
          />
        }
        label="C.R. SAHA"
      />
      
      <FormControlLabel
        control={
          <Checkbox
            value="Bishan Singh"
            checked={lab.includes('Bishan Singh')}
            onChange={(e) => {
              if (e.target.checked) {
                setlab([...lab, 'Bishan Singh']); // Add 'Bishan Singh' if checked
              } else {
                setlab(lab.filter((item) => item !== 'Bishan Singh')); // Remove 'Bishan Singh' if unchecked
              }
            }}
          />
        }
        label="Bishan Singh"
      />
      
      <FormControlLabel
        control={
          <Checkbox
            value="Jitendra Katiyar"
            checked={lab.includes('Jitendra Katiyar')}
            onChange={(e) => {
              if (e.target.checked) {
                setlab([...lab, 'Jitendra Katiyar']); // Add 'Jitendra Katiyar' if checked
              } else {
                setlab(lab.filter((item) => item !== 'Jitendra Katiyar')); // Remove 'Jitendra Katiyar' if unchecked
              }
            }}
          />
        }
        label="Jitendra Katiyar"
      />
    </FormGroup>
  </FormControl>
</Grid>


  <Grid item xs={3}>
    <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>SPM Development</Typography>
    <FormControl component="fieldset" sx={{ mt: 2 }}>
      <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            value="TD Sabu"
            checked={spm_dev.includes('TD Sabu')}
            onChange={(e) => {
              if (e.target.checked) {
                setspm_dev([...spm_dev, 'TD Sabu']); // Add 'TD Sabu' if checked
              } else {
                setspm_dev(spm_dev.filter((item) => item !== 'TD Sabu')); // Remove 'TD Sabu' if unchecked
              }
            }}
          />
        }
        label="TD Sabu"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Rajiv Chaudhary"
            checked={spm_dev.includes('Rajiv Chaudhary')}
            onChange={(e) => {
              if (e.target.checked) {
                setspm_dev([...spm_dev, 'Rajiv Chaudhary']); // Add 'Rajiv Chaudhary' if checked
              } else {
                setspm_dev(spm_dev.filter((item) => item !== 'Rajiv Chaudhary')); // Remove 'Rajiv Chaudhary' if unchecked
              }
            }}
          />
        }
        label="Rajiv Chaudhary"
      />
      
      </FormGroup>
    </FormControl>
  </Grid>

  <Grid item xs={3}>
      <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
        PLMC
      </Typography>
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormGroup>
          {options2.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  value={option}
                  checked={plmc.includes(option)}
                  onChange={handleCheckboxChange2}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Grid>

    <Grid item xs={3}>
      <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
        Product Design
      </Typography>
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormGroup>
          {options_dev.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  value={option}
                  checked={dev.includes(option)}
                  onChange={handleCheckboxChange_dev}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Grid>

  <Grid item xs={3}>
  <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>Manufacturing</Typography>
  <FormControl component="fieldset" sx={{ mt: 2 }}>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            value="Maniknandan Manu"
            checked={mfg.includes('Maniknandan Manu')}
            onChange={(e) => {
              if (e.target.checked) {
                setmfg([...mfg, 'Maniknandan Manu']); // Add item to array
              } else {
                setmfg(mfg.filter((item) => item !== 'Maniknandan Manu')); // Remove item from array
              }
            }}
          />
        }
        label="Maniknandan Manu"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="C.P. Tiwari"
            checked={mfg.includes('C.P. Tiwari')}
            onChange={(e) => {
              if (e.target.checked) {
                setmfg([...mfg, 'C.P. Tiwari']);
              } else {
                setmfg(mfg.filter((item) => item !== 'C.P. Tiwari'));
              }
            }}
          />
        }
        label="C.P. Tiwari"
      />
      <FormControlLabel
        control={
          <Checkbox
            value="Devendra Taneja"
            checked={mfg.includes('Devendra Taneja')}
            onChange={(e) => {
              if (e.target.checked) {
                setmfg([...mfg, 'Devendra Taneja']);
              } else {
                setmfg(mfg.filter((item) => item !== 'Devendra Taneja'));
              }
            }}
          />
        }
        label="Devendra Taneja"
      />
       <FormControlLabel
        control={
          <Checkbox
            value="Kuldeep Kumar"
            checked={mfg.includes('Kuldeep Kumar')}
            onChange={(e) => {
              if (e.target.checked) {
                setmfg([...mfg, 'Kuldeep Kumar']);
              } else {
                setmfg(mfg.filter((item) => item !== 'Kuldeep Kumar'));
              }
            }}
          />
        }
        label="Kuldeep Kumar"
      />
    </FormGroup>
  </FormControl>
</Grid>




          <Button onClick={handleSubmit2} variant="contained" color="secondary" sx={{ mt: 4 }}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Details2;
