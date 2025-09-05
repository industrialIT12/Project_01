import React, { createContext, useContext, useState, useEffect } from 'react';
 
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
  };

  const logout = () => {
    setAccessLevel(null);
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
      {children}
    </AuthContext.Provider>
  );
};

 
export default AuthProvider;
 
 