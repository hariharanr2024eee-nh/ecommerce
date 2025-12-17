import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user)); 
            
            setUser(res.data.user);
            
            alert('Login Successful!');
            navigate('/store'); 
        } catch (err) {
            console.error(err);
            alert('Invalid Credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-header">
                    <div className="form-icon">🔑</div>
                    <h2>Welcome to $ Store!</h2>
                    <p>Sign in to start shopping</p>
                </div>
                
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                        className="form-input"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                        className="form-input"
                    />
                    <button 
                        type="submit" 
                        className="form-btn"
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                
                <div className="form-link">
                    Don't have an account? 
                    <Link to="/register">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;