import {
  Box,
  Typography,Button,TextField,Modal,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tokens } from "../theme";

const Start_end = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams(); // Get project ID from URL
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [sno_id, setsno_id] = useState();
  const [project_id, setid] = useState();
  const [customername, setcustomername] = useState();
  const [model, setmodel] = useState();
  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [sopdate, setsopdate] = useState();

  useEffect(() => {
    if (id) {
      fetch(`http://163.125.102.142:6500/details2?project_id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((row, index) => ({
            ...row,
            id: index + 1,
            start_date: row.start_date
              ? new Date(row.start_date).toLocaleDateString('en-GB', {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).replace(/ /g, "")
              : "N/A",
            end_date: row.end_date
              ? new Date(row.end_date).toLocaleDateString('en-GB', {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).replace(/ /g, "")
              : "N/A",
            sop_date: row.sop_date
              ? new Date(row.sop_date).toLocaleDateString('en-GB', {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).replace(/ /g, "")
              : "N/A",
          }));
          setData(formattedData);
        })
        .catch((error) => console.error("Error fetching dev details:", error));
    }
  }, [id]);

  const handleClose = () => setOpen(false);
  const handleOpen = (id) => {
    setOpen(true);
    setid(id);
  };

  const columns = [
    { field: "customer_name", headerName: "CUSTOMER NAME", flex: 0.7 },
    { field: "project_name", headerName: "MODEL", flex: 0.7 },
    { field: "start_date", headerName: "PROJECT START DATE", flex: 0.5 },
    { field: "end_date", headerName: "PROJECT END DATE", flex: 0.5 },
    { field: "sop_date", headerName: "SOP DATE.", flex: 0.5 },
  ];

  const handleSubmit = async () => {
    try {
      const projectData = {
        project_id: id,
        id: sno_id,
        customername: customername,
        model: model,
        startdate: startdate,
        enddate: enddate,
        sopdate: sopdate,
      };

      const response = await fetch('http://163.125.102.142:6500/api/updatedetails', {
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
      <Typography variant="h4" color={colors.grey[100]} gutterBottom>
      
      </Typography>
      <Box
        height="20vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id || row.part_no}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(params) => {
            console.log("Clicked row:", params.row);
            handleOpen(params.row["id"]);
          }}
        />
      </Box>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box p={3} bgcolor="white" borderRadius={2} width="400px" mx="auto" mt="100px">
          <Typography variant="h6" id="modal-title">
            Update  Details          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Customer Name
          </Typography>
          <TextField
            fullWidth
            value={customername}
            onChange={(e) => setcustomername(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Model
          </Typography>
          <TextField
            fullWidth
            value={model}
            onChange={(e) => setmodel(e.target.value)}
            sx={{ mt: 2 }}
          />
          
         <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <Typography variant="body1" sx={{ mt: 2, mb: 0 }}>
                       Start Date
                     </Typography>
                     <DesktopDatePicker
                       value={startdate}
                       onChange={(newValue) => setstartdate(newValue)}
                       renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
                     />
                   </LocalizationProvider>

                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <Typography variant="body1" sx={{ mt: 2, mb: 0 }}>
                       End Date
                     </Typography>
                     <DesktopDatePicker
                       value={enddate}
                       onChange={(newValue) => setenddate(newValue)}
                       renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
                     />
                   </LocalizationProvider>


                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <Typography variant="body1" sx={{ mt: 2, mb: 0 }}>
                       SOP Date
                     </Typography>
                     <DesktopDatePicker
                       value={sopdate}
                       onChange={(newValue) => setsopdate(newValue)}
                       renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
                     />
                   </LocalizationProvider>

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

export default Start_end;
