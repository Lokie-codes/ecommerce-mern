# MERN Ecommerce Application

A full-stack ecommerce application built with MongoDB, Express.js, React, and Node.js (MERN stack).

## Features

- User authentication (register/login)
- Product listing and details
- Shopping cart functionality
- Checkout and order placement
- Order history tracking
- Admin product management
- Responsive design

## Tech Stack

**Frontend:**
- React 18
- React Router DOM for navigation
- Axios for API calls
- Context API for state management

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Lokie-codes/ecommerce-mern.git
cd ecommerce-mern
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

**Note:** Replace `MONGODB_URI` with your MongoDB connection string if using MongoDB Atlas.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start MongoDB (if running locally)
```bash
mongod
```

### Start the Backend Server
```bash
cd backend
npm run dev
```
The backend will run on http://localhost:5000

### Start the Frontend Development Server
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (Protected)

### Product Routes
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Order Routes
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin only)

## Usage

### For Customers:
1. Register a new account or login
2. Browse products on the home page
3. Click on a product to view details
4. Add products to cart
5. Proceed to checkout
6. Fill in shipping information
7. Place order
8. View order history in "My Orders"

### For Admins:
1. Login with admin account
2. Use API endpoints to manage products and orders

## Project Structure

```
ecommerce-mern/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Header.js
    │   │   └── ProductCard.js
    │   ├── context/
    │   │   ├── AuthContext.js
    │   │   └── CartContext.js
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── ProductDetailPage.js
    │   │   ├── LoginPage.js
    │   │   ├── RegisterPage.js
    │   │   ├── CartPage.js
    │   │   ├── CheckoutPage.js
    │   │   ├── OrderDetailPage.js
    │   │   └── OrdersPage.js
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Sample Data

To add sample products, you can use the following curl command or Postman:

```bash
# First, create an admin user and get the token
# Then use this to create a product:
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Sample Product",
    "description": "This is a sample product",
    "price": 99.99,
    "image": "https://via.placeholder.com/300",
    "category": "Electronics",
    "stock": 10
  }'
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)