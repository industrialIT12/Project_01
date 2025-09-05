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

const ProjectTeamtable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams(); // Get project ID from URL
  const [data, setData] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`http://163.125.102.142:6500/team_details?project_id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(("datais-",data));
          
          const formattedData = data.map((rows, index) => ({
            Id2: index + 1,  // Adding Serial Number
            project_mgmt_team:rows.project_mgmt_team,
            project_eng_team:rows.project_eng_team,
            business_development_team:rows.business_development_team,
            supply_chain_mgmt_team:rows.supply_chain_mgmt_team,
            tool_develop_team:rows.tool_develop_team,
            laboratory:rows.laboratory,
            spm_team:rows.spm_team,
            plmc_team:rows.plmc_team,
            manufacturing:rows.manufacturing,
            
          }));

          setData(formattedData);
        })
    }
  }, [id]); 
  
  const columns = [
    // { field: "Id2", headerName: "SR. NO", flex: 0.2 },
    { field: "project_mgmt_team", headerName: "PROJECT MANAGEMENT", flex: 1 },
    { field: "project_eng_team", headerName: "PRODUCTION ENGINEERING", flex: 1 },
    { field: "business_development_team", headerName: "BUSINESS DEVELOPMENT", flex: 1 },
    { field: "supply_chain_mgmt_team", headerName: "SUPPLY CHAIN MANAGEMENT", flex: 1 },
    { field: "tool_develop_team", headerName: "TOOL DEVELOPMENT", flex: 1 },
    { field: "laboratory", headerName: "LABORATORY", flex: 1 },
    { field: "spm_team", headerName: "SPM DEVELOPMENT", flex: 1 },
    { field: "plmc_team", headerName: "PLMC", flex: 1 },
    { field: "manufacturing", headerName: "MANUFACTURING", flex: 1 },
  ];


  return (
    <Box m="30px ">
      <Typography variant="h4" color={colors.grey[100]} gutterBottom>
      
      </Typography>
      <Box
      m="0px -20px 0 -20px"
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
          getRowId={(row) => row.Id2 || row.part_no}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ProjectTeamtable;
