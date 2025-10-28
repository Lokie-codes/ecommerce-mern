# MERN Ecommerce - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MERN ECOMMERCE APP                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │   Components     │  │     Context      │  │      Pages       │  │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤  │
│  │ - Header         │  │ - AuthContext    │  │ - HomePage       │  │
│  │ - ProductCard    │  │ - CartContext    │  │ - ProductDetail  │  │
│  │                  │  │                  │  │ - LoginPage      │  │
│  │                  │  │  State Mgmt:     │  │ - RegisterPage   │  │
│  │                  │  │  • User Auth     │  │ - CartPage       │  │
│  │                  │  │  • Cart Items    │  │ - CheckoutPage   │  │
│  │                  │  │  • LocalStorage  │  │ - OrdersPage     │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    React Router (Navigation)                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │            API Utils (Axios - HTTP Client)                    │  │
│  │  • GET /api/products        • POST /api/orders               │  │
│  │  • POST /api/users/login    • GET /api/orders/myorders       │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP/HTTPS
                                    │ Port 3000 → 5000
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│                        BACKEND (Node.js/Express)                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Express Server (server.js)                 │  │
│  │  • CORS Enabled  • JSON Parser  • Error Handling             │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │     Routes       │  │   Middleware     │  │   Controllers    │  │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤  │
│  │ /api/users       │  │ - authMiddleware │  │ - userController │  │
│  │ /api/products    │──┤   • protect      │  │ - productCtrl    │  │
│  │ /api/orders      │  │   • admin        │  │ - orderCtrl      │  │
│  │                  │  │                  │  │                  │  │
│  │ RESTful APIs:    │  │ JWT Verify       │  │ Business Logic   │  │
│  │ • GET /products  │  │ Token Decode     │  │ Data Processing  │  │
│  │ • POST /login    │  │                  │  │                  │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    Mongoose (ODM)                             │  │
│  │  • Schema Definition  • Validation  • Query Builder           │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │      Models      │  │    Security      │  │     Seeder       │  │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤  │
│  │ - User           │  │ - bcryptjs       │  │ - Sample Users   │  │
│  │ - Product        │  │ - jsonwebtoken   │  │ - Sample Prods   │  │
│  │ - Order          │  │ - Password Hash  │  │                  │  │
│  │                  │  │ - JWT Tokens     │  │ npm run seed     │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Mongoose Driver
                                    │ MongoDB URI
                                    ↓
┌─────────────────────────────────────────────────────────────────────┐
│                        DATABASE (MongoDB)                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  users collection│  │products collection│  │orders collection │  │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────┤  │
│  │ _id              │  │ _id              │  │ _id              │  │
│  │ name             │  │ name             │  │ user (ref)       │  │
│  │ email (unique)   │  │ description      │  │ orderItems[]     │  │
│  │ password (hash)  │  │ price            │  │ shippingAddress  │  │
│  │ isAdmin          │  │ image            │  │ paymentMethod    │  │
│  │ createdAt        │  │ category         │  │ totalPrice       │  │
│  │ updatedAt        │  │ stock            │  │ isPaid           │  │
│  │                  │  │ rating           │  │ isDelivered      │  │
│  │                  │  │ numReviews       │  │ createdAt        │  │
│  │                  │  │ createdAt        │  │ updatedAt        │  │
│  │                  │  │ updatedAt        │  │                  │  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                      │
│  NoSQL Document Store • Indexes • Validation                        │
└─────────────────────────────────────────────────────────────────────┘


DATA FLOW EXAMPLE - User Places Order:
════════════════════════════════════════

1. User → Frontend: Clicks "Place Order" button
   ↓
2. Frontend → Context: Updates cart state
   ↓
3. Frontend → API Utils: POST /api/orders
   ↓
4. Backend → Middleware: Verify JWT token (protect)
   ↓
5. Backend → Controller: Process order data (createOrder)
   ↓
6. Backend → Model: Validate & save order (Order.create)
   ↓
7. Database: Insert new order document
   ↓
8. Backend → Frontend: Return order confirmation
   ↓
9. Frontend → User: Display order success page


AUTHENTICATION FLOW:
═══════════════════

1. User → Frontend: Submit login form
   ↓
2. Frontend → Backend: POST /api/users/login
   ↓
3. Backend → Controller: Validate credentials
   ↓
4. Backend → Model: Find user & compare password
   ↓
5. Backend → Security: Generate JWT token
   ↓
6. Backend → Frontend: Return user + token
   ↓
7. Frontend → Context: Save to AuthContext
   ↓
8. Frontend → LocalStorage: Persist token
   ↓
9. Frontend: Include token in subsequent requests
   (Authorization: Bearer <token>)


TECHNOLOGY STACK:
════════════════

Frontend:
  • React 18 - UI Library
  • React Router DOM - Routing
  • Context API - State Management
  • Axios - HTTP Client
  • CSS-in-JS - Styling

Backend:
  • Node.js - Runtime
  • Express.js - Web Framework
  • Mongoose - MongoDB ODM
  • JWT - Authentication
  • bcryptjs - Password Hashing
  • CORS - Cross-Origin Support

Database:
  • MongoDB - NoSQL Database
  • MongoDB Atlas - Cloud Option

DevOps:
  • npm - Package Manager
  • Git - Version Control
  • dotenv - Environment Config
```
