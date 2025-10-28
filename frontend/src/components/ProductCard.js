import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div style={styles.card}>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} style={styles.image} />
      </Link>
      <div style={styles.cardBody}>
        <Link to={`/product/${product._id}`} style={styles.link}>
          <h3>{product.name}</h3>
        </Link>
        <p style={styles.price}>${product.price}</p>
        <p style={styles.category}>{product.category}</p>
        <div style={styles.rating}>
          Rating: {product.rating} ⭐ ({product.numReviews} reviews)
        </div>
        {product.stock > 0 ? (
          <button onClick={() => onAddToCart(product)} style={styles.button}>
            Add to Cart
          </button>
        ) : (
          <button disabled style={styles.buttonDisabled}>Out of Stock</button>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#28a745',
  },
  category: {
    color: '#666',
    fontSize: '0.9rem',
  },
  rating: {
    margin: '0.5rem 0',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    color: '#666',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    width: '100%',
    cursor: 'not-allowed',
  },
};

export default ProductCard;
