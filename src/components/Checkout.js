import React, { useState } from 'react';
// import './Checkout.css'; // Optional, style separately

const Checkout = () => {
  const [shipping, setShipping] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United Kingdom'
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!shipping.fullName) newErrors.fullName = 'Full name required';
    if (!shipping.email) newErrors.email = 'Email required';
    if (!/^\S+@\S+\.\S+$/.test(shipping.email)) newErrors.email = 'Invalid email';
    if (!shipping.phone) newErrors.phone = 'Phone number required';
    if (!shipping.addressLine1) newErrors.addressLine1 = 'Address required';
    if (!shipping.city) newErrors.city = 'City required';
    if (!shipping.postalCode) newErrors.postalCode = 'Postal code required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
  } else {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:5001/eco_zone/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user.id,
          ...shipping
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert(data.message || 'Order failed.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  }
};


  return (
    <div className="checkout-page">
      <h2 className="section-header">🧾 Checkout</h2>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input name="fullName" value={shipping.fullName} onChange={handleChange} />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input name="email" type="email" value={shipping.email} onChange={handleChange} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input name="phone" type="tel" value={shipping.phone} onChange={handleChange} />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Address Line 1</label>
          <input name="addressLine1" value={shipping.addressLine1} onChange={handleChange} />
          {errors.addressLine1 && <span className="error-message">{errors.addressLine1}</span>}
        </div>

        <div className="form-group">
          <label>Address Line 2 (Optional)</label>
          <input name="addressLine2" value={shipping.addressLine2} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>City</label>
          <input name="city" value={shipping.city} onChange={handleChange} />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label>State / Region</label>
          <input name="state" value={shipping.state} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Postal Code</label>
          <input name="postalCode" value={shipping.postalCode} onChange={handleChange} />
          {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
        </div>

        <div className="form-group">
          <label>Country</label>
          <select name="country" value={shipping.country} onChange={handleChange}>
            <option value="United Kingdom">United Kingdom</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Confirm Order
        </button>
      </form>

      {submitted && (
        <div className="checkout-success">
          <p>🎉 Thank you for your order! You’ll receive a confirmation email shortly.</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
