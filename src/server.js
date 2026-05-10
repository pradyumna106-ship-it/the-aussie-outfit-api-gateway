// src/server.js

import dotenv from "dotenv/config";

import app from "./app.js";

const PORT = process.env.PORT || 5000;


// =====================================
// START SERVER
// =====================================
app.listen(PORT, () => {

  console.log(
    `API Gateway running on port ${PORT}`
  );
});