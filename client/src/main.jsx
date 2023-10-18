import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App';


import UserContextProvider from "./context/UserContext"
import OperationsContextProvider from "./context/OperationsContext";
import PerfilProvider from './context/PerfilContext';



import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
  
    <BrowserRouter>
      <UserContextProvider>
        <PerfilProvider>
          <OperationsContextProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </OperationsContextProvider>
        </PerfilProvider>
      </UserContextProvider>
    </BrowserRouter>
  
  </React.StrictMode>
);
