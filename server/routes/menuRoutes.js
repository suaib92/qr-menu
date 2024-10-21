// src/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect routes with auth middleware for user-specific actions
router.get('/public', menuController.getPublicMenuItems); // Public endpoint
router.get('/', authMiddleware, menuController.getMenuItems);
router.post('/', authMiddleware, menuController.addMenuItem);
router.delete('/:id', authMiddleware, menuController.deleteMenuItem);

module.exports = router;
