// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'; // Assuming you have this component
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import MenuPage from './pages/MenuPage';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } 
      />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* Redirect or handle other routes as needed */}
    </Routes>
  );
};

export default App;
