import React from 'react';
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import HelloPage from './components/hello';


function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const hideSidebarPaths = ["/pmques", "/qrscan"];
  const hideTopbarPaths = ["/qrscan"];

  const showSidebar = !hideSidebarPaths.includes(location.pathname);
  const showTopbar = !hideTopbarPaths.includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
            <Routes>
              <Route path="/" element={<HelloPage />} />
            </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;