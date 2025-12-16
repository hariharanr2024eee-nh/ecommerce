import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './Home';
import Cart from './Cart';
import Login from './Login';
import Register from './Register';
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  // 1. Load User from Storage (to keep them logged in)
  const [user, setUser] = useState(
      JSON.parse(localStorage.getItem('user')) || null
  );

  // 2. Fetch Products
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data.data))
      .catch(err => console.error(err));
  }, []);

  // --- MISSING FUNCTION WAS LIKELY HERE ---
  
  // 3. Add to Cart Function
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  // 4. Remove from Cart Function
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // 5. Logout Function
  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      alert("Logged out successfully!");
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
          <h1>🛍️ CollegeStore</h1>
          <div className="nav-links">
            <Link to="/store" className="nav-link">🏠 Home</Link>
            <Link to="/cart" className="nav-link">
              🛒 Cart
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </Link>
            
            {user ? (
                <>
                    <span className="user-info">👋 Hi, {user.name}!</span>
                    <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login" className="nav-link">🔑 Login</Link>
                    <Link to="/register" className="nav-link">📝 Register</Link>
                </>
            )}
          </div>
      </nav>

      <Routes>
        {/* We pass addToCart here 👇. If it's missing above, the app crashes. */}
        <Route path="/" element={<Login setUser={setUser} />}/>
        <Route path="/store" element={<Home products={products}addToCart={addToCart}/>}/>
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;