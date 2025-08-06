import React, { useState, useEffect } from 'react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);

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

    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert('Please login first.');
      return;
    }

    setLoadingProductId(productId);
    try {
      const res = await fetch('http://localhost:5001/eco_zone/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          product_id: productId,
          quantity: 1
        })
      });

      const data = await res.json();

      if (data.status === 200) {
        alert('Added to cart successfully!');
      } else {
        alert(data.message || 'Failed to add to cart.');
      }
    } catch (err) {
      alert('Network error. Try again.');
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <div className="shop-page">
      <h2>Eco-Friendly Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            <img
              src={`http://localhost:5001/uploads/${product.image}`}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-desc">{product.description}</p>
            <p className="product-price">£{product.price.toFixed(2)}</p>
            <button
              className="btn btn-primary"
              onClick={() => handleAddToCart(product.id)}
              disabled={loadingProductId === product.id}
            >
              {loadingProductId === product.id ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
