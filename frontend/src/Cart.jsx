import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, removeFromCart }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      alert("Please Login to Checkout!");
      navigate('/login');
      return;
    }

    setLoading(true);
    const orderData = {
      userId: user.id,
      orderItems: cart.map(item => ({
        name: item.name,
        price: item.price,
        product: item._id
      })),
      totalPrice: total
    };

    try {
      await axios.post('http://localhost:5000/api/orders', orderData);
      alert('Order Placed Successfully!');
    } catch (error) {
      console.error(error);
      alert('Checkout Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="cart-container">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Shopping Cart</h2>
        
        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <button 
              onClick={() => navigate('/store')}
              className="form-btn"
              style={{ maxWidth: '200px' }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(index)} 
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <div className="cart-total">
              <h3>Total: ${total.toFixed(2)}</h3>
              <button 
                onClick={handleCheckout}
                className="checkout-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;