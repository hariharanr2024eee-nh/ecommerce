const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // We link the order to a User (by their ID)
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    // The list of items they bought
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            }
        }
    ],
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false } // We can simulate payment later
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);