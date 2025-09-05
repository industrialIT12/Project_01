import React, { useState, useEffect } from 'react';
import { Box,Button,TextField,Typography,Modal,Select,MenuItem } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Eventdata = () => {
  const [data, setRows] = useState([]);
  const { id } = useParams(); // Use project_id from URL params
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sno_id, setsno_id] = useState();
  const [status, setstatus] = useState();
  const [date, setdate] = useState();
  const [open, setOpen] = useState(false);
  const [project_id, setid] = useState();

  useEffect(() => {
    fetch(`http://163.125.102.142:6500/api/event_data?project_id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received Data:", data); // Inspect the data structure
        
        // Handle object response
        let formattedData = [];
        if (Array.isArray(data)) {
          formattedData = data.map((row, index) => ({
            ...row,
            id: row.sl_no || index,
            serialNo: index + 1,
            monthyear: row.monthyear
              ? format(new Date(row.monthyear), 'MMM-yyyy')
              : '',
            start_date: row.start_date
              ? format(new Date(row.start_date), 'MMM-yy')
              : '',
            end_date: row.end_date
              ? format(new Date(row.end_date), 'MMM-yy')
              : '',
          }));
        } else if (data && typeof data === 'object') {
          formattedData = [data].map((row, index) => ({
            ...row,
            id: row.sl_no || index,
            serialNo: index + 1,
            monthyear: row.monthyear
              ? format(new Date(row.monthyear), 'MMM-yyyy')
              : '',
            start_date: row.start_date
              ? format(new Date(row.start_date), 'MMM-yyyy')
              : '',
            end_date: row.end_date
              ? format(new Date(row.end_date), 'MMM-yyyy')
              : '',
          }));
        }

        setRows(formattedData);
        console.log("Formatted Data:", formattedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [id]);

  const columns = [
    { field: "serialNo", headerName: "SR. NO.", flex: 1 },
    { field: "type", headerName: "TYPE", flex: 2 },
    { field: "monthyear", headerName: "MONTH-YEAR", flex: 2 },
    { field: "point_description", headerName: "EVENT", flex: 2 },
    { field: "status", headerName: "Status", flex: 2 },
  ];

  const handleSubmit = async () => {
    try {
      const projectData = {
        project_id: id,
        point_id: sno_id,
        date: date,
        status: status,
      };

      const response = await fetch('http://163.125.102.142:6500/api/updateevent', {
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

  const handleClose = () => setOpen(false);
  const handleOpen = (id,point_id) => {
    setOpen(true);
    setid(id);
    setsno_id(point_id);
  };


  return (
    <Box m="20px">
      <Box
        m="30px 0 0 -10px"
        height="30vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(params) => {
            console.log("Clicked row:", params.row);
            handleOpen(params.row["id"],params.row["point_id"]);
          }}
        />
      </Box>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box p={3} bgcolor="white" borderRadius={2} width="400px" mx="auto" mt="100px">
          <Typography variant="h6" id="modal-title">
            Update  Event Details          </Typography>
          

            <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Month-Year</Typography>
          <TextField
            fullWidth
            value={date}
            type="month"
            onChange={(e) => setdate(e.target.value)}
            sx={{ mt: 2 }}
          >
          </TextField>
                   <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            Status
          </Typography>
          <Select
            fullWidth
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            sx={{ mt: 2 }}
            required
          >
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="Delay">Delay</MenuItem>
 
          </Select>
 
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

export default Eventdata;
