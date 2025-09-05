import { Box, Button, Modal, TextField, Typography, useTheme, MenuItem, Select } from "@mui/material";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import TableComponent from "./project_list";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [Date, setDate] = useState();
  const [PartName, setPartName] = useState();
  const [update, setupdate] = useState();
  const [Concenrpoint, setConcenrpoint] = useState();
  const [RaisedBy, setRaisedBy] = useState();
  const [Respdept, setRespdept] = useState();
  const [RaisedBydept, setRaisedBydept] = useState();
  const [Action, setAction] = useState();
  const [LatestUpdate, setLatestUpdate] = useState();
  const [Resp, setResp] = useState();
  const [Tdc, setTdc] = useState();
  const [partname, setpartname] = useState('');
  const [partno, setpartno] = useState('');
  const [annual_vol, setannual_vol] = useState('');
  const [firstpart_subbmission, setfirstpart_subbmission] = useState('');
  const [productdsgn_resp, setproductdsgn_resp] = useState('');
  const [tooling_resp, settooling_resp] = useState('');
  const [mfg_location, setmfg_location] = useState('');
  const [Changephase, setChangephase] = useState();
  const [monthyear, setmonthyear] = useState();
  const [activity, setactivity] = useState();
  const [type, settype] = useState();
  const { project_id } = useParams();
  const { id } = useParams();
  const [open, setOpen] = useState(false); 
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    concern: '',
    raisedBy: '',
  });

  useEffect(() => {
    fetch('http://163.125.102.142:6500/')
      .then(response => response.json())
      .then(data => {
        const transformedData = Object.keys(data).map(key => {
          return { name: key, ...data[key] };
        });
        setData(transformedData);
      })
      .catch(error => console.error('Error fetching card data:', error));
  }, []);

  useEffect(() => {
    fetch('http://163.125.102.142:6500/test')
      .then(response => response.json())
      .then(data => {
        const transformedData = Object.keys(data).map(key => {
          return { name: key, ...data[key] };
        });
        setData2(transformedData);
      })
      .catch(error => console.error('Error fetching card data:', error));
  }, []);

  

  const handleOpen = () => setOpen(true);
  const handleOpen1 = () => setOpen1(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen2(false);

  // Handle form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const projectData = {
        "date": Date,
        "part_name": PartName,
        "update": update,    
        "concernpoint": Concenrpoint,
        "project_id": id,
        "Raised_by": RaisedBy,
        "Action": Action,
        "Latest_update": LatestUpdate,
        "Responsibility": Resp,
        "TDC": Tdc,
        "RaisedBydept": RaisedBydept,
        "Respdept": Respdept,
      };
  
      const response = await fetch('http://163.125.102.142:6500/api/MOM', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData), 
      });

      if (response.ok) {
        handleClose();
        console.log("Plan updated successfully");
        alert("MOM Added Successfully!");
      } else {
        console.log("Failed to update plan");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit1 = async () => {
    try {
      const Phasedata = {
        "Changephase": Changephase,
        "project_id": id,    
      };
  
      const response = await fetch('http://163.125.102.142:6500/api/updatephase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Phasedata), 
      });

      if (response.ok) {
        handleClose1();
        console.log("Plan updated successfully");
      } else {
        console.log("Failed to update plan");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit2 = async () => {
    try {
      const Devdetails = {
        "part_name": partname,
        "project_id": project_id,
        "partno": partno,
        "annual_vol": annual_vol,
        "firstpart_subbmission": firstpart_subbmission,
        "productdsgn_resp": productdsgn_resp,
        "tooling_resp": tooling_resp,
        "mfg_location": mfg_location,
      };
  
      const response = await fetch(`http://163.125.102.142:6500/api/dev_details?project_id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Devdetails), 
      });

      if (response.ok) {
        handleClose2();
        console.log("Updated successfully");
      } else {
        console.log("Failed to update plan");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit3 = async () => {
    try {
      const TimingData = {
        "monthyear": monthyear,
        "activity": activity,
        "type": type,
      };
  
      const response = await fetch(`http://163.125.102.142:6500/api/timep_data?project_id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        
        body: JSON.stringify(TimingData), 
      });

      if (response.ok) {
        handleClose3();
        console.log("Updated successfully");
      } else {
        console.log("Failed to update plan");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

    

  
  

  return (
    <Box m="70px 10px 10px 80px"> {/* Top 70px, Right 40px, Bottom 10px, Left 40px */}
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" justifyContent="left" alignItems="center" mr="-40px" mt="-35px">
          <img
            alt="ppap logo"
            width="10%"
            height="auto"
            src={`../../assets/logo.jpg`}
            style={{ borderRadius: "0%" }}
          />
        </Box>

        {/* Add MOM Button */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
  <Button variant="contained" color="secondary" onClick={handleOpen} style={{ marginRight: '10px' }}>
    Add MOM
  </Button>
  <Button variant="contained" color="secondary" onClick={handleOpen1} style={{ marginRight: '4px' }}>
    Update Phase
  </Button>
  <Button variant="contained" color="secondary"  onClick={handleOpen2}>
    ADD Devlopment Details & Event data
  </Button>
</Box>

      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="minmax(140px, auto)"
        gap="10px"
      >
        {/* ROW 2: Table Component */}
        <Box
          gridColumn="span 12"
          gridTemplateColumns="repeat(12, 1fr)"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TableComponent />
        </Box>
      </Box>

      {/* MODAL FOR ADDING MOM */}
      <Modal
        open={open}
        onClose={handleClose}
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
          borderRadius: '15px',
          overflowY: 'auto',
          overflowX: 'auto',
        }}>
          <Typography variant="h6" fontSize="20px" fontWeight="bold" id="modal-title">
            Add MOM
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="body1" sx={{ mt: 2, mb:0}}>Date</Typography>
              <DesktopDatePicker
                value={Date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => <TextField  sx={{ mb: 2 }} {...params} />}
              />
          </LocalizationProvider>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Part Name</Typography>
          <TextField
            fullWidth
            value={PartName}
            onChange={(e) => setPartName(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Concerned Point Discussed</Typography>
          <TextField
            fullWidth
            value={Concenrpoint}
            onChange={(e) => setConcenrpoint(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Raised By</Typography>
          <TextField
            fullWidth
            value={RaisedBy}
            onChange={(e) => setRaisedBy(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Raised By-Department</Typography>
          <Select
            fullWidth
            value={RaisedBydept}
            onChange={(e) => setRaisedBydept(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Project Management">Project Management</MenuItem>
            <MenuItem value="Production Engineering">Production Engineering</MenuItem>
            <MenuItem value="Business Development">Business Development</MenuItem>  
            <MenuItem value="Supply Chain Management">Supply Chain Management</MenuItem>
            <MenuItem value="Tool Development">Tool Development</MenuItem>
            <MenuItem value="PLMC">PLMC</MenuItem>
            <MenuItem value="SPM Development">SPM Development</MenuItem>
            <MenuItem value="Manufacturing">Manufacturing</MenuItem>
          </Select>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Action</Typography>
          <TextField
            fullWidth
            value={Action}
            onChange={(e) => setAction(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Latest Update</Typography>
          <TextField
            fullWidth
            type="date"
            value={LatestUpdate}
            onChange={(e) => setLatestUpdate(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Update</Typography>
          <TextField
            fullWidth
            value={update}
            onChange={(e) => setupdate(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Responsibility</Typography>
          <TextField
            fullWidth
            value={Resp}
            onChange={(e) => setResp(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>
          
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Responsible Department</Typography>
          <Select
            fullWidth
            value={Respdept}
            onChange={(e) => setRespdept(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Project Management">Project Management</MenuItem>
            <MenuItem value="Production Engineering">Production Engineering</MenuItem>
            <MenuItem value="Business Development">Business Development</MenuItem>  
            <MenuItem value="Supply Chain Management">Supply Chain Management</MenuItem>
            <MenuItem value="Tool Development">Tool Development</MenuItem>
            <MenuItem value="PLMC">PLMC</MenuItem>
            <MenuItem value="SPM Development">SPM Development</MenuItem>
            <MenuItem value="Manufacturing">Manufacturing</MenuItem>
          </Select>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>TDC</Typography>
          <TextField
            fullWidth
            type="date"
            value={Tdc}
            onChange={(e) => setTdc(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          {/* <form onSubmit={handleSubmit}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Concerned Point Discussed"
              name="concern"
              value={formData.concern}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Raised By"
              name="raisedBy"
              value={formData.raisedBy}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            </form> */}
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          
        </Box>
      </Modal>


{/*update button moda;l*/}

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box 
          p={3} 
          bgcolor="white" 
          borderRadius={2} 
          width="400px" 
          mx="auto" 
          mt="100px"
        >
          <Typography variant="h6" id="modal-title">
            Update Phase
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Change Phase</Typography>
          <TextField
            fullWidth
            value={Changephase}
            type="number"
            onChange={(e) => setChangephase(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={handleSubmit1} type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
            </Box>
            </Modal>

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
          borderRadius: '20px',
          overflowY: 'auto',
          overflowX: 'auto',
        }}>

            <Typography variant="h6" fontSize="18px" fontWeight="bold" id="modal-title">
            Add Devlopment Details
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Part Name</Typography>
          <TextField
            fullWidth
            value={partname}
            type="Text"
            onChange={(e) => setpartname(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Part Number</Typography>
          <TextField
            fullWidth
            value={partno}
            type="Text"
            onChange={(e) => setpartno(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Annual Volume</Typography>
          <TextField
            fullWidth
            value={annual_vol}
            type="Text"
            onChange={(e) => setannual_vol(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>First Part Submission</Typography>
          <TextField
            fullWidth
            value={firstpart_subbmission}
            type="date"
            onChange={(e) => setfirstpart_subbmission(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Product Design Responsibility</Typography>
          <TextField
            fullWidth
            value={productdsgn_resp}
            type="Text"
            onChange={(e) => setproductdsgn_resp(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Tooling Responsibility</Typography>
          <TextField
            fullWidth
            value={tooling_resp}
            type="Text"
            onChange={(e) => settooling_resp(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Manufacturing Location</Typography>
          <Select
            fullWidth
            value={mfg_location}
            onChange={(e) => setmfg_location(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="PP02">PP02</MenuItem>
            <MenuItem value="PP03">PP03</MenuItem>
            <MenuItem value="PP04">PP04</MenuItem>
            <MenuItem value="PP05">PP05</MenuItem>
            <MenuItem value="PP06">PP06</MenuItem>
            <MenuItem value="PP07">PP07</MenuItem>
            <MenuItem value="PP08">PP08</MenuItem>
          </Select>

          
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={handleSubmit2} type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>

            <Typography variant="h6" fontSize="18px" fontWeight="bold" id="modal-title">
            Add Event Data
          </Typography>

            <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Activity Type</Typography>
          <Select
            fullWidth
            value={type}
            onChange={(e) => settype(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="PPAP Readiness">PPAP Readiness</MenuItem>
            <MenuItem value="Customer Event">Customer Event</MenuItem>
          </Select>

            <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>For Month-Year</Typography>
          <TextField
            fullWidth
            value={monthyear}
            type="month"
            onChange={(e) => setmonthyear(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Activity Description</Typography>
          <TextField
            fullWidth
            value={activity}
            type="Text"
            onChange={(e) => setactivity(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>

          <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={handleSubmit3} type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
            </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
