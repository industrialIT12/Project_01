import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '../context/AuthProvider';

const Business_PieChart = ({ onSelectBusiness }) => {
  const { accessLevel, segmentType } = useAuth();
  const isOEM = segmentType === "OEM";
  const isELPIS = segmentType === "ELPIS";
  const isAll = segmentType === "All";
  

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#1E88E5', '#FFC107', '#43A047', '#FF5722'];

  useEffect(() => {
    fetch('http://163.125.102.142:6500/api/businesspie')
      .then(response => response.json())
      .then(apiData => {
        // console.log("abc",segmentType,accessLevel);
        
        const allData = [
          { name: 'OEM', value: apiData.oem || 0 },
          { name: 'Avinya', value: apiData.avinya || 0 },
          { name: 'Elpis', value: apiData.elpis || 0 },
        ];

        let filteredData = [];

        if (segmentType === "OEM") {
          filteredData = allData.filter(item => item.name === 'OEM');
        } else if (segmentType === "All") {
          filteredData = allData;
        } else if (segmentType === "ELPIS") {
          filteredData = allData.filter(item => item.name === 'Elpis');
        } else if (segmentType === "AVINYA") {
          filteredData = allData.filter(item => item.name === 'Avinya');
        } else {
          // Handle other conditions or defaults
          filteredData = allData;
        }

        setData(filteredData);
        setLoading(false);
        onSelectBusiness(filteredData.map(item => item.name));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [segmentType]);

  const handleClick = (clickedData) => {
    if (clickedData) {
      onSelectBusiness([clickedData.name]);
    } else {
      onSelectBusiness(data.map(item => item.name));
    }
  };

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #ccc',
            padding: '8px',
            borderRadius: '4px',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {payload[0].name}
          </Typography>
          <Typography variant="body2">
            Value: {payload[0].value}
          </Typography>
        </Box>
      );
    }
    return null;
  };

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
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box sx={{ width: '100%', height: '100%' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius="50%"
                innerRadius="25%"
                fill="#8884d8"
                label={({ name, percent, value }) => `${name}:${value} (${(percent * 100).toFixed(0)}%)`}
                animationBegin={0}
                animationDuration={4000}
                animationEasing="ease-out"
                onClick={(data) => handleClick(data)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={renderCustomTooltip} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{ fontSize: '14px', marginBottom: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default Business_PieChart;
