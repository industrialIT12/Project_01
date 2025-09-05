import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Modal, Typography, TextField, Button,IconButton } from '@mui/material';
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


const Allevent = ({project_id, onExportData}) => {
  const [data, setRows] = useState([]);
  const { projectName } = useParams();
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [Date, setDate] = useState();
  const [Action, setAction] = useState();
  const [TDC, setTDC] = useState();
  const [Status, setStatus] = useState();
  const [update, setupdate] = useState();
  const [sno_id, setsno_id] = useState();
  const [ExportData, setExportData] = useState(null)
  

  useEffect(() => {
    fetch('http://163.125.102.142:6500/api/get_allevent')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map((row, index) => ({
          ...row,
          id: row.sl_no || index,
        }));
        setRows(formattedData);
        setsno_id(formattedData[0].sl_no);
        if(onExportData){
          onExportData(data)
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [project_id, projectName]);

  // const downloadExcel = () => {
  //       if (ExportData){
  //         const CSVData = Papa.unparse(ExportData);
  //         const blob = new Blob([CSVData], { type: "text/csv;charset=utf-8;"});
  //         saveAs(blob, `MOM Points.csv`)
  //       }else{
  //         console.log("No MOM Data Available to download for the Current Project");
          
  //       }
  //     }


  const columns = [
    { field: "point_id", headerName: "Serial No.", flex: 1 },
    { field: "type", headerName: "Event", flex: 1 },
    { field: "monthyear", headerName: "Month-Year", flex: 1 },
    { field: "point_description", headerName: "Description", flex: 1 },
    
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
             Projects Event Data
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
        />
      </Box>
    </Box>
  );
};

export default Allevent;

