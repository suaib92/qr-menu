const MenuItem = require('../models/MenuItem');

// Get all menu items for the logged-in user
exports.getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find({ userId: req.user.id }); // Fetch only user's menu items
    console.log('Fetched items for user:', req.user.id, items); // Debugging
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu items' });
  }
};

// Add new menu item
exports.addMenuItem = async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    const newItem = new MenuItem({ 
      name, 
      description, 
      price, 
      category, 
      userId: req.user.id // Link menu item to user
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error adding menu item' });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.id // Ensure only owner can delete
    });
    if (!item) return res.status(404).json({ message: 'Item not found or unauthorized' });
    res.status(200).json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item' });
  }
};
