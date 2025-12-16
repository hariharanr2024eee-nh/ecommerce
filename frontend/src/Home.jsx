import React, { useState } from 'react';

function Home({ products, addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="products-header">
        <h2>Available Products</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <img 
              src={product.image || 'https://via.placeholder.com/250x180?text=Product'} 
              alt={product.name} 
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '1.2rem', marginTop: '2rem' }}>
          No products found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}

export default Home;