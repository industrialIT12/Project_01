import { Box, FormControl, InputLabel, Input, MenuItem, Select, Button,  Modal, TextField, Typography } from "@mui/material";
import { useState, useEffect, react } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const Prod_plans = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([dayjs().startOf('month'), dayjs()]);
  const [shift, setShift] = useState('A');
  const [area, setArea] = useState('Line 8');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState('');
  const [target, setTarget] = useState('');
  const [model, setmodel] = useState('');
  const [partna, setpartna] = useState('');
  const [date, setdate] = useState(null);
  const [time, settime] = useState(null);
  const [model2, setmodel2] = useState('');
  const [partna2, setpartna2] = useState('');
  const [partno, setpartno] = useState('');
  const [target_qty, settarget_qty] = useState('');
  const [plan_qty, setplan_qty] = useState('');
  const [operator_name, setoperator_name] = useState('');
  const [supervisor_name, setsupervisor_name] = useState('');
  const [status2, setstatus2] = useState('');


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://163.125.102.206:5000/api/update_plan2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: selectedId,
          status: status,
          target: target,
          model: model,
          partna: partna,
        }),
      });

      if (response.ok) {
        handleClose();
        console.log("Plan updated successfully");
      } else {
        console.error("Failed to update plan");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit2 = async () => {
    try {
      const response = await fetch('http://163.125.101.206:5000/api/add_plan2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          time: time,
          model: model2,
          partna: partna2,
          partno: partno,
          target_qty: target_qty,
          plan_qty: plan_qty,
          operator_name: operator_name,
          supervisor_name: supervisor_name,
          status: status2
        }),
      });

      if (response.ok) {
        handleClose2();
        console.log("Plan updated successfully");
      } else {
        console.error("Failed to update plan");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpen = (id) => {
    setOpen(true);
    setSelectedId(id);
  };
  const handleOpen2 = (id) => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = dateRange[0].format('YYYY-MM-DD');
        const endDate = dateRange[1].format('YYYY-MM-DD');
  
        const response = await fetch(`http://163.125.101.206:5000/api/prod_plans?start_date=${startDate}&end_date=${endDate}&shift=${shift}&area=${area}`);
        const result = await response.json();
  
        const transformedData = result.map((item, index) => ({
          id: index,
          Date: item.Date,
          Time: item.Time,
          'Plan ID': item['Plan ID'],
          'Part Name': item['Part Name'],
          'Part Number': item['Part Number'],
          'Target Quantity': item['Target Quantity'],
          'Plan Quantity': item['Plan Quantity'],
          Model: item.Model,
          Status: item.Status,
          'Type 1': item['Type 1'],
          'Downtime 1 Duration': item['Downtime 1 Duration'],
          'Type 2': item['Type 2'],
          'Downtime 2 Duration': item['Downtime 2 Duration'],
          'Type 3': item['Type 3'],
          'Downtime 3 Duration': item['Downtime 3 Duration'],
          'Type 4': item['Type 4'],
          'Downtime 4 Duration': item['Downtime 4 Duration'],
          'Type 5': item['Type 5'],
          'Downtime 5 Duration': item['Downtime 5 Duration']
        }));
  
        setData(transformedData);
        console.log(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [dateRange, shift, area]);

  const handleShiftChange = (event) => {
    setShift(event.target.value);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const columns = [
    { field: "Date", headerName: "Date", headerAlign: "left", align: "left", flex: 0.7 },
    { field: "Time", headerName: "Time", headerAlign: "left", align: "left", flex: 0.7 },
    { field: "Plan ID", headerName: "Plan ID", flex: 0.5 },
    { field: "Part Name", headerName: "Part Name", flex: 0.7 },
    { field: "Part Number", headerName: "Part Number", flex: 0.7 },
    { field: "Target Quantity", headerName: "Target Quantity", flex: 0.7 },
    { field: "Plan Quantity", headerName: "Plan Quantity", flex: 0.7 },
    { field: "Model", headerName: "Model", flex: 0.5 },
    { field: "Status", headerName: "Status", flex: 0.7 }
  ];

  const downloadCSV = () => {
    const columnOrder = [
      "Date", "Time", "Plan ID", "Part Name", "Part Number",
      "Target Quantity", "Plan Quantity", "Model"
    ];
  
    const orderedData = data.map(row =>
      columnOrder.reduce((acc, col) => {
        acc[col] = row[col] || ''; // Default to empty string if value is undefined
        return acc;
      }, {})
    );
  
    const csv = Papa.unparse(orderedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'report.csv';
    link.click();
  };
  
  

  const downloadExcel = () => {
    const columnOrder = [
      "Date", "Time", "Plan ID", "Part Name", "Part Number",
      "Target Quantity", "Plan Quantity", "Model"
    ];
  
    const orderedData = data.map(row =>
      columnOrder.reduce((acc, col) => {
        acc[col] = row[col] || ''; // Default to empty string if value is undefined
        return acc;
      }, {})
    );
  
    const ws = XLSX.utils.json_to_sheet(orderedData, { header: columnOrder });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'report.xlsx');
  };

  return (
    <Box m="20px">
      
      
      <Box mb="25px" display="flex" justifyContent="left" alignItems="center" gap="10px">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ width: 250, padding: 1 }}>
            <DateRangePicker
              startText="Start"
              endText="End"
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <TextField {...endProps} />
                </>
              )}
            />
          </Box>
        </LocalizationProvider>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel sx={{ ml: 2.5 }}>Shift</InputLabel>
          <Select
            value={shift}
            onChange={handleShiftChange}
            label="Shift"
            sx={{ height: "52px", ml: "20px", mr: "20px", border: "none" }}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Area</InputLabel>
          <Select
            value={area}
            onChange={handleAreaChange}
            label="Area"
            sx={{ height: "52px" }}
          >
            <MenuItem value="Line 1">Line 1</MenuItem>
            <MenuItem value="Line 2">Line 2</MenuItem>
            <MenuItem value="Line 3">Line 3</MenuItem>
            <MenuItem value="Line 4">Line 4</MenuItem>
            <MenuItem value="Line 5">Line 5</MenuItem>
            <MenuItem value="Line 6">Line 6</MenuItem>
            <MenuItem value="Line 8">Line 8</MenuItem>
          </Select>
        </FormControl>

        <Box ml="20px">
          <Button variant="contained" color="secondary" onClick={(params2) => handleOpen2()} sx={{ ml: 75 }}>
            Add New Plan
          </Button>
          <Button variant="contained" color="secondary" onClick={downloadCSV} sx={{ ml: 2 }}>
            Download CSV
          </Button>
          <Button variant="contained" color="secondary" onClick={downloadExcel} sx={{ ml: 2 }}>
            Download Excel
          </Button>
        </Box>
      </Box>

      <Box m="40px 0 0 0" height="75vh" sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(params) => handleOpen(params.row['Plan ID'])}
        />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Form for Plan ID: {selectedId}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Status</Typography>
          <Select
            label="Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Model</Typography>
          <Select
            label="Model"
            fullWidth
            value={model}
            onChange={(e) => setmodel(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="800L">800L</MenuItem>
            <MenuItem value="613T">613T</MenuItem>
            <MenuItem value="YJC">YJC</MenuItem>
            <MenuItem value="YCA">YCA</MenuItem>
            <MenuItem value="YHB">YHB</MenuItem>
            <MenuItem value="Y1K">Y1K</MenuItem>
            <MenuItem value="2TG">2TG</MenuItem>
            <MenuItem value="YAD">YAD</MenuItem>
            <MenuItem value="YL1">YL1</MenuItem>
            <MenuItem value="X445">X445</MenuItem>
            <MenuItem value="YL8">YL8</MenuItem>
            <MenuItem value="I10">I10</MenuItem>
            <MenuItem value="BOLERO">BOLERO</MenuItem>
            <MenuItem value="YE3">YE3</MenuItem>
            <MenuItem value="YL7">YL7</MenuItem>
            <MenuItem value="YP8">YP8</MenuItem>
            <MenuItem value="2WF">2WF</MenuItem>
            <MenuItem value="2CT">2CT</MenuItem>
            <MenuItem value="ALTO">ALTO</MenuItem>
            <MenuItem value="SCORPIO">SCORPIO</MenuItem>
            <MenuItem value="YOM">YOM</MenuItem>
            <MenuItem value="ZS11">ZS11</MenuItem>
            <MenuItem value="YWD">YWD</MenuItem>
            <MenuItem value="31XA">31XA</MenuItem>
            <MenuItem value="Curvv">Curvv</MenuItem>
            
          </Select>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Part Name</Typography>
          <Select
            label="Part Name"
            fullWidth
            value={partna}
            onChange={(e) => setpartna(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="W/S Inner FR">W/S Inner FR</MenuItem>
            <MenuItem value="W/S Inner RR">W/S Inner RR</MenuItem>
            <MenuItem value="W/S Outer FR">W/S Outer FR</MenuItem>
            <MenuItem value="W/S Outer RR">W/S Outer RR</MenuItem>
            <MenuItem value="Insert FR">Insert FR</MenuItem>
            <MenuItem value="Insert RR">Insert RR</MenuItem>
            <MenuItem value="GRC FR">GRC FR</MenuItem>
            <MenuItem value="GRC RR">GRC RR</MenuItem>
          </Select>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Target</Typography>
          <TextField
            label="Target"
            fullWidth
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            sx={{ mt: 2 }}
          />
          {/* Add more form fields as needed */}
          <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 3 }}>
            Submit
          </Button>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '0px solid #000',
          boxShadow: 24,
          height:'80%',
          p: 4,
          borderRadius:'10px',
          overflowY: 'auto', 
          overflowX: 'auto',
          scrollbarColor: '#000 #ffffff', 
          '&::-webkit-scrollbar': {
            width: '5px', 
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#000', 
            borderRadius: '10px', 
          },
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Add New Plan
          </Typography>
          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="body1" sx={{ mt: 2, mb:0}}>Date</Typography>
              <DesktopDatePicker
                value={date}
                onChange={(newValue) => setdate(newValue)}
                renderInput={(params) => <TextField  sx={{ mb: 2 }} {...params} />}
              />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography variant="body1" sx={{ mt: 2, mb:0}}>Time</Typography>
              <MobileTimePicker
                value={time}
                onChange={(newValue) => settime(newValue)}
                renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
              />
          </LocalizationProvider>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Model</Typography>
          <Select
            fullWidth
            value={model2}
            onChange={(e) => setmodel2(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="800L">800L</MenuItem>
            <MenuItem value="613T">613T</MenuItem>
            <MenuItem value="YJC">YJC</MenuItem>
            <MenuItem value="YCA">YCA</MenuItem>
            <MenuItem value="YHB">YHB</MenuItem>
            <MenuItem value="Y1K">Y1K</MenuItem>
            <MenuItem value="2TG">2TG</MenuItem>
            <MenuItem value="YAD">YAD</MenuItem>
            <MenuItem value="YL1">YL1</MenuItem>
            <MenuItem value="X445">X445</MenuItem>
            <MenuItem value="YL8">YL8</MenuItem>
            <MenuItem value="I10">I10</MenuItem>
            <MenuItem value="BOLERO">BOLERO</MenuItem>
            <MenuItem value="YE3">YE3</MenuItem>
            <MenuItem value="YL7">YL7</MenuItem>
            <MenuItem value="YP8">YP8</MenuItem>
            <MenuItem value="2WF">2WF</MenuItem>
            <MenuItem value="2CT">2CT</MenuItem>
            <MenuItem value="ALTO">ALTO</MenuItem>
            <MenuItem value="SCORPIO">SCORPIO</MenuItem>
            <MenuItem value="YOM">YOM</MenuItem>
            <MenuItem value="ZS11">ZS11</MenuItem>
            <MenuItem value="YWD">YWD</MenuItem>
            <MenuItem value="31XA">31XA</MenuItem>
            <MenuItem value="Curvv">Curvv</MenuItem>
          </Select>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Part Name</Typography>
          <Select
            fullWidth
            value={partna2}
            onChange={(e) => setpartna2(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="W/S Inner FR">W/S Inner FR</MenuItem>
            <MenuItem value="W/S Inner RR">W/S Inner RR</MenuItem>
            <MenuItem value="W/S Outer FR">W/S Outer FR</MenuItem>
            <MenuItem value="W/S Outer RR">W/S Outer RR</MenuItem>
            <MenuItem value="Insert FR">Insert FR</MenuItem>
            <MenuItem value="Insert RR">Insert RR</MenuItem>
            <MenuItem value="GRC FR">GRC FR</MenuItem>
            <MenuItem value="GRC RR">GRC RR</MenuItem>
          </Select>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Part Number</Typography>
          <TextField
            fullWidth
            value={partno}
            onChange={(e) => setpartno(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Target Quantity</Typography>
          <TextField
            fullWidth
            value={target_qty}
            onChange={(e) => settarget_qty(e.target.value)}
            sx={{ mt: 2 }}
            type="number"
          />
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Planned Quantity</Typography>
          <TextField
            fullWidth
            value={plan_qty}
            onChange={(e) => setplan_qty(e.target.value)}
            sx={{ mt: 2 }}
            type="number"
          />
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Supervisor Name</Typography>
          <Select
            fullWidth
            value={supervisor_name}
            onChange={(e) => setsupervisor_name(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Srichand">Srichand</MenuItem>
            <MenuItem value="Neeraj">Neeraj</MenuItem>
            <MenuItem value="Narendra">Narendra</MenuItem>
          </Select>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Operator Name</Typography>
          <Select
            fullWidth
            value={operator_name}
            onChange={(e) => setoperator_name(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="Dinesh">Dinesh</MenuItem>
            <MenuItem value="Kaptan">Kaptan</MenuItem>
            <MenuItem value="Brahma">Brahma</MenuItem>
          </Select>
          <Typography variant="body1" sx={{ mt: 2, mb:-2 }}>Status</Typography>
          <Select
            fullWidth
            value={status2}
            onChange={(e) => setstatus2(e.target.value)}
            sx={{ mt: 2 }}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
          <Button onClick={handleSubmit2} variant="contained" color="primary" sx={{ mt: 3 }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Prod_plans;
