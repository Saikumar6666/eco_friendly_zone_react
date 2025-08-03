import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // ✅ use login from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  try {
    const res = await fetch('http://localhost:5001/eco_zone/autenticate/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userEmail: credentials.email,
        Password: credentials.password
      })
    });

    const data = await res.json();

    if (data.status === 200) {
      const user = data.results[0];
      login(data.token, user); // ✅ Update context

      alert('Login successful!');

      // ✅ Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin/products');
      } else {
        navigate('/shop');
      }
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    setError('Network error. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Login to EcoZone</h2>
          <p>Access your account to shop or manage your eco-products</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="auth-footer">
            <p>New to EcoZone? <Link to="/register">Create an account</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
