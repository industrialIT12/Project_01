import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Typography, Tooltip, Button } from "@mui/material";
import { useTheme } from '@mui/system';
import { tokens } from '../theme';
import { Link } from 'react-router-dom';  // Import Link from React Router

const CustomerPhaseTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [phaseData, setPhaseData] = useState([]);
  const [error, setError] = useState(null);
  const [highlightedProject, setHighlightedProject] = useState('');
  const [selectedProject, setSelectedProject] = useState(null); // Track the selected project

  const groupByCustomer = (data) => {
    const groupedData = {};
    data.forEach((row) => {
      if (!groupedData[row.customer_name]) {
        groupedData[row.customer_name] = {
          customer_name: row.customer_name,
          projects: []
        };
      }
      groupedData[row.customer_name].projects.push({
        project_name: row.project_name,
        phase: row.phase,
        id: row.id
      });
    });
    return Object.values(groupedData);
  };

  const colorsfuc = (phase) => {
    switch(phase) {
      case 1:
        return 'rgba(54, 162, 235, 0.5)';  // Color for phase 1
      case 2:
        return 'rgba(75, 192, 192, 0.5)';  // Color for phase 2
      case 3:
        return 'rgba(255, 206, 86, 0.5)';  // Color for phase 3
      case 4:
        return 'rgb(0, 191, 191)';  // Color for phase 4
      case 5:
        return 'rgba(255, 159, 64, 0.5)';  // Color for phase 5
      default:
        return colors.grey[400];  // Default color for any other phase
    }
  };

  const handleProjectClick = (projectName) => {
    setSelectedProject(projectName); // Set the selected project
    setHighlightedProject(projectName);
  };

  useEffect(() => {
    fetch('http://163.125.102.142:6500/details')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const groupedData = groupByCustomer(data);
        setPhaseData(groupedData);
      })
      .catch(error => {
        setError(error);
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderPhaseProjects = (projects, phase) => {
    return projects.filter(project => project.phase === phase).map((project, index) => (
      <Tooltip key={index} title={project.project_name}>
        <Link to={`/project/${project.project_name}/${project.id}`} style={{ textDecoration: 'none' }}>
          <Typography
            onClick={() => handleProjectClick(project.project_name)}
            style={{
              cursor: 'pointer',
              color: project.project_name === highlightedProject ? colors.grey[900] : colors.grey[100],
              fontWeight: project.project_name === highlightedProject ? 'bold' : 'normal',
              backgroundColor: colorsfuc(phase),  // Use color based on phase
              borderRadius: '0px',
              padding: '11px 12px',
              border: project.project_name === highlightedProject ? `2px solid ${colors.primary[600]}` : 'none',
              transition: 'background-color 0.3s, border 0.3s',  // Add transition effect
            }}
          >
            {project.project_name}
          </Typography>
        </Link>
      </Tooltip>
    ));
  };

  const renderProjectDetails = () => {
    return (
      <Box>
        <Typography variant="h5">Project: {selectedProject}</Typography>
        {/* Add detailed project information here */}
        <Button
          variant="contained"
          onClick={() => setSelectedProject(null)}  // Clear the selected project to go back to full table
          style={{ marginTop: '20px', borderRadius:"10px"}}
        >
          Back to All Projects
        </Button>
      </Box>
    );
  };

  return (
    <Box 
  width="100%" 
  bgcolor={colors.whitebg[200]} 
  borderRadius="40px" 
  boxShadow="0px 5px 15px rgba(0, 0, 0, 0.3)"
>
  {error && <Typography color="red">Error fetching data: {error.message}</Typography>}
  {selectedProject ? (
    renderProjectDetails()  // Show project details if a project is selected
  ) : phaseData.length === 0 ? (
    <Typography color={colors.grey[100]}>No data available.</Typography>
  ) : (
    <Box overflow="auto" borderRadius='40px' boxShadow="10px">
      <Table
        sx={{
          minWidth: 650,
          borderCollapse: "separate",
          borderSpacing: "0 5px",
          "& thead th": {
            backgroundColor: colors.whitebg[200],
            color: colors.grey[100],
            fontWeight: 'bold',
            fontSize: '15px',
            textAlign: 'center',
            padding: '12px 8px',
          },
          "& tbody tr": {
            backgroundColor: colors.whitebg[200],
            transition: "box-shadow 0.3s",
            "&:hover": {
              backgroundColor: colors.whitebg[200],
              boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.15)",
            },
          },
          "& tbody td": {
            padding: '10px 20px',
            textAlign: 'center',
            color: colors.grey[100],
            fontSize: '15px',
            fontWeight: 'bold',
            borderBottom: '10px',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>Phase 1</TableCell>
            <TableCell>Phase 2</TableCell>
            <TableCell>Phase 3</TableCell>
            <TableCell>Phase 4</TableCell>
            <TableCell>Phase 5</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {phaseData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{row.customer_name}</TableCell>
              {/* Render projects for each phase */}
              <TableCell>{renderPhaseProjects(row.projects, 1)}</TableCell>
              <TableCell>{renderPhaseProjects(row.projects, 2)}</TableCell>
              <TableCell>{renderPhaseProjects(row.projects, 3)}</TableCell>
              <TableCell>{renderPhaseProjects(row.projects, 4)}</TableCell>
              <TableCell>{renderPhaseProjects(row.projects, 5)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )}
</Box>

  );
};

export default CustomerPhaseTable;
