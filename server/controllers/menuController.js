// controllers/menuController.js
const MenuItem = require('../models/MenuItem');

// Get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu items' });
  }
};

// Add new menu item
exports.addMenuItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const newItem = new MenuItem({ name, description, price, category });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding menu item' });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item' });
  }
};
