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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/admin" element={<AdminPanel />} /> */}
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
