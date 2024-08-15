import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('JWT'));

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('JWT', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('JWT');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('JWT');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const expiry = decodedToken.exp * 1000;
      if (Date.now() >= expiry) {
        logout();
        setIsAuthenticated(false);
      }else{
        setIsAuthenticated(true);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("setInterval");
      const token = localStorage.getItem('JWT');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.exp * 1000 < Date.now()) {
          logout();
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
