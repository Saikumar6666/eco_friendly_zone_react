import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaIdCard } from 'react-icons/fa';

const Registration = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    mobileNo: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!userData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!userData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!userData.password) {
      newErrors.password = 'Password is required';
    } else if (userData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      try {
        const res = await fetch('http://localhost:5001/eco_zone/autenticate/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: userData.fullName,
            email: userData.email,
            password: userData.password,
            userType: userData.userType,
            mobileNo: userData.mobileNo,
            address: userData.address
          })
        });

        const result = await res.json();

        if (res.ok && result.status === 201) {
          setRegistrationSuccess(true);
        } else {
          alert(result.message || 'Registration failed');
        }
      } catch (err) {
        alert('Network error. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (registrationSuccess) {
    return (
      <div className="auth-page">
        <div className="auth-container success-container">
          <div className="success-icon">✓</div>
          <h2>Registration Successful!</h2>
          <p>Welcome to EcoZone — your account has been created.</p>
          <Link to="/login" className="btn-primary">
            Proceed to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Join EcoZone to shop sustainably and make an impact</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <div className="input-with-icon">
              <FaUser className="input-icon" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={userData.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="userType">I am registering as a</label>
            <div className="input-with-icon">
              <FaIdCard className="input-icon" />
              <select
                id="userType"
                name="userType"
                value={userData.userType}
                onChange={handleChange}
              >
                <option value="customer">Customer</option>
                <option value="retailer">Eco Product Seller</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mobileNo">Mobile Number</label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              placeholder="+1234567890"
              value={userData.mobileNo}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Your address"
              value={userData.address}
              onChange={handleChange}
            ></textarea>
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
                value={userData.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
            <small className="form-text">Minimum 8 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-group terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Create Account'}
          </button>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
