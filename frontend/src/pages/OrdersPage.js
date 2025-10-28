import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(user.token);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching orders');
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (error) return <div style={styles.container}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div style={styles.ordersTable}>
          <div style={styles.tableHeader}>
            <div>Order ID</div>
            <div>Date</div>
            <div>Total</div>
            <div>Paid</div>
            <div>Delivered</div>
            <div>Action</div>
          </div>
          {orders.map((order) => (
            <div key={order._id} style={styles.tableRow}>
              <div>{order._id}</div>
              <div>{new Date(order.createdAt).toLocaleDateString()}</div>
              <div>${order.totalPrice.toFixed(2)}</div>
              <div>{order.isPaid ? 'Yes' : 'No'}</div>
              <div>{order.isDelivered ? 'Yes' : 'No'}</div>
              <div>
                <Link to={`/order/${order._id}`} style={styles.link}>
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  ordersTable: {
    marginTop: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    padding: '1rem',
    borderBottom: '1px solid #eee',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default OrdersPage;
