// src/pages/MenuPage.js
import React, { useEffect, useState } from 'react';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://qr-menu-ya5b.onrender.com/api/menu');
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <div>Loading...</div>;

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
