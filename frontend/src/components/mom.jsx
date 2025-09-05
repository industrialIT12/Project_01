import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Modal, Typography, TextField, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { addMonths, format, differenceInMonths } from 'date-fns';
import { useTheme } from '@emotion/react';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { tokens } from '../theme';
import SendIcon from '@mui/icons-material/Send';

const MOMComponent = ({project_id, onExportData}) => {
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

  useEffect(() => {
    fetch(`http://163.125.102.142:6500/api/get_mom_table?project_id=${project_id}`)
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

  const handleClose = () => setOpen(false);
  const handleOpen = (sl_no) => {
    setOpen(true);
    setsno_id(sl_no);
  };

  const sendMail = async (sl_no, rowData) => {
    const { part_name, date, concern_point_discussed, raised_by, email } = rowData; // Extract data from row
  
    const subject = `MOM Point ID: ${sl_no}`;
    const text = `
      MOM Point ID: ${sl_no}
      Part Name: ${part_name}
      Date: ${date}
      Concern Point Discussed: ${concern_point_discussed}
      Raised By: ${raised_by}
    `;
    
    try {
      const response = await fetch('http://163.125.102.142:6500/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          text,
          recipient: email, 
          part_name, // Send part_name
          date, // Send date
          concern_point_discussed, // Send concern_point_discussed
          raised_by, // Send raised_by
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Email Sent Successfully")
      } else {
        console.error('Error sending email:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
};
  

  const columns = [
    { field: "sl_no", headerName: "MOM POINT ID", flex: 0.5 },
    { field: "part_name", headerName: "PART NAME", flex: 1 },
    { field: "date", headerName: "DATE", flex: 1 },
    { field: "concern_point_discussed", headerName: "CONCERN POINT DISCUSSED", flex: 1 },
    { field: "raised_by", headerName: "RAISED BY", flex: 1 },
    { field: "raisedby_department", headerName: "DEPARTMENT", flex: 1 },
    { field: "action", headerName: "ACTION", flex: 1 },
    { field: "latest_update", headerName: "LATEST UPDATE", flex: 1 },
    { field: "updatee", headerName: "UPDATE POINT", flex: 1 },
    { field: "resp", headerName: "RESPONSIBILITY", flex: 1 },
    { field: "resp_department", headerName: "RESPONSIBLE DEPARTMENT", flex: 1 },
    { field: "tdc", headerName: "TDC", flex: 1 },
    { field: "status", headerName: "STATUS", flex: 1 },
    { field: "day_count", headerName: "CONCERN OPEN SINCE", flex: 1 },
    {
      field: "sendMail",
      headerName: "SEND MAIL",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              event.stopPropagation();  // Stop row click from firing
              sendMail(params.row.sl_no, params.row);  // Call the sendMail function
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px 10px",
            }}
          >
            <SendIcon />
            Send Email
          </Button>
        );
      },
    }
  ];

  const handleSubmit = async () => {
    try {
      const projectData = {
        project_id: id,
        action: Action,
        latest_update: Date,
        tdc: TDC,
        update: update,
        sl_no: sno_id,
        status: Status,
      };

      const response = await fetch('http://163.125.102.142:6500/api/updatemom', {
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

  return (
    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="40vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
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
            handleOpen(params.row["sl_no"]);
          }}
        />
      </Box>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box p={3} bgcolor="white" borderRadius={2} width="400px" mx="auto" mt="100px">
          <Typography variant="h6" id="modal-title">
            Update MOM
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Action
          </Typography>
          <TextField
            fullWidth
            value={Action}
            onChange={(e) => setAction(e.target.value)}
            sx={{ mt: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="body1" sx={{ mt: 2, mb: 0 }}>
              Latest Update
            </Typography>
            <DesktopDatePicker
              value={Date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
            />
          </LocalizationProvider>

          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Update
          </Typography>
          <TextField
            fullWidth
            value={update}
            onChange={(e) => setupdate(e.target.value)}
            sx={{ mt: 2 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="body1" sx={{ mt: 2, mb: 0 }}>
              TDC
            </Typography>
            <DesktopDatePicker
              value={TDC}
              onChange={(newValue) => setTDC(newValue)}
              renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
            />
          </LocalizationProvider>

          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Status
          </Typography>
          <TextField
            fullWidth
            value={Status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mt: 2 }}
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

export default MOMComponent;

