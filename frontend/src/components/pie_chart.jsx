import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Pie_chart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0b9aa2', '#feca5a', '#cace77', '#FF8042'];

  useEffect(() => {
    fetch('http://163.125.102.142:6500/api/project_count')
      .then(response => response.json())
      .then(apiData => {
        const pieData = [
          { name: 'Injection Projects', value: apiData.inj || 0 },
          { name: 'Extrusion Projects', value: apiData.ext || 0 },
          { name: 'EPDM Projects', value: apiData.epdm || 0 },
        ];
        setData(pieData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ maxHeight: '450px', padding: 2 }}
    >
      {/* <Typography variant="h5" gutterBottom>
        Part Count
      </Typography> */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box sx={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius="95%"
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="right"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default Pie_chart;
