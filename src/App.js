import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './components/HomeScreen';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactSupportForm';
import Login from './components/Login';
import Registration from './components/Registration';
import Shop from './components/Shop';
import './assets/styles/main.css';
import { AuthProvider } from './AuthContext';
import Dashboard from './pages/Dashboard';
import Cart from './components/Cart';
import { CartProvider } from './CartContext';
import Checkout from './components/Checkout';

// ✅ Admin Panel
import AdminPanel from './components/AdminPanel';
import AdminProducts from './components/AdminProducts';
import AdminDashboard from './components/AdminDashboard';
import AdminOrders from './components/AdminOrders';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <div className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomeScreen />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* ✅ Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
              </Routes>
            </div>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
