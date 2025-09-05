import React, { useState, useEffect} from 'react';
import { Box, Typography } from '@mui/material';

const Inj_Count = () => {
  const [extParts, setExtPartCount] = useState(0);  // Initialize with 0 to avoid undefined
  const [loading, setLoading] = useState(true);  // Add loading state to track fetch status

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://163.125.102.142:6500/api/project_count')
      .then(response => response.json())
      .then(data => {
        
        setExtPartCount(data.inj || 0);  // Set extParts with fetched data
        setLoading(false);  // Data fetched, so set loading to false
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);  // If there’s an error, stop loading
      });
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  
  return (
        <Box fontSize="40px" fontWeight="Bold">
          {loading ? 'Loading...' : extParts}  
        </Box>
  );
};



export default Inj_Count;
