const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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
                name: 'iPhone 15 Pro',
                price: 999.99,
                description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'
            },
            {
                name: 'MacBook Air M2',
                price: 1199.99,
                description: 'Supercharged by M2 chip, 13.6-inch Liquid Retina display, up to 18 hours battery life',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop'
            },
            {
                name: 'Nike Air Max 270',
                price: 149.99,
                description: 'Comfortable running shoes with Max Air unit for all-day comfort',
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop'
            },
            {
                name: 'Sony WH-1000XM4',
                price: 349.99,
                description: 'Industry-leading noise canceling wireless headphones with 30-hour battery',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
            },
            {
                name: 'Adidas Ultraboost 22',
                price: 189.99,
                description: 'Premium running shoes with responsive Boost midsole and Primeknit upper',
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop'
            },
            {
                name: 'Samsung Galaxy Watch 6',
                price: 329.99,
                description: 'Advanced smartwatch with health monitoring, GPS, and 40mm display',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
            },
            {
                name: 'Levi\'s 501 Original Jeans',
                price: 89.99,
                description: 'Classic straight-leg jeans, the original blue jean since 1873',
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop'
            },
            {
                name: 'iPad Pro 12.9"',
                price: 1099.99,
                description: 'Most advanced iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop'
            },
            {
                name: 'Canon EOS R6 Mark II',
                price: 2499.99,
                description: 'Professional mirrorless camera with 24.2MP sensor and 4K video recording',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop'
            },
            {
                name: 'The North Face Jacket',
                price: 199.99,
                description: 'Waterproof and breathable outdoor jacket perfect for all weather conditions',
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop'
            },
            {
                name: 'PlayStation 5',
                price: 499.99,
                description: 'Next-gen gaming console with ultra-high speed SSD and ray tracing',
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop'
            },
            {
                name: 'Ray-Ban Aviator Sunglasses',
                price: 154.99,
                description: 'Classic aviator sunglasses with UV protection and iconic design',
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop'
            }
        ];
        
        await Product.insertMany(sampleProducts);
        console.log('✅ Sample products added');
    }
};

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/college-ecommerce')
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