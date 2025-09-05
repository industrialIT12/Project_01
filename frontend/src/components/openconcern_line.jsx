import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const OpenConcern_Line = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://163.125.102.142:6500/api/openconcernline?project_id=${id}`)
      .then((response) => response.json())
      .then((apiData) => {
        // Assuming apiData contains "open" and "close" concern data with corresponding count
        // Mapping open and close concerns into separate arrays if necessary, otherwise directly use apiData
        const formattedData = apiData.map(item => ({
          responsibility: item.responsibility,
          openCount: item.open_count,   // assuming open_count field for open concerns
          closeCount: item.close_count // assuming close_count field for closed concerns
        }));
        setData(formattedData);
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
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="responsibility" label={{ value: 'Responsibility', position: 'insideBottomRight', offset: -5 }} />
            <YAxis 
  label={{ value: 'Count', angle: -90, position: 'insideLeft' }} 
  tickFormatter={(value) => Math.round(value)}
  allowDecimals={false} // Ensures only whole numbers are shown
/>
            <Tooltip />
            <Legend />
            {/* Line for open concerns */}
            <Line type="monotone" dataKey="openCount" stroke="#0b9aa2" activeDot={{ r: 8 }} name="Open" />
            {/* Line for close concerns */}
            <Line type="monotone" dataKey="closeCount" stroke="#ff6347" activeDot={{ r: 8 }} name="Close" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default OpenConcern_Line;
