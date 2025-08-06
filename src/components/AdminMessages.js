import React, { useEffect, useState } from 'react';
import './AdminMessages.css';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/eco_zone/admin/messages?role=admin')
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setMessages(data.messages);
        }
      })
      .catch(err => console.error('Error fetching messages:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-messages">
      <h2>📩 Contact Messages</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <table className="messages-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminMessages;
