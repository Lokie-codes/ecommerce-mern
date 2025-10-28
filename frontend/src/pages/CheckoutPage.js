import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../utils/api';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderItems = cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        product: item._id,
      }));

      const orderData = {
        orderItems,
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod,
        totalPrice: getTotalPrice(),
      };

      const order = await createOrder(orderData, user.token);
      clearCart();
      navigate(`/order/${order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <h1>Checkout</h1>
        <p>Your cart is empty</p>
        <button onClick={() => navigate('/')} style={styles.button}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Checkout</h1>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.checkoutContainer}>
        <div style={styles.formSection}>
          <h2>Shipping Address</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>City:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Postal Code:</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Country:</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={styles.input}
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
            <button type="submit" disabled={loading} style={styles.submitButton}>
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
        <div style={styles.summarySection}>
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.summaryItem}>
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={styles.total}>
            <strong>Total:</strong>
            <strong>${getTotalPrice()}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  checkoutContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginTop: '2rem',
  },
  formSection: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '0.25rem',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '0.75rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  summarySection: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    height: 'fit-content',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #eee',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    fontSize: '1.5rem',
    paddingTop: '1rem',
    borderTop: '2px solid #333',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '0.75rem',
    borderRadius: '4px',
    marginTop: '1rem',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
  },
};

export default CheckoutPage;
