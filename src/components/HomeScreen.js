import React, { useState } from 'react';
import EcoProductMap from './EcoProductMap'; // shows store/supplier locations
import ProductCard from './ProductCard'; // renamed from EcoStatusCard
import ContactSupportForm from './ContactSupportForm'; // renamed from FeedbackForm
import { FaLeaf, FaRecycle, FaTruck, FaUserFriends } from 'react-icons/fa';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('products');

  const sampleProducts = [
    {
      id: 1,
      name: 'Organic Cotton T-Shirt',
      description: '100% biodegradable and eco-certified cotton wear.',
      price: 19.99,
      imageUrl: '/images/tshirt.jpg',
    },
    {
      id: 2,
      name: 'Bamboo Toothbrush',
      description: 'Sustainable bamboo toothbrush with compostable handle.',
      price: 3.49,
      imageUrl: '/images/toothbrush.jpg',
    },
    {
      id: 3,
      name: 'Reusable Grocery Bag',
      description: 'Washable, durable bag made from recycled plastic bottles.',
      price: 7.99,
      imageUrl: '/images/bag.jpg',
    },
  ];

  const ecoSellers = [
    { id: 1, name: 'Eco Store A', productCount: 24, contact: 'info@storea.com', lat: 51.51, lng: -0.09 },
    { id: 2, name: 'Green Goods Ltd', productCount: 17, contact: 'support@greengoods.com', lat: 51.52, lng: -0.1 },
  ];

  return (
    <div className="home-screen">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Shop Eco-Friendly. Live Sustainably.</h1>
          <p>Your go-to marketplace for environmentally conscious products.</p>
          <button className="btn-primary">Browse Products</button>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <FaLeaf className="feature-icon" />
          <h3>Eco Products</h3>
          <p>All items are curated with sustainability and eco-certification in mind.</p>
        </div>
        <div className="feature-card">
          <FaRecycle className="feature-icon" />
          <h3>Recyclable & Reusable</h3>
          <p>Support waste reduction with recyclable or reusable packaging.</p>
        </div>
        <div className="feature-card">
          <FaTruck className="feature-icon" />
          <h3>Green Delivery</h3>
          <p>Low-emission delivery partners committed to eco-shipping.</p>
        </div>
        <div className="feature-card">
          <FaUserFriends className="feature-icon" />
          <h3>Community Support</h3>
          <p>Help small eco-brands grow and reach environmentally conscious shoppers.</p>
        </div>
      </section>

      <section className="tabs-section">
        <div className="section-header">
          <h2>Eco Marketplace</h2>
          <div className="tab-buttons">
            <button
              className={activeTab === 'products' ? 'active' : ''}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
            <button
              className={activeTab === 'map' ? 'active' : ''}
              onClick={() => setActiveTab('map')}
            >
              Store Map
            </button>
            <button
              className={activeTab === 'support' ? 'active' : ''}
              onClick={() => setActiveTab('support')}
            >
              Contact Support
            </button>
          </div>
        </div>

        <div className="tab-content">
          {activeTab === 'products' && (
            <div className="status-grid">
              {sampleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {activeTab === 'map' && <EcoProductMap sellers={ecoSellers} />}
          {activeTab === 'support' && <ContactSupportForm />}
        </div>
      </section>

      <section className="stats-section">
        <h2>Our Eco Impact</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Eco Products Listed</p>
          </div>
          <div className="stat-item">
            <h3>20,000+</h3>
            <p>Customers Served</p>
          </div>
          <div className="stat-item">
            <h3>95%</h3>
            <p>Plastic-Free Packaging</p>
          </div>
          <div className="stat-item">
            <h3>300+</h3>
            <p>Brands Onboarded</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
