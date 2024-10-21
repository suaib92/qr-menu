// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    try {
      const response = await fetch('https://qr-menu-ya5b.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Optionally show success message here (e.g., a toast notification)
        alert('Signup successful! Please log in.'); // Simple alert as feedback
        navigate('/login'); // Redirect to login after signup
      } else {
        const data = await response.json();
        setError(data.error || 'Signup failed');
      }
    } catch (error) {
      setError('Error signing up. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after request is done
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 py-6 max-w-md w-full">
        <h2 className="text-3xl mb-6 text-center font-semibold">Create an Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {/* New Name Input */}
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          onChange={handleChange} 
          required 
          className="border border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:border-blue-500"
        />
        
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
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 w-full" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
        <p className="mt-4 text-center text-sm">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
