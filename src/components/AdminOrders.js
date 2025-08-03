import React, { useEffect, useState } from 'react';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch('http://localhost:5001/eco_zone/admin/orders');
    const data = await res.json();
    if (res.ok) setOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders">
      <h2>📦 Manage Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th><th>Name</th><th>Email</th><th>Total</th><th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.full_name}</td>
              <td>{o.email}</td>
              <td>£{o.total_amount.toFixed(2)}</td>
              <td>{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;