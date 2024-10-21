import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); 
  
  // If authenticated, redirect to homepage, else render the children (i.e., SignIn or SignUp)
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default ProtectedRoute;
