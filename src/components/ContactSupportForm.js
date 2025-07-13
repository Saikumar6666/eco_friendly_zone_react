import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks for contacting EcoZone! We’ll respond shortly.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-us">
      <section className="contact-hero">
        <h1>Contact EcoZone</h1>
        <p>Whether you're a customer, partner, or eco-entrepreneur — we’d love to hear from you.</p>
      </section>

      <div className="contact-container">
        <section className="contact-info">
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h3>Warehouse & HQ</h3>
            <p>123 Green Street, Eco Commerce District</p>
            <p>Eco City, EC 45678</p>
          </div>
          <div className="info-card">
            <FaPhone className="info-icon" />
            <h3>Customer Support</h3>
            <p>+1 (555) 678-9012</p>
            <p>Mon–Fri: 9am–6pm</p>
          </div>
          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <h3>Email Us</h3>
            <p>support@ecozone.com</p>
            <p>partners@ecozone.com</p>
          </div>
        </section>

        <section className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </section>
      </div>

      {/* <section className="map-section">
        <div className="map-placeholder">
          <p>[ Google Maps embed or location map here ]</p>
        </div>
      </section> */}
    </div>
  );
};

export default ContactUs;
