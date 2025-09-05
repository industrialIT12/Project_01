import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const OpenConcern_Bar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://163.125.102.142:6500/api/openconcernbar?project_id=${id}`)
      .then((response) => response.json())
      .then((apiData) => {
        setData(apiData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ padding: 3 }}
    >
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <ResponsiveContainer width="95%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="responsibility" label={{ value: 'Responsibility', position: 'insideBottomRight', offset: -5 }} />
            <YAxis 
  label={{ value: 'Count', angle: -90, position: 'insideLeft' }} 
  tickFormatter={(value) => Math.round(value)}
  allowDecimals={false} // Ensures only whole numbers are shown
/>
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#0b9aa2" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default OpenConcern_Bar;
