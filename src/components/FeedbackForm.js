import React, { useState } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for your feedback, ${formData.name}!`);
    setFormData({ name: '', message: '' });
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h3>Submit Feedback</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default FeedbackForm;
