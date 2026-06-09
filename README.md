# The Aussie Outfit API Gateway

## Overview

This repository contains the API Gateway for The Aussie Outfit e-commerce platform. The gateway routes client requests to backend microservices, handles authentication, request validation, and applies cross-cutting concerns such as logging and rate limiting.

## Features

- Centralized request routing
- Service discovery and proxying
- Authentication and authorization support
- Request validation and transformation
- Logging and monitoring hooks
- Error handling and retry strategy

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Access to backend service endpoints

### Install

```bash
npm install
```

### Run

```bash
npm start
```

## Configuration

Configuration is typically managed via environment variables or a configuration file. Common settings include:

- `PORT` - port number for the gateway server
- `AUTH_SERVICE_URL` - authentication service endpoint
- `PRODUCT_SERVICE_URL` - product microservice endpoint
- `ORDER_SERVICE_URL` - order microservice endpoint
- `RATE_LIMIT` - request rate limit configuration

## API Routes

### Authentication

- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token

### Products

- `GET /products` - List products
- `GET /products/:id` - Get product details

### Orders

- `POST /orders` - Create order
- `GET /orders/:id` - Get order status

## Development

- Use `npm run dev` for local development with automatic reload
- Add or update route definitions in the gateway router
- Ensure environment variables are set for backend service addresses

## Deployment

Deploy the gateway to your preferred hosting environment, ensuring the gateway can reach each backend microservice and that environment variables are configured correctly.

## License

This project is released under the MIT License.
