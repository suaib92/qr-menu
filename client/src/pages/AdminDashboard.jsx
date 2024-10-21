// src/pages/AdminDashboard.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { generateQRCode } from '../utils/generateQR';
import html2canvas from 'html2canvas';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '' });
  const [qrCodeURL, setQrCodeURL] = useState('');
  const qrCodeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenuItems();
    generateQRCodeForMenu();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token from storage
      const response = await fetch('https://qr-menu-ya5b.onrender.com/api/menu', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Attach token in the header
        },
      });

      if (!response.ok) throw new Error('Failed to fetch menu items');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const generateQRCodeForMenu = async () => {
    const url = 'https://qr-menu-omega-swart.vercel.app/menu';
    const qrCode = await generateQRCode(url);
    setQrCodeURL(qrCode);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await fetch('https://qr-menu-ya5b.onrender.com/api/menu', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Attach token in the header
        },
        body: JSON.stringify(formData),
      });
      fetchMenuItems(); // Refresh menu items
      setFormData({ name: '', description: '', price: '', category: '' });
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`https://qr-menu-ya5b.onrender.com/api/menu/${id}`, { 
        method: 'DELETE', 
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the header
        },
      });
      fetchMenuItems(); // Refresh after delete
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const downloadQRCode = async () => {
    const canvas = await html2canvas(qrCodeRef.current);
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'menu-qr-code.png';
    link.click();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/menu')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Home
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="bg-white p-4 shadow rounded-lg">
            {qrCodeURL && (
              <div ref={qrCodeRef}>
                <QRCode value="https://qr-menu-omega-swart.vercel.app/menu" size={128} />
              </div>
            )}
          </div>

          <button
            onClick={downloadQRCode}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition ml-4"
          >
            Download QR Code
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            Add Item
          </button>
        </form>

        <ul className="divide-y divide-gray-200">
          {menuItems.map((item) => (
            <li key={item._id} className="flex justify-between items-center p-4">
              <span className="text-gray-700 font-medium">{item.name} - ${item.price}</span>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
