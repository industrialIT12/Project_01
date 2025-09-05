import React, { createContext, useContext, useState, useEffect } from 'react';
<<<<<<< HEAD
 
const AuthContext = createContext();
 
export const useAuth = () => {
  return React.useContext(AuthContext);
};
 
const AuthProvider = ({ children }) => {
  const [accessLevel, setAccessLevel] = useState(null);
  const [segmentType, setSegmentType] = useState("OEM"); // or "All", or any default
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = (level, segment) => {
    setAccessLevel(level);
    setSegmentType(segment); // SET
    setIsAuthenticated(true);
    localStorage.setItem('accessLevel', level);
    localStorage.setItem('segmentType', segment); // SET
    localStorage.setItem('isAuthenticated', 'true');
=======

const AuthContext = createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [accessLevel, setAccessLevel] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [timeoutId, setTimeoutId] = useState(null);

  // Function to start a timeout for automatic logout
  // const startInactivityTimeout = () => {
  //   if (timeoutId) {
  //     clearTimeout(timeoutId);
  //   }
    
  //   const id = setTimeout(() => {
  //     logout();
  //   }, 600000);
  //   setTimeoutId(id);
  // };

  const login = (level) => {
    setAccessLevel(level);
    setIsAuthenticated(true);
    localStorage.setItem('accessLevel', level);
    localStorage.setItem('isAuthenticated', 'true');
    // startInactivityTimeout();
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
  };

  const logout = () => {
    setAccessLevel(null);
<<<<<<< HEAD
    setSegmentType(null); // CLEAR
    setIsAuthenticated(false);
    localStorage.removeItem('accessLevel');
    localStorage.removeItem('segmentType'); // CLEAR
    localStorage.removeItem('isAuthenticated');
  };

  useEffect(() => {
    try {
      const storedAccessLevel = localStorage.getItem('accessLevel');
      const storedSegmentType = localStorage.getItem('segmentType'); // READ
      const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

      if (storedAccessLevel && storedIsAuthenticated) {
        setAccessLevel(storedAccessLevel);
        setSegmentType(storedSegmentType); // SET
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ accessLevel, segmentType, isAuthenticated, login, logout, loading }}>
=======
    setIsAuthenticated(false);
    localStorage.removeItem('accessLevel');
    localStorage.removeItem('isAuthenticated');
    // if (timeoutId) {
    //   clearTimeout(timeoutId);
    // }
  };

   useEffect(() => {
    // Check localStorage on component mount for persisted state
    const storedAccessLevel = localStorage.getItem('accessLevel');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedAccessLevel && storedIsAuthenticated) {
      setAccessLevel(storedAccessLevel);
      setIsAuthenticated(Boolean(storedIsAuthenticated));
    }
  }, []);

  // Reset timeout on user activity
  // useEffect(() => {
  //   const resetTimeout = () => startInactivityTimeout();

  //   window.addEventListener('mousemove', resetTimeout);
  //   window.addEventListener('keypress', resetTimeout);

  //   return () => {
  //     window.removeEventListener('mousemove', resetTimeout);
  //     window.removeEventListener('keypress', resetTimeout);
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [timeoutId]);

  return (
    <AuthContext.Provider value={{ accessLevel, isAuthenticated, login, logout }}>
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
      {children}
    </AuthContext.Provider>
  );
};

<<<<<<< HEAD
 
export default AuthProvider;
 
 
=======
export default AuthProvider;
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
