const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/orderController');

// POST /api/orders
router.post('/', addOrderItems);

module.exports = router;