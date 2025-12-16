const Order = require('../models/orderModel');

const addOrderItems = async (req, res) => {
    try {
        const { orderItems, totalPrice, userId } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        // Create the new order in the Database
        const order = new Order({
            user: userId, // We will send the User ID from the frontend
            orderItems,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addOrderItems };