import React, { useState, useEffect } from 'react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // optional
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5001/eco_zone/products');
        const data = await res.json();

        if (res.ok) {
          setProducts(data);
        } else {
          setError(data.message || 'Failed to fetch products');
        }
      } catch (err) {
        setError('Network error while fetching products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="shop-page">
      <h2>Eco-Friendly Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image || '/images/products/default.jpg'}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-desc">{product.description}</p>
            <p className="product-price">£{product.price.toFixed(2)}</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
