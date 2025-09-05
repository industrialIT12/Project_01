import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box,MenuItem, Modal, Typography, TextField, Button,IconButton } from '@mui/material';
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
import { useLocation } from "react-router-dom";


const MeetingTable = ({project_id, onExportData}) => {
  const [data, setRows] = useState([]);
  const { projectName } = useParams();
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [Date, setDate] = useState();
  const [Action, setAction] = useState();
  const [remark, setremark] = useState();
  const [Status, setStatus] = useState();
  const [update, setupdate] = useState();
  const [sno_id, setsno_id] = useState();
  const [ExportData, setExportData] = useState(null)
  const location = useLocation();
  const booking = location.state?.booking;
  

  useEffect(() => {
    fetch('http://163.125.102.142:6500/api/get_bookings')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((row, index) => ({
          ...row,
          id: row.sl_no || index+1,
        }));
        setRows(formattedData);
        setsno_id(formattedData[0].sl_no);
        if(onExportData){
          onExportData(data)
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [project_id, projectName]);

  const handleClose = () => setOpen(false);
  const handleOpen = (id) => {
    setOpen(true);
    setsno_id(id);
  };

  const handleSubmit = async () => {
    try {
      const projectData = {
        id:sno_id,
        remark: remark,
        
      };

      const response = await fetch('http://163.125.102.142:6500/api/updatetable', {
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
    { field: "id", headerName: "Serial No.", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "visit_type", headerName: "Visit Type", flex: 1 },
    { field: "customer_name", headerName: "Customer Name", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "event", headerName: "Purpose of Visit", flex: 1 },
    { field: "remark", headerName: "Remark", flex: 1 },
    
 
  ];

 

  return (
    
    <Box m="40px">
      <Typography
          variant="h2" // Sets large text size
          align="center" // Centers the text
          sx={{
            color: "white",
            padding:'15px',
            backgroundColor:'#64BDD1',
            fontWeight: "bold",  
            fontsize: '25px',
            marginLeft: "60px"
              }}
          >
             Visit and Meetings for NPD Projects
          </Typography>
          
          
      <Box
        m="40px 0 0 60px"
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
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
              <Box p={3} bgcolor="white" borderRadius={2} width="400px" mx="auto" mt="100px">
              <Typography id="modal-title" fontSize="20px" fontWeight="bold" variant="h6" component="h2" align="center">Update Data</Typography>
      
      
              
                <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
                  Remarks
                </Typography>
                <TextField
                  type="remark"
                  fullWidth
                  value={remark}
                  onChange={(e) => setremark(e.target.value)}
                  sx={{ mt: 2 }}
                  required
                />
                
                
                
      
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </Box>
            </Modal>
    </Box>

    
  );
};

export default MeetingTable;

