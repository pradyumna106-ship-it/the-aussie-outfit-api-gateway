import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import gatewayRoutes from "./routes/gateway.routes.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();


// SECURITY
app.use(helmet());

app.use(morgan("dev"));


// CORS
app.use(
  cors({
    origin: "*",

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS"
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ],

    credentials: true
  })
);


// BODY PARSER
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);


// HEALTH CHECK
app.get("/", (req, res) => {

  return res.status(200).json({
    success: true,
    message: "API Gateway Connected Successfully"
  });
});


// ROUTES
app.use("/api", gatewayRoutes);


// ERROR HANDLER
app.use(errorMiddleware);

export default app;