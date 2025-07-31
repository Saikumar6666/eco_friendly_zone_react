import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (!user || !user.id) {
                setError('User not logged in');
                setLoading(false);
                return;
            }

            const res = await fetch(`http://localhost:5001/eco_zone/cart/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok && Array.isArray(data.result)) {
                setItems(data.result);
            } else {
                setError(data.message || 'Failed to load cart');
            }
        } catch (err) {
            console.error('Cart fetch error:', err);
            setError('Network error while fetching cart items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const total = Array.isArray(items)
        ? items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
        : '0.00';

    const handleRemove = async (cartId) => {
        try {
            const res = await fetch(`http://localhost:5001/eco_zone/cart/remove/${cartId}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (res.ok) {
                fetchCart();
            } else {
                alert(data.message || 'Failed to remove');
            }
        } catch (err) {
            alert('Network error');
        }
    };

    const handleQuantityChange = async (cartId, newQuantity) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5001/eco_zone/cart/update/${cartId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Quantity updated!');
                fetchCart(); // re-fetch updated cart
            } else {
                alert(data.message || 'Update failed');
            }
        } catch (err) {
            console.error('Update quantity error:', err);
        }
    };

    return (
        <div className="cart-page">
            <h2 className="section-header">🛒 Your Eco Cart</h2>

            {loading && <p>Loading your cart...</p>}
            {error && <p className="error-message">{error}</p>}

            {Array.isArray(items) && items.length > 0 ? (
                <>
                    <div className="cart-items-grid">
                        {items.map((item) => {
                            console.log("Rendering cart item with cart_id:", item.cart_id); // 👈 Log cart_id here
                            return (
                                <div key={item.cart_id || item.product_id} className="cart-item-card">
                                    <img
                                        src={item.image || '/images/products/default.jpg'}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-details">
                                        <h3 className="item-name">{item.name}</h3>
                                        <p className="item-desc">{item.description}</p>
                                        <p className="item-info"><strong>Price:</strong> £{item.price.toFixed(2)}</p>
                                        <div className="item-info">
                                            <strong>Quantity:</strong>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.cart_id, e.target.value)}
                                                style={{ width: '60px', marginLeft: '10px' }}
                                            />
                                        </div>
                                        <p className="item-subtotal">Subtotal: £{(item.price * item.quantity).toFixed(2)}</p>
                                        <button className="btn btn-small" onClick={() => handleRemove(item.cart_id)}>Remove</button>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                    <div className="cart-summary">
                        <h3>Total: <span className="total-price">£{total}</span></h3>
                        <Link to="/checkout">
                            <button className="btn btn-primary">Proceed to Checkout</button>
                        </Link>
                    </div>
                </>
            ) : (
                !loading && !error && <p className="empty-cart">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
