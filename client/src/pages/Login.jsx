// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://qr-menu-ya5b.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 max-w-md w-full">
        <h2 className="text-3xl mb-6 text-center font-semibold">Welcome Back</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:border-blue-500"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          className="border border-gray-300 rounded w-full p-2 mb-6 focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 w-full">
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
