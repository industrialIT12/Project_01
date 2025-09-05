import {
  Box,
  Typography,Button,TextField,Modal,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tokens } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
 
const Dev_details = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams(); // Get project ID from URL
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [sno_id, setsno_id] = useState();
  const [partname, setpartname] = useState();
  const [partno, setpartno] = useState();
  const [annualvol, setannualvol] = useState();
  const [firstpart, setfirstpart] = useState();
  const [designresp, setdesignresp] = useState();
  const [toolingresp, settoolingresp] = useState();
  const [mfglocation, setmfglocation] = useState();
  const [deleteId, setDeleteId] = useState(null);
const [deletePassword, setDeletePassword] = useState("");
const [deleteModalOpen, setDeleteModalOpen] = useState(false);
 
 
  useEffect(() => {
    if (id) {
      fetch(`http://163.125.102.142:6500/api/get_dev?project_id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = data.map((row,index) => ({
            ...row,
            Id2:index+1,
            first_part_submission: row.first_part_submission
              ? new Date(row.first_part_submission).toLocaleDateString('en-GB', {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).replace(/ /g, "-")
              : "N/A",
          }));
          setData(formattedData);
        })
        .catch((error) => console.error("Error fetching dev details:", error));
    }
  }, [id]);
 
  const handleClose = () => setOpen(false);
  const handleOpen = (id) => {
    setOpen(true);
    setsno_id(id);
  };
 
  const columns = [
    { field: "Id2", headerName: "SR. NO", flex: 0.2 },
    // { field: "id", headerName: "SR. NO", flex: 0.2 },
    { field: "part_name", headerName: "PART NAME", flex: 0.7 },
    { field: "part_no", headerName: "PART NUMBER", flex: 0.7 },
    { field: "annual_vol", headerName: "ANNUAL VOLUME", flex: 0.5 },
    { field: "first_part_submission", headerName: "FIRST PART SUBMISSION", flex: 0.5 },
    { field: "product_design_resp", headerName: "PRODUCT DESIGN RESP.", flex: 0.5 },
    { field: "tooling_resp", headerName: "TOOLING RESP.", flex: 0.5 },
    { field: "manufacturing_location", headerName: "MANUFACTURING LOCATION", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.3,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteId(params.row.id);
            setDeleteModalOpen(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
 
  const handleSubmit = async () => {
    try {
      const projectData = {
        project_id: id,
        id: sno_id,
        partname: partname,
        partno: partno,
        annualvol: annualvol,
        firstpart: firstpart,
        designresp: designresp,
        toolingresp: toolingresp,
        mfglocation: mfglocation,
      };
 
      const response = await fetch('http://163.125.102.142:6500/api/updatedev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });
 
      if (response.ok) {
        handleClose();
        console.log("Plan updated successfully");
      } else {
        console.log("Failed to update plan");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
 
 
  return (
    <Box m="20px ">
      <Typography variant="h4" color={colors.grey[100]} gutterBottom>
     
      </Typography>
      <Box
      m="0px 0 0 -10px"
        height="55vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
         
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id || row.part_no}
          components={{ Toolbar: GridToolbar }}
          onRowClick={(params) => {
            console.log("Clicked row:", params.row);
            handleOpen(params.row["id"]);
          }}
        />
      </Box>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box p={3} bgcolor="white" borderRadius={2} width="400px" mx="auto" mt="100px">
          <Typography variant="h6" id="modal-title">
            Update Development Details          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Part Name
          </Typography>
          <TextField
            fullWidth
            value={partname}
            onChange={(e) => setpartname(e.target.value)}
            sx={{ mt: 2 }}
          />
 
          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Part No.
          </Typography>
          <TextField
            fullWidth
            value={partno}
            onChange={(e) => setpartno(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Annual Volume
          </Typography>
          <TextField
            fullWidth
            value={annualvol}
            onChange={(e) => setannualvol(e.target.value)}
            sx={{ mt: 2 }}
          />
         <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <Typography variant="body1" sx={{ mt: 2, mb: 0 }}>
                       First Part Submission
                     </Typography>
                     <DesktopDatePicker
                       value={firstpart}
                       onChange={(newValue) => setfirstpart(newValue)}
                       renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} />}
                     />
                   </LocalizationProvider>
 
          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Product Design Responsibility
          </Typography>
          <TextField
            fullWidth
            value={designresp}
            onChange={(e) => setdesignresp(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Tooling Responsibility
          </Typography>
          <TextField
            fullWidth
            value={toolingresp}
            onChange={(e) => settoolingresp(e.target.value)}
            sx={{ mt: 2 }}
          />
 
          <Typography variant="body1" sx={{ mt: 2, mb: -2 }}>
            Manufacturing Location
          </Typography>
          <TextField
            fullWidth
            value={mfglocation}
            onChange={(e) => setmfglocation(e.target.value)}
            sx={{ mt: 2 }}
          />
         
         
 
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
 
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
  <Box p={3} bgcolor="white" borderRadius={2} width="400px" mx="auto" mt="150px">
    <Typography variant="h6" gutterBottom>Confirm Delete</Typography>
    <Typography variant="body1" gutterBottom>Enter password to confirm deletion:</Typography>
    <TextField
      fullWidth
      type="password"
      value={deletePassword}
      onChange={(e) => setDeletePassword(e.target.value)}
      sx={{ mt: 2 }}
    />
    <Box display="flex" justifyContent="flex-end" mt={3}>
      <Button onClick={() => setDeleteModalOpen(false)} sx={{ mr: 2 }}>Cancel</Button>
      <Button
        variant="contained"
        color="error"
        onClick={async () => {
          if (deletePassword === "1234") { // you can change this to a secure method
            try {
              const response = await fetch(`http://163.125.102.142:6500/api/deletedev/${deleteId}`, {
                method: 'DELETE',
              });
              if (response.ok) {
                setData((prev) => prev.filter((item) => item.id !== deleteId));
                setDeleteModalOpen(false);
                setDeletePassword("");
              } else {
                alert("Failed to delete.");
              }
            } catch (err) {
              console.error("Delete error:", err);
            }
          } else {
            alert("Incorrect password!");
          }
        }}
      >
        Delete
      </Button>
    </Box>
  </Box>
</Modal>
    </Box>
  );
};
 
export default Dev_details;