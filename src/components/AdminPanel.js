import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsers = await fetch("http://localhost:5001/eco_zone/admin/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataUsers = await resUsers.json();
        setUsers(dataUsers.users);

        const resOrders = await fetch("http://localhost:5001/eco_zone/admin/orders", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataOrders = await resOrders.json();
        setOrders(dataOrders.orders);
      } catch (err) {
        console.error("Error loading admin data", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="admin-panel">
      <h2>👑 Admin Dashboard</h2>

      <section>
        <h3>👥 Users</h3>
        <table>
          <thead><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.user_name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>📦 Orders</h3>
        <table>
          <thead><tr><th>Order ID</th><th>User</th><th>Total</th><th>Date</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.user_name}</td>
                <td>£{o.total_amount}</td>
                <td>{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPanel;
