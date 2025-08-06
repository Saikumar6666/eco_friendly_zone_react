import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaClipboardList, FaMoneyBillWave } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0.0
  });

  useEffect(() => {
    fetch('http://localhost:5001/eco_zone/admin/stats?role=admin')
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setStats(data.stats);
        }
      })
      .catch(() => {
        console.error('Failed to load stats');
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">📊 Admin Dashboard</h2>

      <div className="stats-container">
        <div className="stat-card">
          <FaBoxOpen className="stat-icon" />
          <h3>Products</h3>
          <p>{stats.products}</p>
        </div>

        <div className="stat-card">
          <FaClipboardList className="stat-icon" />
          <h3>Orders</h3>
          <p>{stats.orders}</p>
        </div>

        <div className="stat-card">
          <FaMoneyBillWave className="stat-icon" />
          <h3>Revenue</h3>
          <p>£{stats.revenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="admin-links">
        <Link to="/admin/products" className="admin-link-btn">Manage Products</Link>
        <Link to="/admin/orders" className="admin-link-btn">Manage Orders</Link>
        <Link to="/admin/messages" className="admin-link-btn">View Messages</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
