// src/components/PrivateRoute.js
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
