import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import { AdminContextProvider } from './context/admin_context';
import { AuthContextProvider } from './context/auth_context';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router> {/* Wrap your App component with Router */}
    <AuthContextProvider>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </AuthContextProvider>
  </Router>,
  document.getElementById('root')
);
