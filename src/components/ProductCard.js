import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>Price:</strong> £{product.price}</p>
      <button className="btn-add">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
