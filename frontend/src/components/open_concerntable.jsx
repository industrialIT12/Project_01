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

const OpenConcern_table = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams(); // Get project ID from URL
  const [data, setData] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`http://163.125.102.142:6500/api/get_mom?project_id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          
          const formattedData = data.map((row, index) => ({
            Id2: index + 1,  // Adding Serial Number
            part_name: row.part_name,
            total_concerns: row.total_concerns,
            open_for_3_days: row.open_for_3_days,
            open_for_4_7_days: row.open_for_4_7_days,
            open_for_8_15_days: row.open_for_8_15_days,
            open_for_16_days: row.open_for_16_days,
          }));

          setData(formattedData);
        })
    }
  }, [id]); 
  
  const columns = [
    { field: "Id2", headerName: "SR. NO", flex: 0.2 },
    { field: "part_name", headerName: "PART NAME", flex: 0.7 },
    { field: "total_concerns", headerName: "Total Concern", flex: 0.7 },
    { field: "open_for_3_days", headerName: "Open from 3 days", flex: 0.7 },
    { field: "open_for_4_7_days", headerName: "Open from 7 days", flex: 0.7 },
    { field: "open_for_8_15_days", headerName: "Open from 15 days", flex: 0.7 },
    { field: "open_for_16_days", headerName: "More than 15 Days", flex: 0.7 },
  ];


  return (
    <Box m="30px ">
      <Typography variant="h4" color={colors.grey[100]} gutterBottom>
      
      </Typography>
      <Box
      m="0px 0 0 -20px"
        height="25vh"
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
          getRowId={(row) => row.Id2 || row.part_no}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default OpenConcern_table;
