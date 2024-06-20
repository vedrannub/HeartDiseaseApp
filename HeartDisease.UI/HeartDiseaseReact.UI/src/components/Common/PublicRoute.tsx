import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../../utility/auth';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token && isTokenValid(token)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
