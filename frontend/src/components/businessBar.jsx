import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Box, Typography, useTheme } from "@mui/material";

const BusinessBarChart = ({ selectedBusiness }) => {
  const [chartData, setChartData] = useState({ categories: [], series: [] });
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetch("http://163.125.102.142:6500/api/businesssegment")
      .then((response) => response.json())
      .then((apiData) => {
        const allCategories = ["OEM", "Avinya", "Elpis"]; // Keep original order
        const series = [
          {
            name: "Injection",
            data: [apiData.inj_oem || 0, apiData.inj_avinya || 0, apiData.inj_elpis || 0],
          },
          {
            name: "Extrusion",
            data: [apiData.ext_oem || 0, apiData.ext_avinya || 0, apiData.ext_elpis || 0],
          },
          {
            name: "EPDM",
            data: [apiData.epdm_oem || 0, apiData.epdm_avinya || 0, apiData.epdm_elpis || 0],
          },
        ];

        setChartData({ categories: allCategories, series });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [selectedBusiness]);

  // Ensure categories appear in original order
  const filteredCategories = selectedBusiness
    ? chartData.categories.filter((cat) => selectedBusiness.includes(cat))
    : chartData.categories;

  // Map selected categories to their original indexes for reordering
  const categoryIndexes = chartData.categories.reduce((acc, cat, index) => {
    acc[cat] = index;
    return acc;
  }, {});

  // Sort the categories based on their original positions
  filteredCategories.sort((a, b) => categoryIndexes[a] - categoryIndexes[b]);

  // Reorder series data based on sorted categories
  const filteredSeries = chartData.series.map((s) => ({
    name: s.name,
    data: filteredCategories.map((cat) => {
      const originalIndex = chartData.categories.indexOf(cat);
      return s.data[originalIndex];
    }),
  }));

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ maxHeight: "100%", flexGrow: 1, padding: 2 }}
    >
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
          <Chart
            options={{
              chart: { type: "bar", toolbar: { show: false }, responsive: true },
              xaxis: { categories: filteredCategories }, // Correctly ordered categories
              yaxis: {
  labels: {
    formatter: (value) => Number(value.toFixed(0)), // Ensure integer values
  },
  tickAmount: Math.max(...filteredSeries.flatMap((s) => s.data)), // Dynamically set tick amount
  forceNiceScale: true, // Ensures proper spacing
},
              plotOptions: { bar: { horizontal: false, columnWidth: "100%" } },
              dataLabels: { enabled: true },
              colors: ["#1E88E5", "#FFC107", "#43A047"],
              legend: { position: "bottom" },
              grid: { show: false },
            }}
            series={filteredSeries}
            type="bar"
            width="200%"
            height="100%"
          />
        </Box>
      )}
    </Box>
  );
};

export default BusinessBarChart;
