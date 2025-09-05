import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from '@mui/system';
import { tokens } from '../theme';

const CustomerPhaseTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    customer_name: '',
    project_name: '',
    phase: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to the backend via POST request
    fetch('http://163.125.102.142:6500/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
        return response.json();
      })
      .then(data => {
        setSuccessMessage('Data submitted successfully');
        setErrorMessage('');
        // Clear form data after submission
        setFormData({ customer_name: '', project_name: '', phase: '' });
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        setErrorMessage('Failed to submit data');
        setSuccessMessage('');
      });
  };

  return (
    <Box width="100%" bgcolor={colors.whitebg[200]} borderRadius="10px" boxShadow="0 10px 10px rgba(10,0,0,0.1)" p={3}>
      <Typography variant="h5" gutterBottom>
        Add New Project Entry
      </Typography>

      {successMessage && <Typography color="green">{successMessage}</Typography>}
      {errorMessage && <Typography color="red">{errorMessage}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Customer Name"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Project Name"
          name="project_name"
          value={formData.project_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phase"
          name="phase"
          value={formData.phase}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CustomerPhaseTable;
