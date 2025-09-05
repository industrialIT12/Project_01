import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment'; // Import moment.js

const GanttChart = ({ project_id }) => {
  const [series, setSeries] = useState([]);
  const [chartHeight, setChartHeight] = useState(450);  // Initial height for the chart
  const chartContainerRef = useRef(null);  // Ref for the container

  // Improved date formatter with error handling
  const formatDate = (dateStr) => {
    const date = moment(dateStr);  // Use moment.js to handle the date
    if (date.isValid()) {
      return date.valueOf();  // Return timestamp
    } else {
      console.error("Invalid date:", dateStr); // Log invalid date
      return null;  // Return null for invalid date
    }
  };

  // Resize the chart dynamically based on container size
  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        const containerHeight = chartContainerRef.current.clientHeight;
        setChartHeight(containerHeight);  // Update chart height based on container height
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();  // Call once to initialize height

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for project_id:", project_id); // Debug log
        const response = await fetch(`http://163.125.102.142:6500/details`);
        const data = await response.json();
        console.log("API Data:", data);

        const formattedTasks = data.map(task => {
          const start = formatDate(task.start_date);  // Convert start_date
          const end = formatDate(task.end_date);  // Convert end_date

          if (start && end) {  // Ensure both start and end are valid
            return {
              x: task.project_name,  // Use project_name or task_name as task label
              y: [start, end],  // Add valid start and end dates
            };
          } else {
            console.warn(`Skipping task due to invalid dates: ${task.project_name}`);
            return null;  // Skip invalid tasks
          }
        }).filter(task => task !== null);  // Filter out null tasks

        setSeries([{ name: 'Project Tasks', data: formattedTasks }]);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [project_id]);

  const options = {
    chart: {
      type: 'rangeBar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      type: 'datetime', // Makes the x-axis display time
      labels: {
        formatter: (value) => {
          try {
            if (isNaN(value)) {
              console.error("Invalid value for x-axis label formatter:", value);
              return "Invalid Date"; // Fallback label
            }

            const date = new Date(value);
            if (isNaN(date.getTime())) {
              console.error("Invalid date in formatter:", value);
              return "Invalid Date";
            }

            const options = { year: '2-digit', month: 'short' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
          } catch (error) {
            console.error("Error formatting date:", error, "Value:", value);
            return "Error"; // Fallback in case of unexpected issues
          }
        }
      },
    },
    title: {
      text: 'Project Timeline',
      align: 'center',
      style: { fontSize: '16px', fontWeight: 'bold' },
    },
  };

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }}>
      <Chart
        options={options}
        series={series}
        type="rangeBar"
        height={chartHeight}  // Dynamically adjust the height based on the container
        width="100%"  // Ensure the chart takes full width of the container
      />
    </div>
  );
};

export default GanttChart;
