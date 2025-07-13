import React from 'react';
import { FaLeaf, FaUsers, FaStoreAlt, FaGlobeAmericas } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="about-hero">
        <h1>About EcoZone</h1>
        <p>Empowering consumers to make sustainable product choices</p>
      </section>

      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            EcoZone is more than an e-commerce platform — we are a movement dedicated to promoting eco-conscious living through accessible, affordable, and sustainable products.
            Our mission is to connect ethical brands with consumers who care about the planet, enabling responsible consumption at scale.
          </p>
          <div className="mission-stats">
            <div className="stat-item">
              <FaLeaf className="stat-icon" />
              <h3>2022</h3>
              <p>Founded</p>
            </div>
            <div className="stat-item">
              <FaUsers className="stat-icon" />
              <h3>50,000+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <FaStoreAlt className="stat-icon" />
              <h3>500+</h3>
              <p>Eco-Friendly Products</p>
            </div>
          </div>
        </div>
        <div className="mission-image">
          {/* Optional Image */}
        </div>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <p className="team-description">
          We are a passionate team of sustainability advocates, product curators, designers, and engineers working together to make green living accessible and practical.
        </p>
        <div className="team-grid">
          {/* Add team members here with image, name, and role */}
        </div>
      </section>

      <section className="partners-section">
        <h2>Our Brand Partners</h2>
        <div className="partners-grid">
          {/* Add eco-brand logos here */}
        </div>
      </section>

      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaLeaf className="value-icon" />
            <h3>Sustainability</h3>
            <p>We offer products that reduce waste and support a circular economy.</p>
          </div>
          <div className="value-card">
            <FaUsers className="value-icon" />
            <h3>Transparency</h3>
            <p>We work only with ethical suppliers and clearly label our product impact.</p>
          </div>
          <div className="value-card">
            <FaStoreAlt className="value-icon" />
            <h3>Quality</h3>
            <p>All our items are curated for both eco-friendliness and performance.</p>
          </div>
          <div className="value-card">
            <FaGlobeAmericas className="value-icon" />
            <h3>Global Impact</h3>
            <p>Every purchase supports reforestation, clean oceans, or fair labor.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
