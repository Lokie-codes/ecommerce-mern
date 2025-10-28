import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id, user.token);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching order');
        setLoading(false);
      }
    };

    if (user) {
      fetchOrder();
    }
  }, [id, user]);

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (error) return <div style={styles.container}>Error: {error}</div>;
  if (!order) return <div style={styles.container}>Order not found</div>;

  return (
    <div style={styles.container}>
      <h1>Order {order._id}</h1>
      <div style={styles.orderContainer}>
        <div style={styles.orderDetails}>
          <div style={styles.section}>
            <h2>Shipping Address</h2>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
            {order.isDelivered ? (
              <div style={styles.success}>Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</div>
            ) : (
              <div style={styles.warning}>Not Delivered</div>
            )}
          </div>

          <div style={styles.section}>
            <h2>Payment Method</h2>
            <p>{order.paymentMethod}</p>
            {order.isPaid ? (
              <div style={styles.success}>Paid on {new Date(order.paidAt).toLocaleDateString()}</div>
            ) : (
              <div style={styles.warning}>Not Paid</div>
            )}
          </div>

          <div style={styles.section}>
            <h2>Order Items</h2>
            {order.orderItems.map((item) => (
              <div key={item._id} style={styles.orderItem}>
                <img src={item.image} alt={item.name} style={styles.image} />
                <div style={styles.itemInfo}>
                  <p>{item.name}</p>
                  <p>{item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div style={styles.summaryItem}>
            <span>Total:</span>
            <span>${order.totalPrice.toFixed(2)}</span>
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
  orderContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginTop: '2rem',
  },
  orderDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  section: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
  },
  orderItem: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem 0',
    borderBottom: '1px solid #eee',
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  orderSummary: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    height: 'fit-content',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '0.5rem',
    borderRadius: '4px',
    marginTop: '0.5rem',
  },
  warning: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    padding: '0.5rem',
    borderRadius: '4px',
    marginTop: '0.5rem',
  },
};

export default OrderDetailPage;
