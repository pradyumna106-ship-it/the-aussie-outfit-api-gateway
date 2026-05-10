// src/middlewares/error.middleware.js

const errorMiddleware = (
  err,
  req,
  res,
  next
) => {

  console.error(err.stack);


  // =====================================
  // DEFAULT ERROR
  // =====================================
  let statusCode = err.statusCode || 500;

  let message =
    err.message || "Internal Server Error";


  // =====================================
  // MONGOOSE INVALID OBJECT ID
  // =====================================
  if (err.name === "CastError") {

    statusCode = 400;

    message = "Invalid resource ID";
  }


  // =====================================
  // MONGOOSE DUPLICATE KEY ERROR
  // =====================================
  if (err.code === 11000) {

    statusCode = 400;

    const field = Object.keys(
      err.keyValue
    )[0];

    message = `${field} already exists`;
  }


  // =====================================
  // MONGOOSE VALIDATION ERROR
  // =====================================
  if (err.name === "ValidationError") {

    statusCode = 400;

    message = Object.values(
      err.errors
    )
      .map((val) => val.message)
      .join(", ");
  }


  // =====================================
  // JWT ERROR
  // =====================================
  if (err.name === "JsonWebTokenError") {

    statusCode = 401;

    message = "Invalid token";
  }


  // =====================================
  // JWT EXPIRED ERROR
  // =====================================
  if (err.name === "TokenExpiredError") {

    statusCode = 401;

    message = "Token expired";
  }


  // =====================================
  // FINAL RESPONSE
  // =====================================
  return res.status(statusCode).json({
    success: false,
    message
  });
};

export default errorMiddleware;