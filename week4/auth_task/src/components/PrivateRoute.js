import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useAuth } from './authcontext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes> 
      <Route
        {...rest}
        element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default PrivateRoute;
