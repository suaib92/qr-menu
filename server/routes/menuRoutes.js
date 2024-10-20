// routes/menuRoutes.js
const express = require('express');
const { getMenuItems, addMenuItem, deleteMenuItem } = require('../controllers/menuController');
const router = express.Router();

router.get('/', getMenuItems);
router.post('/', addMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;
