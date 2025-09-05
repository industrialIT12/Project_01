import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Modal, Typography, TextField, Button,IconButton,MenuItem,Select} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { addMonths, format, differenceInMonths } from 'date-fns';
import { useTheme } from '@emotion/react';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { tokens } from '../theme';
import SendIcon from '@mui/icons-material/Send';
import Papa from "papaparse";
import DownloadIcon from '@mui/icons-material/Download';
import {saveAs} from "file-saver";
import DeleteIcon from '@mui/icons-material/Delete';




const User = ({project_id, onExportData}) => {
  const [name, setName] = useState('');
    const [department, setdepartment] = useState('');
    const [email, setemail] = useState('');
    const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);
    const [sno_id, setsno_id] = useState();
    const [data, setRows] = useState([]);
    const { id } = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
  

  useEffect(() => {
    fetch('http://163.125.102.142:6500/api/get_user')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((row, index) => ({
          ...row,
          id: row.id || index,
          ID2: index+1,
        }));
        setRows(formattedData);
        setsno_id(formattedData[0].sl_no);
        if(onExportData){
          onExportData(data)
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://163.125.102.142:6500/api/delete_user?id=${id}`, { method: "DELETE" });
        if (response.ok) {
          setRows(prevRows => prevRows.filter(row => row.id !== id));
          console.log("User deleted successfully");
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleSubmit2 = async () => {
    try {
      const projectData = {
        name: name,
        department: department,
        email: email,
      };

      const response = await fetch('http://163.125.102.142:6500/api/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        handleClose2();
        console.log("Plan updated successfully");
        alert("User Added Successfully!");
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

  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const handleClose = () => setOpen(false);
  const handleOpen = (id) => {
    setOpen(true);
    setsno_id(id);
  };

  const handleSubmit = async () => {
    try {
      const projectData = {
        id:sno_id,
        name: name,
        department: department,
        email: email,
      };

      const response = await fetch('http://163.125.102.142:6500/api/updateuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        handleClose();
        console.log("Plan updated successfully");
      } else {
        console.log("Failed to update plan");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  

  const columns = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "ID2", headerName: "Serial No.", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "email", headerName: "Email-ID", flex: 1 },
    {
      field: "delete",
      headerName: "Delete User",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          onClick={(event) => {
            event.stopPropagation(); // Prevents row click event
            handleDelete(params.row.id);
          }}
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
    
    // {
    //   field: "sendMail",
    //   headerName: "SEND MAIL",
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         onClick={(event) => {
    //           event.stopPropagation();  // Stop row click from firing
    //           sendMail(params.row.sl_no, params.row);  // Call the sendMail function
    //         }}
    //         sx={{
    //           display: "flex",
    //           alignItems: "center",
    //           justifyContent: "center",
    //           padding: "5px 10px",
    //         }}
    //       >
    //         <SendIcon />
    //         Send Email
    //       </Button>
    //     );
    //   },
    // }
  ];

  // const handleSubmit = async () => {
  //   try {
  //     const projectData = {
  //       project_id: id,
  //       action: Action,
  //       latest_update: Date,
  //       tdc: TDC,
  //       update: update,
  //       sl_no: sno_id,
  //       status: Status,
  //     };

  //     const response = await fetch('http://163.125.102.143:6500/api/updatemom', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(projectData),
  //     });

  //     if (response.ok) {
  //       handleClose();
  //       console.log("Plan updated successfully");
  //     } else {
  //       console.log("Failed to update plan");
  //     }
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  return (
    <Box>
    <Box  display='flex' justifyContent="flex-end" gap={2} mb={2} mt={6}>
    <Button variant="contained" color="secondary" onClick={handleOpen2}>Add New User</Button>
  </Box>

    
    <Box m="20px">
      <Typography
          variant="h2" // Sets large text size
          align="center" // Centers the text
          sx={{
            color: "white",
            padding:'15px',
            backgroundColor:'#64BDD1',
            fontWeight: "bold",  
            fontsize: '25px'
              }}
          >
             Project Team
          </Typography>
          
          
      <Box
        m="20px 0 0 70px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none",fontSize:"15px",fontWeight:"bold" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: "#64BDD1",
          },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(params) => {
            console.log("Clicked row:", params.row);
            handleOpen(params.row.id);
          }}
        />
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
          width: 450,
          bgcolor: 'background.paper',
          border: '0px solid #000',
          boxShadow: 24,
          height: '45%',
          p:0,
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
    Add New User
  </Typography>
</Box>
<Box sx={{
          
          p:2
        }}>
          <Typography variant="body1"  sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            User Name
          </Typography>
          <TextField
            type="text"
            fullWidth 
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2 }}
            required
          />

   
          <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            Department
          </Typography>
          <Select
            fullWidth
            value={department}
            onChange={(e) => setdepartment(e.target.value)}
            sx={{ mt: 2 }}
            required
          >
            <MenuItem value="Manufacturing">Manufacturing</MenuItem>
            <MenuItem value="Project Management">Project Management</MenuItem>
            <MenuItem value="Production Engineering">Production Engineering</MenuItem>
            <MenuItem value="Laboratory">Laboratory</MenuItem>
            <MenuItem value="PLMC">PLMC</MenuItem>
            <MenuItem value="SPM Development">SPM Development</MenuItem>
            <MenuItem value="Tool Development">Tool Development</MenuItem>
            <MenuItem value="Supply Chain Management">Supply Chain Management</MenuItem>
            <MenuItem value="Business Development">Business Development</MenuItem>

          </Select>

        
          <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            Email-ID
          </Typography>
          <TextField
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setemail(e.target.value)}
            sx={{ mt: 2 }}
            required
          />

  



          <Button onClick={handleSubmit2} variant="contained" color="secondary" sx={{ mt: 4 }}>Submit</Button>
        </Box>
        </Box>
      </Modal> 

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box p={3} bgcolor="white" borderRadius={2} width="400px" mx="auto" mt="100px">
        <Typography id="modal-title" fontSize="20px" fontWeight="bold" variant="h6" component="h2" align="center">Update User Details</Typography>

            <Typography variant="body1"  sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            User Name
          </Typography>
          <TextField
            type="text"
            fullWidth 
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2 }}
            required
          />

   
          <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            Department
          </Typography>
          <Select
            fullWidth
            value={department}
            onChange={(e) => setdepartment(e.target.value)}
            sx={{ mt: 2 }}
            required
          >
            <MenuItem value="Manufacturing">Manufacturing</MenuItem>
            <MenuItem value="Project Management">Project Management</MenuItem>
            <MenuItem value="Production Engineering">Production Engineering</MenuItem>
            <MenuItem value="Laboratory">Laboratory</MenuItem>
            <MenuItem value="PLMC">PLMC</MenuItem>
            <MenuItem value="SPM Development">SPM Development</MenuItem>
            <MenuItem value="Tool Development">Tool Development</MenuItem>
            <MenuItem value="Supply Chain Management">Supply Chain Management</MenuItem>
            <MenuItem value="Business Development">Business Development</MenuItem>

          </Select>

        
          <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            Email-ID
          </Typography>
          <TextField
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setemail(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
          
          
          

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>

    
    
  );
};

export default User;

