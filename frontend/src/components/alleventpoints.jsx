import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';

const Allevent = ({ project_id, onExportData }) => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetch('http://163.125.102.142:6500/api/get_allevent')
      .then(response => response.json())
      .then(rawData => {
        if (onExportData) {
          onExportData(rawData);
        }

        const transformed = transformData(rawData);
        setColumns(transformed.columns);
        setRows(transformed.rows);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [project_id]);

  const transformData = (rawData) => {
    const uniqueMonths = [...new Set(rawData.map(item => {
      const dateObj = new Date(item.monthyear);
      return dateObj.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    }))].sort((a, b) => new Date(a) - new Date(b));
  
    const columnHeaders = [
      { field: "customer_name", headerName: "Customer Name", flex: 0.5 },
      { field: "project_name", headerName: "Models", flex: 0.8 },
      { field: "Nos_of_projects", headerName: "Nos Project", flex: 0.5 },
      // {
      //   field: "status",
      //   headerName: "Status",
      //   flex: 0.5,
      //   renderCell: (params) => {
      //     let color;
      //     switch (params.value) {
      //       case "Upcoming":
      //         color = "yellow";
      //         break;
      //       case "Delay":
      //         color = "red";
      //         break;
      //       case "Done":
      //         color = "green";
      //         break;
      //       default:
      //         color = "black";
      //     }
      //     return (
      //       <span style={{ color, fontWeight: "bold" }}>
      //         {params.value || "-"}
      //       </span>
      //     );
      //   }
      // }
    ];
  
    uniqueMonths.forEach(month => {
      columnHeaders.push({
        field: month,
        headerName: month,
        flex: 1,
        renderCell: (params) => {
          // Extract the stored status for this month
          const status = params.row[`status_${month}`] || "-"; 
  
          let textColor, bgColor;
          switch (status) {
            case "Upcoming":
              textColor = "black";
              bgColor = "#f7f792";
              break;
            case "Delay":
              textColor = "white";
              bgColor = "#f57373";
              break;
            case "Done":
              textColor = "white";
              bgColor = "#a4f5a4";
              break;
            default:
              textColor = "black";
              bgColor = "transparent";
          }
  
          return (
            <div style={{
              color: textColor,
              backgroundColor: bgColor,
              fontWeight: "bold",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              padding: "4px"
            }}>
              {params.value || "-"}
            </div>
          );
        }
      });
    });
  
    const groupedData = {};
    rawData.forEach(item => {
      const key = `${item.customer_name}-${item.project_name}-${item.Nos_of_projects}`;
  
      if (!groupedData[key]) {
        groupedData[key] = {
          id: key,
          customer_name: item.customer_name,
          project_name: item.project_name,
          Nos_of_projects: item.Nos_of_projects,
          status: item.status || "-" // Main status
        };
      }
  
      // Convert date format
      const dateObj = new Date(item.monthyear);
      const formattedMonth = dateObj.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  
      // Store description and status separately
      groupedData[key][formattedMonth] = item.point_description || "-";
      groupedData[key][`status_${formattedMonth}`] = item.status || "-";  // Store per-month status
    });
  
    return {
      columns: columnHeaders,
      rows: Object.values(groupedData)
    };
  };

  return (
    <Box m="40px">
      <Typography
        variant="h2"
        align="center"
        sx={{
          color: "white",
          padding: '15px',
          backgroundColor: '#64BDD1',
          fontWeight: "bold",
          fontSize: '25px',
          marginLeft: "60px"
        }}
      >
        Projects Event Data
      </Typography>

      <Box
        m="40px 0 0 60px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-columnHeaders": { 
            backgroundColor: colors.blueAccent[700], 
            fontSize: "15px", 
            fontWeight: "bold"
          },
          "& .MuiDataGrid-columnHeader": {
            borderRight: "2px solid #ddd"  // Adds vertical border between columns
          },
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid #ddd"  // Adds vertical border between data cells
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          '& .MuiDataGrid-footerContainer': { backgroundColor: "#64BDD1" }
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Allevent;
