import React from 'react';
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Details from './components/main_component';
import Sidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar'; 
import TableComponent from './components/project_list';
import Dashboard from './components/project_dash';
import Dev_details from './components/dev_details';
import ProjectTimeline from './components/Multi_series';
import TimelineChart from './components/Multi_series';
import GanttChart from './components/Multi_series';
import Eventdata from './components/Event_data';
import LoginPage from './components/Login';
import { useAuth } from './context/AuthProvider';
import AllMOM from './components/allmompoints';
import User from './components/userdata_table';
import Allevent from './components/alleventpoints';
import BookingData from './components/meeting_booking';
import MeetingTable from './components/meetingdatatable';
import UserTable from './components/digital_twin';
import Mastertable from './components/masterTable';
import HelloPage from './components/hello'; // from GitHub version

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/login';

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isLoginPage && <Sidebar />}
          <main className="content">
            {!isLoginPage && <Topbar />}
            <Routes>
              <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path="/home" element={isAuthenticated ? <Details /> : <Navigate to="/login" />} />
              <Route path="/project/:projectName/:id" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/test" element={isAuthenticated ? <Dev_details /> : <Navigate to="/login" />} />
              <Route path="/test2" element={isAuthenticated ? <TableComponent /> : <Navigate to="/login" />} />
              <Route path="/mom" element={isAuthenticated ? <AllMOM /> : <Navigate to="/login" />} />
              <Route path="/Event" element={isAuthenticated ? <Allevent /> : <Navigate to="/login" />} />
              <Route path="/Digitaltwin" element={isAuthenticated ? <User /> : <Navigate to="/login" />} />
              <Route path="/Booking" element={isAuthenticated ? <BookingData /> : <Navigate to="/login" />} />
              <Route path="/Meeting_table" element={isAuthenticated ? <MeetingTable /> : <Navigate to="/login" />} />
              <Route path="/Digitaltwin1" element={isAuthenticated ? <UserTable /> : <Navigate to="/login" />} />
              <Route path="/master" element={isAuthenticated ? <Mastertable /> : <Navigate to="/login" />} />

              {/* From GitHub version */}
              <Route path="/hello" element={<HelloPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
