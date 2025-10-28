const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
  },
];

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    image: 'https://via.placeholder.com/300/0000FF/808080?text=Headphones',
    category: 'Electronics',
    stock: 15,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 199.99,
    image: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=Smart+Watch',
    category: 'Electronics',
    stock: 8,
    rating: 4.8,
    numReviews: 20,
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes for all terrains',
    price: 79.99,
    image: 'https://via.placeholder.com/300/00FF00/000000?text=Running+Shoes',
    category: 'Sports',
    stock: 25,
    rating: 4.3,
    numReviews: 8,
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable backpack with laptop compartment',
    price: 49.99,
    image: 'https://via.placeholder.com/300/FFFF00/000000?text=Backpack',
    category: 'Accessories',
    stock: 30,
    rating: 4.6,
    numReviews: 15,
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life',
    price: 29.99,
    image: 'https://via.placeholder.com/300/FF00FF/FFFFFF?text=Mouse',
    category: 'Electronics',
    stock: 50,
    rating: 4.4,
    numReviews: 25,
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for comfortable workouts',
    price: 24.99,
    image: 'https://via.placeholder.com/300/00FFFF/000000?text=Yoga+Mat',
    category: 'Sports',
    stock: 40,
    rating: 4.7,
    numReviews: 18,
  },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    await Product.insertMany(products);

    console.log('Data Imported!');
    console.log('Sample users:');
    console.log('Admin: admin@example.com / admin123');
    console.log('User: john@example.com / john123');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
