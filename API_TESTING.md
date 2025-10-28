# API Testing Guide

This guide provides examples for testing the API endpoints using curl or tools like Postman.

## Base URL
```
http://localhost:5000/api
```

## User Endpoints

### Register a New User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

**Response:**
```json
{
  "_id": "...",
  "name": "Test User",
  "email": "test@example.com",
  "isAdmin": false,
  "token": "eyJhbGc..."
}
```

### Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Get User Profile (Protected)
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Product Endpoints

### Get All Products
```bash
curl -X GET http://localhost:5000/api/products
```

### Get Single Product
```bash
curl -X GET http://localhost:5000/api/products/PRODUCT_ID
```

### Create Product (Admin Only)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "image": "https://via.placeholder.com/300",
    "category": "Electronics",
    "stock": 10
  }'
```

### Update Product (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "name": "Updated Product Name",
    "price": 149.99,
    "stock": 5
  }'
```

### Delete Product (Admin Only)
```bash
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## Order Endpoints

### Create Order (Protected)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN" \
  -d '{
    "orderItems": [
      {
        "name": "Product Name",
        "quantity": 2,
        "image": "https://via.placeholder.com/300",
        "price": 99.99,
        "product": "PRODUCT_ID"
      }
    ],
    "shippingAddress": {
      "address": "123 Main St",
      "city": "New York",
      "postalCode": "10001",
      "country": "USA"
    },
    "paymentMethod": "Cash on Delivery",
    "totalPrice": 199.98
  }'
```

### Get My Orders (Protected)
```bash
curl -X GET http://localhost:5000/api/orders/myorders \
  -H "Authorization: Bearer USER_TOKEN"
```

### Get Order by ID (Protected)
```bash
curl -X GET http://localhost:5000/api/orders/ORDER_ID \
  -H "Authorization: Bearer USER_TOKEN"
```

### Get All Orders (Admin Only)
```bash
curl -X GET http://localhost:5000/api/orders \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Update Order to Delivered (Admin Only)
```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID/deliver \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## Sample Credentials (After Seeding)

**Admin User:**
- Email: admin@example.com
- Password: admin123

**Regular User:**
- Email: john@example.com
- Password: john123

## Testing Workflow

1. **Seed the database:**
   ```bash
   cd backend
   npm run seed
   ```

2. **Start the backend:**
   ```bash
   npm run dev
   ```

3. **Login as admin to get token:**
   ```bash
   curl -X POST http://localhost:5000/api/users/login \
     -H "Content-Type: application/json" \
     -d '{"email": "admin@example.com", "password": "admin123"}'
   ```

4. **Copy the token from response**

5. **Test protected endpoints using the token**

## Postman Collection

For easier testing, you can import these requests into Postman:

1. Create a new Collection in Postman
2. Add the environment variable `baseUrl` = `http://localhost:5000/api`
3. Add the environment variable `token` = your JWT token
4. Use `{{baseUrl}}` and `Bearer {{token}}` in your requests

## Error Responses

Common error responses:

- `400 Bad Request` - Invalid input data
- `401 Unauthorized` - Missing or invalid token
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Example error response:
```json
{
  "message": "Error description"
}
```
