import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../utils/api';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: parseInt(quantity) });
    alert('Product added to cart!');
  };

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (error) return <div style={styles.container}>Error: {error}</div>;
  if (!product) return <div style={styles.container}>Product not found</div>;

  return (
    <div style={styles.container}>
      <div style={styles.productDetail}>
        <div style={styles.imageSection}>
          <img src={product.image} alt={product.name} style={styles.image} />
        </div>
        <div style={styles.infoSection}>
          <h1>{product.name}</h1>
          <p style={styles.category}>Category: {product.category}</p>
          <p style={styles.price}>${product.price}</p>
          <div style={styles.rating}>
            Rating: {product.rating} ⭐ ({product.numReviews} reviews)
          </div>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.stock}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>
          {product.stock > 0 && (
            <div style={styles.addToCartSection}>
              <label>
                Quantity:
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={styles.select}
                >
                  {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={handleAddToCart} style={styles.button}>
                Add to Cart
              </button>
            </div>
          )}
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
  productDetail: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
  },
  imageSection: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    borderRadius: '8px',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  category: {
    color: '#666',
  },
  price: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#28a745',
  },
  rating: {
    fontSize: '1rem',
  },
  description: {
    lineHeight: '1.6',
  },
  stock: {
    fontWeight: 'bold',
    color: '#28a745',
  },
  addToCartSection: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  select: {
    marginLeft: '0.5rem',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 2rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
  },
};

export default ProductDetailPage;
