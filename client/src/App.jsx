// src/App.js
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import MenuPage from './pages/MenuPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

const App = () => {
  const token = localStorage.getItem('token'); // Check if user is logged in

  return (
    <Routes>
      {/* Redirect to login if not authenticated, otherwise go to MenuPage */}
      <Route path="/" element={token ? <Navigate to="/menu" /> : <Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/menu" element={<MenuPage />} />

      {/* Protect Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
