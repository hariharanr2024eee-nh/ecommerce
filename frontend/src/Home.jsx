import React, { useState } from 'react';

function Home({ products, addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="products-header">
        <h2>🛍️ Shop Our Products</h2>
        <input
          type="text"
          placeholder="🔍 Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <button 
                onClick={() => addToCart(product)}
                className="add-to-cart-btn"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', color: 'white', fontSize: '1.5rem', marginTop: '3rem' }}>
          😔 No products found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}

export default Home;