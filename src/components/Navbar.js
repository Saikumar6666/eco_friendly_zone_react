import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaLeaf, FaBars, FaTimes, FaUser, FaShoppingCart, FaChartBar, FaStore, FaTools
} from 'react-icons/fa';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout, user } = useContext(AuthContext); // 👈 include user
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    alert('You have been logged out.');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FaLeaf className="leaf-icon" /> EcoZone
        </Link>

        <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={isMobileMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          {isLoggedIn ? (
            <>
              {user?.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-links" onClick={() => setMobileMenuOpen(false)}>
                    <FaTools /> Admin
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links" onClick={() => setMobileMenuOpen(false)}>
                  <FaChartBar /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/shop" className="nav-links" onClick={() => setMobileMenuOpen(false)}>
                  <FaStore /> Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-links" onClick={() => setMobileMenuOpen(false)}>
                  <FaShoppingCart /> Cart
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-links" onClick={handleLogout}>
                  <FaUser /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-links" onClick={() => setMobileMenuOpen(false)}>About</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-links" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-links" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </li>
            </>
          )}
        </ul>

        {!isLoggedIn && (
          <div className="nav-btn">
            <Link to="/register" className="btn-link">
              <button className="btn-primary">Get Started</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
