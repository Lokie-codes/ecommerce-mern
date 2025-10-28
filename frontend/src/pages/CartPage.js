import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();

  const updateQuantity = (item, newQuantity) => {
    if (newQuantity > 0) {
      addToCart({ ...item, quantity: parseInt(newQuantity) });
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.container}>
        <h1>Shopping Cart</h1>
        <p>Your cart is empty</p>
        <button onClick={() => navigate('/')} style={styles.button}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Shopping Cart</h1>
      <div style={styles.cartContainer}>
        <div style={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <div style={styles.itemInfo}>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <div style={styles.quantityControl}>
                <label>Qty:</label>
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item, e.target.value)}
                  style={styles.select}
                >
                  {[...Array(10).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div style={styles.cartSummary}>
          <h2>Order Summary</h2>
          <div style={styles.summaryItem}>
            <span>Subtotal ({cartItems.length} items):</span>
            <span>${getTotalPrice()}</span>
          </div>
          <button onClick={handleCheckout} style={styles.checkoutButton}>
            Proceed to Checkout
          </button>
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
  cartContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginTop: '2rem',
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr auto auto auto',
    gap: '1rem',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  itemTotal: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  removeButton: {
    backgroundColor: '#ff4444',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  cartSummary: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    height: 'fit-content',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '0.75rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
    width: '100%',
    marginTop: '1.5rem',
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

export default CartPage;
