// src/pages/MenuPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null); // To capture and display errors
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem('token'); // Check if user is logged in

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('https://qr-menu-ya5b.onrender.com/api/menu');
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      console.log(data); // Verify data structure
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError('Failed to load menu. Please try again later.');
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6 md:mb-8 text-gray-800">
        Our Menu
      </h1>

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {menuItems.length === 0 && !error ? (
        <p className="text-center text-gray-600">Loading menu items...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <h2 className="text-lg font-bold mb-2 text-gray-800">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-green-600 font-semibold mb-2">${item.price}</p>
              <p className="text-sm italic text-gray-500">{item.category}</p>
            </div>
          ))}
        </div>
      )}

      {/* Conditional button for logged-in users */}
      {token && (
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/admin')} // Navigate to admin dashboard
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Go to Admin Dashboard
          </button>
        </div>
      )}
    </div>
  );
  
};

export default MenuPage;
