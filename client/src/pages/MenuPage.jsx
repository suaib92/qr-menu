// src/pages/MenuPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

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

    const checkAdminStatus = () => {
      const userRole = localStorage.getItem('userRole'); // For example, from local storage
      console.log('User role:', userRole); // Debugging log
      setIsAdmin(userRole === 'admin'); // Check if the role is 'admin'
      console.log('Is Admin:', userRole === 'admin'); // Debugging log
    };

    fetchMenuItems();
    checkAdminStatus(); // Check admin status on component mount
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Menu</h1>
        
        {/* Admin Navigation Link */}
        {isAdmin && (
          <div className="mb-4 text-center">
            <Link to="/admin" className="text-blue-500 hover:underline">
              Go to Admin Dashboard
            </Link>
          </div>
        )}
        
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
