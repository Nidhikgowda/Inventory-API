import express from "express";
import {
  getItems,
  getItemById,
  createNewItem,
  updateItem,
  deleteItem,
  testController, // <-- import test controller
} from "../controllers/inventoryControllers.js";

import { auth, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// All require auth
router.get("/", auth, getItems);
router.get("/:id", auth, getItemById);

// Admin + WarehouseStaff
router.post("/", auth, authorizeRoles("ADMIN", "WAREHOUSE_STAFF"), createNewItem);
router.put("/:id", auth, authorizeRoles("ADMIN", "WAREHOUSE_STAFF"), updateItem);

// Only Admin
router.delete("/:id", auth, authorizeRoles("ADMIN"), deleteItem);

// ==================== TEST ROUTE (for Git commit) ====================
router.get("/test", auth, testController);

export default router;
