import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../../utility/auth'

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
