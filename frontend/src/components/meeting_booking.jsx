import { Box, Typography, Modal, Button, TextField,Select,MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Ensure Rsuite styles are applied
import { useNavigate } from "react-router-dom";

const BookingData = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState("");
  const [customername, setcustomername] = useState("");
  const [location, setlocation] = useState("");
  const [type, settype] = useState("");
  const [remark, setremark] = useState("");
  const [sno_id, setSnoId] = useState(null);
  const [bookings, setBookings] = useState([]); // Store submitted bookings
  

  // Fetch bookings from database
  const fetchBookings = async () => {
    try {
      const response = await fetch("http://163.125.102.142:6500/api/get_bookings");
      if (response.ok) {
        const data = await response.json();
        const formattedBookings = data.map((booking) => ({
          id: booking.id,
          details: booking.event,
          selectedDate: new Date(booking.date).toISOString().split("T")[0],
        }));
        setBookings(formattedBookings);
      } else {
        console.log("Failed to fetch bookings");
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const projectData = {
        id: sno_id,
        details: details,
        selectedDate: selectedDate,
        customername: customername,
        location: location,
        remark: remark,
        type: type,
      };

      const response = await fetch("http://163.125.102.142:6500/api/create_booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        fetchBookings();
        setDetails("");
        setSnoId(null);
        setSelectedDate(new Date());
        handleClose();
      } else {
        console.log("Failed to create booking");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleClose = () => setOpen(false);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const navigate = useNavigate();

  const handleBookingClick = (booking) => {
    navigate(`/Meeting_table`, { state: { booking } });
  };


  
  const renderCell = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const bookingsForDate = bookings.filter((b) => b.selectedDate === formattedDate);
  
    return bookingsForDate.length > 0 ? (
      <div
        style={{
          backgroundColor: "lightgreen",
          borderRadius: "8px",
          padding: "5px",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: "bold",
          color: "#000",
          minHeight: "40px",
          overflow: "hidden",
          cursor: "pointer", // Make it look clickable
        }}
        onClick={() => handleBookingClick(bookingsForDate[0])} // Navigate on click
      >
        {bookingsForDate.map((b, index) => (
          <div key={index}>{b.details}</div>
          
        ))}
      </div>
    ) : null;
  };
  

  return (
    <Box
      sx={{
        maxWidth: "100%",
        width: "100%",
        margin: "auto",
        padding: { xs: 2, sm: 4, md: 6, lg: 8 },
        textAlign: "center",
        ml: { xs: 0, sm: 5 }, // No margin left on extra small screens
        minHeight: "50vh",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", fontSize:"25px"}} gutterBottom>
  Meeting Booking Calendar
</Typography>
      <Calendar block onSelect={handleDateSelect} renderCell={renderCell} />
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Selected Date: {selectedDate.toDateString()}
      </Typography>

      {/* Modal for entering data */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 }, // Responsive modal width
            bgcolor: "white",
            p: 3,
            boxShadow: 24,
            borderRadius: 2,
          }}
        >

<Typography variant="body1" sx={{ marginTop: 2,fontWeight:"bold",textAlign:"center" }}>
         {selectedDate.toDateString()}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            Visit type
          </Typography>
          <Select
            fullWidth
            value={type}
            onChange={(e) => settype(e.target.value)}
            sx={{ mt: 2 }}
            required
          >
            <MenuItem value="PPAP Visit at Customer">PPAP Visit at Customer</MenuItem>
            <MenuItem value="Customer Visit at PPAP">Customer Visit at PPAP</MenuItem>
          </Select>

          <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            Customer Name
          </Typography>
          <Select
            fullWidth
            value={customername}
            onChange={(e) => setcustomername(e.target.value)}
            sx={{ mt: 2 }}
            required
          >
            <MenuItem value="MSIL">MSIL</MenuItem>
            <MenuItem value="HCIL">HCIL</MenuItem>
            <MenuItem value="EXICOM">EXICOM</MenuItem>
            <MenuItem value="SMIPL">SMIPL</MenuItem>
            <MenuItem value="TATA">TATA</MenuItem>
            <MenuItem value="SMG">SMG</MenuItem>
            <MenuItem value="Avinya Customer1">Avinya Customer1</MenuItem>
            <MenuItem value="Avinya Customer2">Avinya Customer2</MenuItem>
            <MenuItem value="Elpis Customer1">Elpis </MenuItem>
          </Select>

        
          <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            Location
          </Typography>
          <TextField
            type="location"
            fullWidth
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
          <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            Purpose of Visit
          </Typography>
          <TextField
            type="details"
            fullWidth
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
          <Typography variant="body1" sx={{ mt: 2, mb: -2, fontWeight: "bold" }}>
            Remarks
          </Typography>
          <TextField
            type="remark"
            fullWidth
            value={remark}
            onChange={(e) => setremark(e.target.value)}
            sx={{ mt: 2 }}
            required
          />
          <Button onClick={handleSubmit} type="submit" variant="contained" color="primary" sx={{ mt: 4 ,ml:2,mb:1}}>
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default BookingData;
