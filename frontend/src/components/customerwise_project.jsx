import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const CustomerProjectChart = ({ selectedBusiness }) => {
    const [chartData, setChartData] = useState({ categories: [], series: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedBusiness || selectedBusiness.length === 0) return;

        axios.get(`http://163.125.102.142:6500/api/customer-projects?business=${selectedBusiness.join(",")}`)
            .then(response => {
                const customers = response.data.map(item => item.projects);
                const projectCounts = response.data.map(item => item.count);

                setChartData({
                    categories: customers,
                    series: [{ name: "Projects", data: projectCounts }]
                });
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError("Failed to load data");
                setLoading(false);
            });
    }, [selectedBusiness]);

    

    // Define unique colors for each customer
    const customerColors = [
        "#2596be", "#e28743", "#3357FF", "#abdbe3", "#37D68F", "#33FFF6", "#063970", "#FF8C33"
    ];

    return (
        <div style={{ width: "100%", maxWidth: "1000px", margin: "auto", padding: "10px" }}>
            <h2 style={{ textAlign: "center", fontSize: "1.5rem", marginBottom: "10px" }}>
            
            </h2>
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading...</p>
            ) : error ? (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : (
                <Chart 
                    options={{
                        chart: { type: "bar", toolbar: { show: false } },
                        xaxis: { categories: chartData.categories,
                         labels: {
                style: {
                  colors: ["#333"],
                  fontSize: "12px",
                whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                },
                formatter: (val) => val.length > 9 ? val.slice(0, 9) + '…' : val,
                rotate: 0,  // Keep labels horizontal
    trim: true,
    minHeight: 20,
    maxHeight: 50,
              },
              },
                        
                        yaxis: {
  labels: {
    formatter: (value) => Number(value.toFixed(0)), // Ensure integer values
  },
  tickAmount: Math.max(...chartData.series[0]?.data) || 5, // Set proper tick amount based on max value
  forceNiceScale: true, // Ensure evenly spaced ticks
},
                        colors: customerColors.slice(0, chartData.categories.length),
                        plotOptions: {
                            bar: { distributed: true }
                        },
                        grid: { show: false },
                        title: { text: "" },
                        responsive: [
                            {
                                breakpoint: 768,
                                options: {
                                    chart: { height: 300 },
                                    legend: { position: "bottom" },
                                }
                            },
                            {
                                breakpoint: 480,
                                options: {
                                    chart: { height: 250 },
                                    xaxis: { labels: { rotate: -45 } }
                                }
                            }
                        ]
                        
                    }}
                    series={chartData.series}
                    type="bar"
                    width="100%"
                    height="350"
                />
            )}
        </div>
    );
};

export default CustomerProjectChart;
