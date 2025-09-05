import React, { createContext, useContext, useState, useEffect } from 'react';

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
  };

  const logout = () => {
    setAccessLevel(null);
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
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
