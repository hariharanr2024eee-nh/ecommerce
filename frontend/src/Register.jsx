import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await axios.post('http://localhost:5000/api/users/register', { name, email, password });
            alert('Registration Successful! Please Login.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert('Error registering. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-header">
                    <div className="form-icon">📝</div>
                    <h2>Join $ Store</h2>
                    <p>Create your account and start shopping!</p>
                </div>
                
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                        className="form-input"
                    />
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
                        minLength="6"
                    />
                    <button 
                        type="submit" 
                        className="form-btn"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
                
                <div className="form-link">
                    Already have an account? 
                    <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;