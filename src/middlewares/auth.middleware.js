// src/middlewares/auth.middleware.js

import jwt from "jsonwebtoken";

const verifyToken = async (
  req,
  res,
  next
) => {

  try {

    // =====================================
    // GET TOKEN FROM HEADER
    // =====================================
    const authHeader =
      req.headers.authorization;


    // =====================================
    // CHECK TOKEN EXISTS
    // =====================================
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        success: false,
        message: "Access token missing"
      });
    }


    // =====================================
    // EXTRACT TOKEN
    // =====================================
    const token =
      authHeader.split(" ")[1];


    // =====================================
    // VERIFY TOKEN
    // =====================================
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    // =====================================
    // ATTACH USER DATA
    // =====================================
    req.user = decoded;


    // =====================================
    // NEXT MIDDLEWARE
    // =====================================
    next();

  } catch (error) {

    // =====================================
    // INVALID TOKEN
    // =====================================
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

export default verifyToken;