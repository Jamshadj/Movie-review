import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 
  
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default ProtectedRoute;