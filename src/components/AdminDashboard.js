import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('http://localhost:5001/eco_zone/admin/stats');
      const data = await res.json();
      if (res.ok) setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>📊 Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">Products: {stats.products}</div>
        <div className="stat-card">Orders: {stats.orders}</div>
        <div className="stat-card">Revenue: £{stats.revenue.toFixed(2)}</div>
      </div>
      <div className="admin-links">
        <Link to="/admin/products">Manage Products</Link>
        <Link to="/admin/orders">Manage Orders</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;