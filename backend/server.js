const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Sample data seeding
const seedData = async () => {
    const Product = require('./models/productModel');
    const count = await Product.countDocuments();
    
    if (count === 0) {
        const sampleProducts = [
            {
                name: 'College Notebook',
                price: 15.99,
                description: 'High-quality spiral notebook for students',
                category: 'Stationery',
                image: 'https://via.placeholder.com/250x180?text=Notebook'
            },
            {
                name: 'Scientific Calculator',
                price: 45.99,
                description: 'Advanced calculator for math and science courses',
                category: 'Electronics',
                image: 'https://via.placeholder.com/250x180?text=Calculator'
            },
            {
                name: 'College Backpack',
                price: 89.99,
                description: 'Durable backpack with laptop compartment',
                category: 'Accessories',
                image: 'https://via.placeholder.com/250x180?text=Backpack'
            },
            {
                name: 'Textbook Bundle',
                price: 199.99,
                description: 'Essential textbooks for first-year students',
                category: 'Books',
                image: 'https://via.placeholder.com/250x180?text=Books'
            }
        ];
        
        await Product.insertMany(sampleProducts);
        console.log('✅ Sample products added');
    }
};

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/college-ecommerce')
  .then(() => {
    console.log('✅ MongoDB Connected');
    seedData();
  })
  .catch(err => console.error('❌ Connection Error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));