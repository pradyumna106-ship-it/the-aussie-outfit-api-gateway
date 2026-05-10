// src/routes/gateway.routes.js

import express from "express";

import {
  createProxyMiddleware
} from "http-proxy-middleware";

import verifyToken from "../middlewares/auth.middleware.js";

const router = express.Router();


// =====================================
// AUTH SERVICE (PUBLIC)
// =====================================
router.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE,
    changeOrigin: true,

    pathRewrite: {
      "^/auth": ""
    },

    on: {
      proxyReq: (proxyReq, req) => {

        if (
          req.body &&
          Object.keys(req.body).length
        ) {

          const bodyData =
            JSON.stringify(req.body);

          proxyReq.setHeader(
            "Content-Type",
            "application/json"
          );

          proxyReq.setHeader(
            "Content-Length",
            Buffer.byteLength(bodyData)
          );

          proxyReq.write(bodyData);
        }
      }
    }
  })
);

// =====================================
// PRODUCT SERVICE (PUBLIC)
// =====================================
router.use(
  "/products",
  createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE,
    changeOrigin: true,

    pathRewrite: {
      "^/products": ""
    }
  })
);


// =====================================
// REVIEW SERVICE (PUBLIC)
// =====================================
router.use(
  "/reviews",
  createProxyMiddleware({
    target: process.env.REVIEW_SERVICE,
    changeOrigin: true,

    pathRewrite: {
      "^/reviews": ""
    }
  })
);


// =====================================
// USER SERVICE (PROTECTED)
// =====================================
router.use(
  "/users",
  verifyToken,
  createProxyMiddleware({
    target: process.env.USER_SERVICE,
    changeOrigin: true,

    pathRewrite: {
      "^/users": ""
    }
  })
);


// =====================================
// CART SERVICE (PROTECTED)
// =====================================
router.use(
  "/cart",
  verifyToken,
  createProxyMiddleware({
    target: process.env.CART_SERVICE,
    changeOrigin: true,

    pathRewrite: {
      "^/cart": ""
    }
  })
);


// =====================================
// ORDER SERVICE (PROTECTED)
// =====================================
router.use(
  "/orders",
  verifyToken,
  createProxyMiddleware({
    target: process.env.ORDER_SERVICE,
    changeOrigin: true,

    pathRewrite: {
      "^/orders": ""
    }
  })
);


// =====================================
// PAYMENT SERVICE (PROTECTED)
// =====================================
router.use(
  "/payments",
  verifyToken,
  createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE,
    changeOrigin: true,

    pathRewrite: {
      "^/payments": ""
    }
  })
);


// =====================================
// NOTIFICATION SERVICE (PROTECTED)
// =====================================
router.use(
  "/notifications",
  verifyToken,
  createProxyMiddleware({
    target: process.env.NOTIFICATION_SERVICE,
    changeOrigin: true,

    pathRewrite: {
      "^/notifications": ""
    }
  })
);


// =====================================
// ADMIN SERVICE (ADMIN ONLY)
// =====================================
router.use(
  "/admin",
  verifyToken,
  createProxyMiddleware({
    target: process.env.ADMIN_SERVICE,
    changeOrigin: true,

    pathRewrite: {
      "^/admin": ""
    }
  })
);


export default router;