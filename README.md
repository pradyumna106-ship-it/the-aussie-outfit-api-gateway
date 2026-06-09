# The Aussie Outfit API Gateway

## Overview

This repository contains the API Gateway for The Aussie Outfit e-commerce platform. Built with Express.js, the gateway serves as the central routing layer that proxies requests to multiple backend microservices while handling authentication, CORS, security headers, and comprehensive error handling.

## Features

- **Centralized Request Routing** - Routes all client requests to appropriate microservices
- **JWT Authentication** - Token-based authentication with Bearer token verification for protected routes
- **Service Proxying** - Uses `http-proxy-middleware` for seamless service-to-service communication
- **Security** - Helmet.js for HTTP headers security and CORS configuration
- **Comprehensive Error Handling** - Handles MongoDB validation errors, JWT errors, and HTTP exceptions
- **Request Logging** - Morgan middleware for HTTP request logging in development
- **Health Check Endpoint** - Built-in `/` endpoint to verify gateway connectivity

## Architecture

### Microservices Integration

The gateway manages the following microservices:

**Public Routes (No Authentication Required):**
- `/api/auth` - Authentication service (login, token refresh)
- `/api/products` - Product catalog service
- `/api/reviews` - Product reviews service

**Protected Routes (JWT Authentication Required):**
- `/api/users` - User profile management
- `/api/cart` - Shopping cart operations
- `/api/orders` - Order management
- `/api/payments` - Payment processing
- `/api/notifications` - Notification service
- `/api/admin` - Admin operations

## Tech Stack

- **Runtime:** Node.js 20 (Alpine)
- **Framework:** Express.js
- **Authentication:** JWT (jsonwebtoken)
- **HTTP Proxy:** http-proxy-middleware
- **Security:** Helmet.js, CORS
- **Logging:** Morgan
- **Environment:** dotenv

## Prerequisites

- Node.js 18 or later
- npm or yarn
- Environment variables configured (see Configuration section)

## Installation

```bash
npm install
```

## Configuration

Set up environment variables in a `.env` file:

```env
# Server Port
PORT=5000

# JWT Secret for token verification
JWT_SECRET=your_jwt_secret_key

# Microservice URLs
AUTH_SERVICE=http://localhost:3001
PRODUCT_SERVICE=http://localhost:3002
REVIEW_SERVICE=http://localhost:3003
USER_SERVICE=http://localhost:3004
CART_SERVICE=http://localhost:3005
ORDER_SERVICE=http://localhost:3006
PAYMENT_SERVICE=http://localhost:3007
NOTIFICATION_SERVICE=http://localhost:3008
ADMIN_SERVICE=http://localhost:3009
```

## Development

### Local Development with Auto-Reload

```bash
npm run dev
```

### Running the Server

```bash
npm start
```

The gateway will start on the configured PORT (default: 5000) and log all incoming requests.

## API Endpoints

### Health Check
- `GET /` - Returns gateway status and connectivity confirmation

### Authentication (Public)
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

### Products (Public)
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details

### Reviews (Public)
- `GET /api/reviews` - List reviews
- `POST /api/reviews` - Create review (forwarded to review service)

### Users (Protected)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Cart (Protected)
- `GET /api/cart` - Get cart items
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/:itemId` - Remove item from cart

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - List user orders

### Payments (Protected)
- `POST /api/payments/process` - Process payment
- `GET /api/payments/:id` - Get payment status

### Notifications (Protected)
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications/mark-read` - Mark notifications as read

### Admin (Protected)
- `GET /api/admin/dashboard` - Admin dashboard
- `GET /api/admin/users` - List all users
- `POST /api/admin/orders/export` - Export orders

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

The gateway verifies the token using the `JWT_SECRET` and attaches user data to the request before proxying to the backend service.

## Error Handling

The gateway handles various error scenarios:

- **Invalid/Expired Tokens** - Returns 401 with "Invalid or expired token"
- **Missing Tokens** - Returns 401 with "Access token missing"
- **MongoDB Validation Errors** - Returns 400 with field-specific error messages
- **Duplicate Key Errors** - Returns 400 with field name and "already exists"
- **Invalid Resource IDs** - Returns 400 with "Invalid resource ID"
- **Server Errors** - Returns 500 with generic error message

## CORS Configuration

The gateway allows requests from:
- `http://localhost:5173` (local development)
- `https://the-aussie-outfit-frontend.vercel.app` (production)
- Additional preview deployments

Allowed methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Allowed headers: Content-Type, Authorization

## Deployment

### Docker Deployment

```bash
docker build -t aussie-outfit-api-gateway .
docker run -p 5000:5000 --env-file .env aussie-outfit-api-gateway
```

### Vercel Deployment

The gateway is configured for Vercel deployment with the `vercel.json` configuration:
- Entry point: `src/server.js`
- All routes proxy to the main server handler

## Project Structure

```
src/
├── app.js                 # Express app configuration
├── server.js              # Server entry point
├── routes/
│   └── gateway.routes.js  # Microservice proxy routes
└── middlewares/
    ├── auth.middleware.js    # JWT verification
    └── error.middleware.js   # Error handling
```

## License

This project is released under the MIT License.
