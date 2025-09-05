import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, Modal, TextField, TableCell, Typography, FormControl, FormGroup, FormControlLabel, Checkbox, Grid } from '@mui/material';
import CustomerPhaseTable from './phase_table';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import Business_PieChart from './business_piechart';
import BusinessBarChart from './businessBar';
import CustomerProjectChart from './customerwise_project';
import { useAuth } from '../context/AuthProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Details = () => {
  const { accessLevel, logout } = useAuth();
  const isAdmin = accessLevel ==="Admin";
  const [projectname, setprojectname] = useState('');
  const [customername, setcustomername] = useState('');
  const [customercategory, setcustomercategory] = useState([]);
  const [nosofproject, setnosofproject] = useState('');
  const [sopdate, setsopdate] = useState('');
  const [apqpphase, setapqpphase] = useState('');
  const [epdmparts, setepdmparts] = useState(0);
  const [extparts, setextparts] = useState(0);
  const [zone, setzone] = useState([]);
  const [plant, setplant] = useState([]);
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [injparts, setinjparts] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [error, setError] = useState(null);
  const [plans, setPlans] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [mfg, setMfg] = useState([]);
    const [manufacturingUsers, setManufacturingUsers] = useState([]);
  const [plmc, setplmc] = useState([]);
    const [plmcUsers, setplmcUsers] = useState([]);
    const [scm, setscm] = useState([]);
    const [scmUsers, setscmUsers] = useState([]);
    const [pm, setpm] = useState([]);
    const [pmUsers, setpmUsers] = useState([]);
    const [cust_name, setcust_name] = useState([]);
    const [pe, setpe] = useState([]);
    const [peUsers, setpeUsers] = useState([]);
    const [bd, setbd] = useState([]);
    const [bdUsers, setbdUsers] = useState([]);
    const [td, settd] = useState([]);
    const [tdUsers, settdUsers] = useState([]);
    const [spm, setspm] = useState([]);
    const [spmUsers, setspmUsers] = useState([]);
    const [lab, setlab] = useState([]);
    const [labUsers, setlabUsers] = useState([]);
    const [userData, setUserData] = useState([]);
    const [selectedCustName, setSelectedCustName] = useState("");
    const [customerCategoryOptions, setCustomerCategoryOptions] = useState([]);
    const [zoneOptions, setzoneOptions] = useState([]);
    const [plantOptions, setplantOptions] = useState([]);

  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const handlePieChartClick = (businessName) => {
    setSelectedBusiness(businessName);
  };
  

  

  const fetchData = () => {
    fetch("http://163.125.102.142:6500/api/get_user")
      .then((response) => response.json())
      .then((data) => {
        // console.log("userdata", data);
        setUserData(data); // Ensure it's an array
        const filteredUsers = data.filter((user) => user.department === "Manufacturing");
        setManufacturingUsers(filteredUsers);
        const filteredUsers2 = data.filter((user) => user.department === "PLMC");
        setplmcUsers(filteredUsers2);
        const filteredUsers3 = data.filter((user) => user.department === "Supply Chain Management");
        setscmUsers(filteredUsers3);
        const filteredUsers4 = data.filter((user) => user.department === "Project Management");
        setpmUsers(filteredUsers4);
        const filteredUsers5 = data.filter((user) => user.department === "Production Engineering");
        setpeUsers(filteredUsers5);
        const filteredUsers6 = data.filter((user) => user.department === "SPM Development");
        setspmUsers(filteredUsers6);
        const filteredUsers7 = data.filter((user) => user.department === "Business Development");
        setbdUsers(filteredUsers7);
        const filteredUsers8 = data.filter((user) => user.department === "Tool Development");
        settdUsers(filteredUsers8);

        const filteredUsers9 = data.filter((user) => user.department === "Laboratory");
        setlabUsers(filteredUsers9);

      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchData2 = () => {
  fetch("http://163.125.102.142:6500/api/get_master")
    .then((response) => response.json())
    .then((data) => {
      console.log("userdata", data);
      setUserData(data);

      // Extract unique customer names
      const uniqueCustomers = [...new Set(data.map((user) => user.customer_name))];
      setcust_name(uniqueCustomers); 

      const uniqueCustomers2 = [...new Set(data.map((user) => user.customer_category))];
      setCustomerCategoryOptions(uniqueCustomers2);
      const uniqueCustomers3 = [...new Set(data.map((user) => user.zone))];
      setzoneOptions(uniqueCustomers3);
      const uniqueCustomers4 = [...new Set(data.map((user) => user.plant))];
      setplantOptions(uniqueCustomers4);
    })
    .catch((error) => console.error("Error fetching data:", error));
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
        pe: pe,
        bd: bd,
        scm: scm,
        td: td,
        plmc: plmc,
        spm: spm,
        pm: pm,
        mfg: mfg,
        lab: lab, 
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
        alert("Project Added Successfully!");
      } else {
        console.log("Failed to update plan");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };


  const handleOpen2 = () => {
    fetchData();
    fetchData2(); // Fetch data when modal opens
    setOpen2(true);
  };
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

  

  return (
    <Box>
    <Box m="20px 0 0 80px">
    <Box
      sx={{
        backgroundColor: '#ebeffa',
        minHeight: "100vh",
        padding: "10px",
        backgroundImage: `url('../../assets/background-image.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      >
     <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h2" fontWeight="bold">
            Project Management Dashboard
          </Typography>

          <Box display="flex" justifyContent="center" alignItems="center" mt="50px" mr="0%">
                 <img src="/assets/logo.jpg" alt="Logo 2" style={{ position: "absolute", top: 20, right: 20, width: "100px", zIndex: 1000, }} />
        </Box>
        </Box>

        <Box  display='flex' justifyContent="flex-end" gap={2} mb={2} mt={2}>
          <Button variant="contained" color="secondary" onClick={handleOpen2}>Add New Project</Button>
        </Box>
      
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)" 
      gridAutoRows="100px"
      gap={2}
      width="100%" 
      // border={1}
      mb={2}
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
      borderRadius="30px"
      padding={2}
    >
      <Typography variant="h6" sx={{fontWeight:"bold", fontSize:"20px"}} >
        Business Pie Chart
      </Typography>
      <Business_PieChart admin={isAdmin} 
    segmentAccess={accessLevel === "OEM" ? "OEM" : "All"} onSelectBusiness={handlePieChartClick}/>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gridColumn="span 4"
      gridRow="span 4"
      backgroundColor="white"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
      borderRadius="30px"
      padding="20px"
      width="100%"
      height="100%"
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "20px" }} gutterBottom>
        Business - Segment Wise Bar Chart
      </Typography>

      {/* Inner Box to ensure full width & height */}
      <Box width="95%" height="400px" display="flex" justifyContent="center" alignItems="center">
        <BusinessBarChart selectedBusiness={selectedBusiness} />
      </Box>
      </Box>

    
    <Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  gridColumn="span 5" // Adjusted for Pie Chart layout
  gridRow="span 4"
  backgroundColor="white"
  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
  borderRadius="30px"
  padding="20px"
  width="100%"
  height="100%"
>
  { <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "20px" }} gutterBottom>
    {"Customer-Wise Projects"}
  </Typography>
   }
  {/* Wrapper to ensure full width & height usage */}
  <Box width="100%" height="100%" display="flex" justifyContent="center">
    <CustomerProjectChart selectedBusiness={selectedBusiness} />
  </Box>
</Box>

    {/* <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
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
    </Box> */}
    </Box>   
    <Box 
      display="flex"
      justifyContent="left"
      width="100%" 
      borderColor="white" 
    >
      <CustomerPhaseTable plans={plans} selectedBusiness={selectedBusiness} />
    </Box>
  </Box>
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
          width: 1000,
          bgcolor: 'background.paper',
          border: '0px solid #000',
          boxShadow: 24,
          height: '80%',
          p: 0,
          overflowY: 'auto',
          overflowX: 'auto',
        }}>
          <Box sx={{ backgroundColor: "#2e8bdb",color:"white", padding: 0, borderRadius:0}}>
            <Typography
              id="modal-title"
              fontSize="30px"
              
              variant="h6"
              component="h2"
              align="center"
            >
              Add New Project
            </Typography>
          </Box>

        
          <Box sx={{
                    
                    p:2
                  }}>
          <Grid container spacing={2}>
          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="body1" sx={{ mt: 2, mb: 0 ,fontWeight:'bold'}}>Start Date</Typography>
            <DesktopDatePicker
              value={startdate}
              onChange={(newValue) => setstartdate(newValue)}
              renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
            />
          </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="body1" sx={{ mt: 2, mb: 0 ,fontWeight:'bold'}}>End Date</Typography>
            <DesktopDatePicker
              value={enddate}
              onChange={(newValue) => setenddate(newValue)}
              renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
            />
          </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb: -2 ,fontWeight:'bold'}}>Project Name</Typography>
          <TextField fullWidth value={projectname} onChange={(e) => setprojectname(e.target.value)} sx={{ mt: 2 }} />
          </Grid>

          {/* <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb:-2,fontWeight:'bold' }}>Customer Name</Typography>
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
            <MenuItem value="SMG">SMG</MenuItem>
            <MenuItem value="Avinya Customer1">Avinya Customer1</MenuItem>
            <MenuItem value="Avinya Customer2">Avinya Customer2</MenuItem>
            <MenuItem value="Elpis Customer1">Elpis </MenuItem>
          </Select>
          </Grid> */}

          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: 'bold' }}>
            Customer Name
          </Typography>

          <Select
          fullWidth
            value={customername}
            onChange={(e) => setcustomername(e.target.value)}
            sx={{ mt: 2 }}
            displayEmpty
          >
            {cust_name.length > 0 ? (
              cust_name.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>No customer found</MenuItem>
            )}
          </Select>
        </Grid>

          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb: -2,fontWeight:'bold' }}>Customer Category</Typography>
          <Select
            fullWidth
            value={customercategory}
            onChange={(e) => setcustomercategory(e.target.value)}
            sx={{ mt: 2 }}
          >
            {customerCategoryOptions.length > 0 ? (
              customerCategoryOptions.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>No customer found</MenuItem>
            )}
          </Select>
        </Grid>

          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb:-2,fontWeight:'bold' }}>No. of Projects</Typography>
          <TextField
            type="number"
            fullWidth
            value={nosofproject}
            onChange={(e) => setnosofproject(e.target.value)}
            sx={{ mt: 2 }}
          />
          </Grid>

          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 ,fontWeight:'bold'}}>SOP Date</Typography>
          <TextField
            fullWidth
            type="date"
            value={sopdate}
            onChange={(e) => setsopdate(e.target.value)}
            sx={{ mt: 2 }}
          />
          </Grid>

          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 ,fontWeight:'bold'}}>APQP Phase</Typography>
          <TextField
            type="number"
            fullWidth
            value={apqpphase}
            onChange={(e) => setapqpphase(e.target.value)}
            sx={{ mt: 2 }}
          />
          </Grid>

          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb:-2,fontWeight:'bold' }}>Plastic Injection</Typography>
          <TextField
            type="number"
            fullWidth
            value={injparts}
            onChange={(e) => setinjparts(e.target.value)}
            sx={{ mt: 2 }}
          />
          </Grid>

          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 ,fontWeight:'bold'}}>Plastic Extrusion</Typography>
          <TextField
            type="number"
            fullWidth
            value={extparts}
            onChange={(e) => setextparts(e.target.value)}
            sx={{ mt: 2 }}
          />
          </Grid>

          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb:-2,fontWeight:'bold' }}>Rubber Extrusion(EPDM)</Typography>
          <TextField
            type="number"
            fullWidth
            value={epdmparts}
            onChange={(e) => setepdmparts(e.target.value)}
            sx={{ mt: 2 }}
          />
          </Grid>

          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 ,fontWeight:'bold'}}>Plant</Typography>
          <Select
            fullWidth
            value={plant}
            onChange={(e) => setplant(e.target.value)}
            sx={{ mt: 2 }}
          >
            {plantOptions.length > 0 ? (
              plantOptions.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>No customer found</MenuItem>
            )}
          </Select>
        </Grid>
          
          <Grid item xs={6}>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 ,fontWeight:'bold'}}>Zone</Typography>
          <Select
            fullWidth
            value={zone}
            onChange={(e) => setzone(e.target.value)}
            sx={{ mt: 2 }}
          >
            {zoneOptions.length > 0 ? (
              zoneOptions.map((name, index) => (
                <MenuItem key={index} value={name}>
                  {name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>No customer found</MenuItem>
            )}
          </Select>
        </Grid>
          

          <Grid item xs={6}>
          <Typography variant="body1"  sx={{ mt: 2, mb: -2,fontWeight:'bold' }}>Manufacturing Team</Typography>
                    
                    <Select multiple fullWidth value={mfg} onChange={handleChange(setMfg)} sx={{ mt: 2 }} renderValue={(selected) => selected.join(", ")}>
                    {manufacturingUsers.length > 0 ? (
                      manufacturingUsers.map((user) => (
                        <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>No personnel found</MenuItem>
                    )}
                  </Select>
                  </Grid>
                    
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={{ mt: 2, mb: 1,fontWeight:'bold' }}>PLMC Team</Typography>
                    <Select
                      multiple fullWidth
                      value={plmc }
                      onChange={handleChange(setplmc)} sx={{ mt: 2 }} renderValue={(selected) => selected.join(", ")}>
                      {plmcUsers.length > 0 ? (
                        plmcUsers.map((user) => (
                          <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>No manufacturing personnel found</MenuItem>
                      )}
                    </Select>
                    </Grid>

                    <Grid item xs={6}>
                    <Typography variant="body1" sx={{ mt: 2, mb: 1,fontWeight:'bold' }}>SCM Team</Typography>
                    <Select
                      multiple fullWidth
                      value={scm }
                      onChange={handleChange(setscm)} sx={{ mt: 2 }} renderValue={(selected) => selected.join(", ")}>
                      {scmUsers.length > 0 ? (
                        scmUsers.map((user) => (
                          <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>No manufacturing personnel found</MenuItem>
                      )}
                    </Select>
                    </Grid>
                      
                    <Grid item xs={6}>
                    <Typography variant="body1" sx={{ mt: 2, mb: 1,fontWeight:'bold' }}>Project Management Team</Typography>
                    <Select
                      multiple fullWidth
                      value={pm }
                      onChange={handleChange(setpm)} sx={{ mt: 2 }} renderValue={(selected) => selected.join(", ")}>
                      {pmUsers.length > 0 ? (
                        pmUsers.map((user) => (
                          <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>No manufacturing personnel found</MenuItem>
                      )}
                    </Select>
                    </Grid>

                    <Grid item xs={6}>
                    <Typography variant="body1" sx={{ mt: 2, mb: 1,fontWeight:'bold' }}>SPM Development Team</Typography>
                    <Select
                      multiple fullWidth
                      value={spm}
                      onChange={handleChange(setspm)} sx={{ mt: 2 }} renderValue={(selected) => selected.join(", ")}>
                      {spmUsers.length > 0 ? (
                        spmUsers.map((user) => (
                          <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>No manufacturing personnel found</MenuItem>
                      )}
                    </Select>
                    </Grid>

                    <Grid item xs={6}>
                    <Typography variant="body1" sx={{ mt: 2, mb: 1,fontWeight:'bold' }}>Tool Development Team</Typography>
                    <Select
                      multiple fullWidth
                      value={td}
                      onChange={handleChange(settd)} sx={{ mt: 2 }} renderValue={(selected) => selected.join(", ")}>
                      {tdUsers.length > 0 ? (
                        tdUsers.map((user) => (
                          <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>No manufacturing personnel found</MenuItem>
                      )}
                    </Select>
                    </Grid>

                    <Grid item xs={6}>
                    <Typography variant="body1" sx={{ mt: 2, mb: 1,fontWeight:'bold' }}>Business Development Team</Typography>
                    <Select
                      multiple fullWidth
                      value={bd}
                      onChange={handleChange(setbd)} sx={{ mt: 2 }} renderValue={(selected) => selected.join(", ")}>
                      {bdUsers.length > 0 ? (
                        bdUsers.map((user) => (
                          <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>No manufacturing personnel found</MenuItem>
                      )}
                    </Select>
                    </Grid>

                    <Grid item xs={6}>
                    <Typography variant="body1" sx={{ mt: 2, mb: 1,fontWeight:'bold' }}>Project Engineering Team</Typography>
                    <Select
                      multiple fullWidth
                      value={pe}
                      onChange={handleChange(setpe)} sx={{ mt: 2 }} renderValue={(selected) => selected.join(", ")}>
                      {peUsers.length > 0 ? (
                        peUsers.map((user) => (
                          <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>No manufacturing personnel found</MenuItem>
                      )}
                    </Select>
                    </Grid>
                      
                    <Grid item xs={6}>
                    <Typography variant="body1" sx={{ mt: 2, mb: 1,fontWeight:'bold' }}>Laboratory</Typography>
                    <Select
                      multiple fullWidth
                      value={lab}
                      onChange={handleChange(setlab)} sx={{ mt: 2 }} renderValue={(selected) => selected.join(", ")}>
                      {labUsers.length > 0 ? (
                        labUsers.map((user) => (
                          <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
                        ))
                      ) : (
                        <MenuItem value="" disabled>No manufacturing personnel found</MenuItem>
                      )}
                    </Select>
                    </Grid>
                    </Grid>
                    </Box>



          <Button onClick={handleSubmit2} variant="contained" color="secondary" sx={{ mt: 4 ,ml:2,mb:1}}>Submit</Button>
        </Box>
      </Modal>  
    </Box>
  );
};

export default Details;
