import React, { useEffect, useState } from 'react';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: null });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5001/eco_zone/admin/products');
    const data = await res.json();
    if (res.ok) setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (let key in formData) form.append(key, formData[key]);

    const url = editingId
      ? `http://localhost:5001/eco_zone/admin/products/${editingId}`
      : 'http://localhost:5001/eco_zone/admin/products';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      body: form
    });

    const data = await res.json();
    if (res.ok) {
      setFormData({ name: '', price: '', description: '', image: null });
      setEditingId(null);
      fetchProducts();
    } else {
      alert(data.message || 'Error');
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5001/eco_zone/admin/products/${id}`, { method: 'DELETE' });
    if (res.ok) fetchProducts();
    else alert('Delete failed');
  };

  return (
    <div className="admin-products">
      <h2>🛒 Manage Products</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} required />
        <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData(p => ({ ...p, price: e.target.value }))} required />
        <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} required />
        <input type="file" accept="image/*" onChange={(e) => setFormData(p => ({ ...p, image: e.target.files[0] }))} />
        <button type="submit">{editingId ? 'Update' : 'Add'} Product</button>
      </form>
      <div className="product-list">
        {products.map(p => (
          <div key={p.id} className="product-item">
            <img src={p.image || '/images/products/default.jpg'} alt={p.name} />
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <p>£{p.price.toFixed(2)}</p>
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;