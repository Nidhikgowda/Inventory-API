import express from "express";
import logger from "./middleware/logger.js";
import handler404 from "./middleware/handler404.js";
import errorHandler from "./middleware/errorhandler.js";

import authRouter from "./routes/authRoutes.js";
import inventoryRouter from "./routes/inventoryRoutes.js";

const app = express();

// Parse JSON body
app.use(express.json());

// Simple logger
app.use(logger);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Inventory & Warehouse Management API" });
});

// Routes
app.use("/auth", authRouter);
app.use("/items", inventoryRouter);

// 404 + error handlers
app.use(handler404);
app.use(errorHandler);

export default app;
