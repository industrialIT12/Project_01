import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, Button, TextField, Box, Typography, useTheme, IconButton,Modal,Select, MenuItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import { addMonths, format, differenceInMonths } from 'date-fns'; // For date manipulation
import MOMComponent from './mom';
import { tokens } from '../theme';
import GanttChart from './Multi_series';
import Eventdata from './Event_data';
import DownloadIcon from '@mui/icons-material/Download';
import {saveAs} from "file-saver";
import Papa from "papaparse";
import OpenConcern_Line from './openconcern_line';
import OpenConcern_Bar from './openconcern_bar';
import Dev_details from './dev_details';
import Start_end from './start_endComp';
import OpenConcern_table from './open_concerntable';
import ProjectTeamtable from './project_teamtable';
import AddIcon from "@mui/icons-material/Add";

const TableComponent = () => {
  const [rows, setRows] = useState([]);
  const [rown, setRown] = useState([]);
  const [devDetails, setDev] = useState([]);
  const { projectName } = useParams();
  const { id } = useParams();
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [editRowIndex, setEditRowIndex] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ExportData, setExportData] = useState(null)
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [mfg, setMfg] = useState([]);
  const [manufacturingUsers, setManufacturingUsers] = useState([]);
  const [plmc, setplmc] = useState([]);
  const [plmcUsers, setplmcUsers] = useState([]);
  const [scm, setscm] = useState([]);
  const [scmUsers, setscmUsers] = useState([]);
  const [pm, setpm] = useState([]);
  const [pmUsers, setpmUsers] = useState([]);
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

  



  const fetchData = () => {
    fetch("http://163.125.102.142:6500/api/get_user")
      .then((response) => response.json())
      .then((data) => {
        console.log("userdata", data);
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

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleClose = () => setOpen(false);
  
  const handleOpen = () => {
    fetchData(); // Fetch data when modal opens
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const projectData = {
        project_id: id,
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

      

      const response = await fetch("http://163.125.102.142:6500/api/updateprojteam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        handleClose();
        console.log("Plan updated successfully");
      } else {
        console.log("Failed to update plan");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


    const [rowData, setRowData] = useState(rown); // Tracks table data
  
    const handleEditClick = (index) => {
      setEditRowIndex(index); // Set the row index to edit
    };
  
    const handleSaveClick = (index) => {
      // Save changes (could involve API call here)
      setEditRowIndex(null); // Exit edit mode
    };
    
  
    const handleCancelClick = () => {
      setEditRowIndex(null); // Exit edit mode without saving
    };
  
    const handleInputChange = (e, field, index) => {
      const updatedRows = [...rowData];
      updatedRows[index][field] = e.target.value; // Update specific field
      setRowData(updatedRows);
    };

    const downloadExcel = () => {
      if (ExportData){
        const CSVData = Papa.unparse(ExportData);
        const blob = new Blob([CSVData], { type: "text/csv;charset=utf-8;"});
        saveAs(blob, `MOM Points.csv`)
      }else{
        console.log("No MOM Data Available to download for the Current Project");
        
      }
    }
    

 

  useEffect(() => {
    fetch(`http://163.125.102.142:6500/api/get_dev?project_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((devDetail) => ({
          ...devDetail,
          first_part_submission: devDetail.first_part_submission
            ? new Date(devDetail.first_part_submission).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }).replace(/ /g, '-')
            : 'N/A',
        }));
        setDev(formattedData);
      })
      .catch((error) => console.error('Error fetching dev details:', error));
  }, [id]);
  



  
    
  

  return (
    <TableContainer component={Paper}>
      <Box height="50%" m="-30px 0 0 0" width="100%">
<Box
    mt="25px"
    display="flex"
    justifyContent="center" // Centers the header horizontally
    alignItems="center"    // Aligns the header vertically (if needed)
    backgroundColor="#2596be" // Applies the cyan background color
    borderRadius="10px 10px 0 0" // Rounded corners for top only
    padding="10px" // Adds some padding for better appearance
  >
    <Typography
    fontSize="20PX"
      variant="h5"
      fontWeight="bold"
      color={colors.grey[100]} // Fixed color syntax
    >
      PROJECT REVIEW MEETING
    </Typography>
  </Box>
  <Box height="50%" m="-10px 0 0 0" width="100%">
    <Start_end id={id}  />
  </Box>
</Box>

      <Table aria-label="project review table">
       
        
      </Table>

      <Box height="20%" m="-30px 0 0 0" width="100%">
<Box
    mt="10px"
    display="flex"
    justifyContent="space-between" // Centers the header horizontally
    alignItems="center"    // Aligns the header vertically (if needed)
    backgroundColor="#44A275" // Applies the cyan background color
    borderRadius="10px 10px 0 0" // Rounded corners for top only
    padding="10px" // Adds some padding for better appearance
  >
    <Box
          flex="1"
          display="flex"
          justifyContent="center" // Center the text
        >
    <Typography
      variant="h5"
      fontWeight="bold"
      color={colors.grey[100]} // Fixed color syntax
    >
      PROJECT TEAM
    </Typography>
        </Box>
        <IconButton onClick={handleOpen} style={{ color: "grey" }}>
        <AddIcon />
      </IconButton>

      
  </Box>
  <Box height="20%" m="-30px 0 0 0" width="100%">
    <ProjectTeamtable project_id={id} project_name={projectName} />
  </Box>
</Box>

<Box height="50%" m="-30px 0 0 0" width="100%">
<Box
    mt="25px"
    display="flex"
    justifyContent="center" // Centers the header horizontally
    alignItems="center"    // Aligns the header vertically (if needed)
    backgroundColor="cyan" // Applies the cyan background color
    borderRadius="10px 10px 0 0" // Rounded corners for top only
    padding="10px" // Adds some padding for better appearance
  >
    <Typography
      variant="h5"
      fontWeight="bold"
      color={colors.grey[100]} // Fixed color syntax
    >
      PROJECT EVENT DATA
    </Typography>
  </Box>
  <Box height="50%" m="-30px 0 0 0" width="100%">
    <Eventdata project_id={id} project_name={projectName} />
  </Box>
</Box>

      <Table aria-label="project review table">
        
        <TableBody>
          

</TableBody>
      </Table>
<Box height="50%" m="-30px 0 0 0" width="100%">
<Box
    mt="25px"
    display="flex"
    justifyContent="center" // Centers the header horizontally
    alignItems="center"    // Aligns the header vertically (if needed)
    backgroundColor="#2596be" // Applies the cyan background color
    borderRadius="10px 10px 0 0" // Rounded corners for top only
    padding="10px" // Adds some padding for better appearance
  >
    <Typography
    fontSize="18PX"
      variant="h5"
      fontWeight="bold"
      color={colors.grey[100]} // Fixed color syntax
    >
      DEVELOPMENT DETAILS
    </Typography>
  </Box>
  <Box height="50%" m="-10px 0 0 0" width="100%">
    <Dev_details project_id={id} project_name={projectName} />
  </Box>
</Box>

      <Table aria-label="project review table">
        
        <TableBody>

      


    </TableBody>

    <Box height="20%" m="-30px 0 0 0" width="100%">
<Box
    mt="10px"
    display="flex"
    justifyContent="center" // Centers the header horizontally
    alignItems="center"    // Aligns the header vertically (if needed)
    backgroundColor="#9CF3CC" // Applies the cyan background color
    borderRadius="10px 10px 0 0" // Rounded corners for top only
    padding="10px" // Adds some padding for better appearance
  >
    <Typography
      variant="h5"
      fontWeight="bold"
      color={colors.grey[100]} // Fixed color syntax
    >
      OPEN CONCERN DETAILS
    </Typography>
  </Box>
  <Box height="20%" m="-30px 0 0 0" width="100%">
    <OpenConcern_table project_id={id} project_name={projectName} />
  </Box>
</Box>


    

      </Table>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="minmax(140px, auto)"
        gap="10px"
      >
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
          Total Concerns
        </Typography>
        <OpenConcern_Bar />
      </Box>
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
          Open VS Close Concerns
        </Typography>
        <OpenConcern_Line />
      </Box>
      <Box
        gridColumn="span 12"
        gridRow="span 2"
        backgroundColor={colors.whitebg[200]}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.25)"
        borderRadius="10px"
      >
        <Box
          mt="25px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="cyan"
          borderRadius="10px 10px 0 0"
          padding="10px"
        >
        <Box
          flex="1"
          display="flex"
          justifyContent="center" // Center the text
        >
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]} // Fixed color syntax
          >
            MOM POINTS
          </Typography>
        </Box>
        <IconButton
          onClick={downloadExcel}
          style={{ color: colors.grey[100] }}
        >
          <DownloadIcon /> {/* Replace with any download icon */}
        </IconButton>
      </Box>
  <Box height="50%" m="-30px 0 0 0" width="100%">
    <MOMComponent project_id={id} project_name={projectName} onExportData = {(data) => setExportData(data)} />
  </Box>
</Box>
<Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
<Box
    p={3}
    bgcolor="white"
    borderRadius={2}
    width="800px"
    height="900px"
    mx="auto"
    mt="100px"
    sx={{ overflowY: "auto", maxHeight: "80vh", overflowX: "hidden" }} 
  >
          <Typography variant="h6" fontSize="20px" fontWeight="bold" id="modal-title">Select Project Team</Typography>

          <Typography variant="body1"  sx={{ mt: 2, mb: 1 }}>Manufacturing Team</Typography>
          
          <Select multiple fullWidth value={mfg} onChange={handleChange(setMfg)} sx={{ mt: 2 }} renderValue={(selected) => selected.join(", ")}>
          {manufacturingUsers.length > 0 ? (
            manufacturingUsers.map((user) => (
              <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>No personnel found</MenuItem>
          )}
        </Select>

          <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>PLMC Team</Typography>
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

          <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>SCM Team</Typography>
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

          <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>Project Management Team</Typography>
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

          <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>SPM Development Team</Typography>
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

          <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>Tool Development Team</Typography>
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

          <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>Business Development Team</Typography>
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

          <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>Project Engineering Team</Typography>
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

          <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>Laboratory</Typography>
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

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
          </Box>
        </Box>
      </Modal>
</Box>



    </TableContainer>
   
  );
};

export default TableComponent;
