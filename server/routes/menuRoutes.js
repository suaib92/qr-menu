const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public route to get all menu items
router.get('/', menuController.getAllMenuItems);

// Protected routes for user-specific actions
router.get('/user', authMiddleware, menuController.getUserMenuItems);
router.post('/', authMiddleware, menuController.addMenuItem);
router.delete('/:id', authMiddleware, menuController.deleteMenuItem);

module.exports = router;
