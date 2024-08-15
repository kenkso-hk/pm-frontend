import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import { ComplexProvider } from './context/ComplexContext';
import App from './App';
import { ApplicationProvider } from './context/ApplicationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <UserProvider>
          <AuthProvider>
            <LoadingProvider>
              <ComplexProvider>
                <ApplicationProvider>
                  <App />
                </ApplicationProvider>
              </ComplexProvider>
            </LoadingProvider>
          </AuthProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
