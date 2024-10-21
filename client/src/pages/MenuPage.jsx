// src/pages/MenuPage.js
import React, { useEffect, useState } from 'react';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://qr-menu-ya5b.onrender.com/api/menu/public', {
          headers: {
            'Content-Type': 'application/json',
            // No Authorization header since it's public access
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to fetch menu items');
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading...</div>;

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  if (menuItems.length === 0) {
    return <div className="text-center mt-8">No menu items available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Menu</h1>
        <ul className="divide-y divide-gray-200">
          {menuItems.map((item) => (
            <li key={item._id} className="flex justify-between items-center p-4">
              <span className="text-gray-700 font-medium">{item.name} - ${item.price}</span>
              <span className="text-gray-500">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuPage;
