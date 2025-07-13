import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="dashboard-page">
      <h2>Welcome, {user.full_name || user.user_name || 'EcoUser'}!</h2>

      <div className="dashboard-card">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User Type:</strong> {user.user_type}</p>
        <p><strong>Registered On:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>

      {/* Future Features:
        - Order history
        - Profile update
        - Wishlist
        - Support tickets
      */}
    </div>
  );
};

export default Dashboard;
