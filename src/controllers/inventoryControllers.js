import { items, nextItemId } from "../database/memory.js";
import { createItem } from "../models/itemModel.js";

// GET /items  (list with filters + pagination)
export const getItems = (req, res, next) => {
  try {
    let {
      category,
      vendor,
      minStock,
      maxStock,
      minPrice,
      maxPrice,
      page,
      limit,
    } = req.query;

    // convert to numbers
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    minStock = minStock !== undefined ? parseInt(minStock) : undefined;
    maxStock = maxStock !== undefined ? parseInt(maxStock) : undefined;
    minPrice = minPrice !== undefined ? parseFloat(minPrice) : undefined;
    maxPrice = maxPrice !== undefined ? parseFloat(maxPrice) : undefined;

    let filtered = [...items];

    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }
    if (vendor) {
      filtered = filtered.filter((item) => item.vendor === vendor);
    }
    if (minStock !== undefined && !Number.isNaN(minStock)) {
      filtered = filtered.filter((item) => item.stock >= minStock);
    }
    if (maxStock !== undefined && !Number.isNaN(maxStock)) {
      filtered = filtered.filter((item) => item.stock <= maxStock);
    }
    if (minPrice !== undefined && !Number.isNaN(minPrice)) {
      filtered = filtered.filter((item) => item.price >= minPrice);
    }
    if (maxPrice !== undefined && !Number.isNaN(maxPrice)) {
      filtered = filtered.filter((item) => item.price <= maxPrice);
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / limit);

    const start = (page - 1) * limit;
    const end = start + limit;
    const pageItems = filtered.slice(start, end);

    res.json({
      page,
      limit,
      total_items: totalItems,
      total_pages: totalPages,
      items: pageItems,
    });
  } catch (err) {
    next(err);
  }
};

// GET /items/:id
export const getItemById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const item = items.find((i) => i.id === id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    next(err);
  }
};

// POST /items  (Admin or WarehouseStaff)
export const createNewItem = (req, res, next) => {
  try {
    const { name, category, stock, price, vendor } = req.body;

    if (!name || !category || stock === undefined || price === undefined || !vendor) {
      return res
        .status(400)
        .json({ error: "name, category, stock, price, vendor are required" });
    }

    if (stock < 0 || price < 0) {
      return res
        .status(400)
        .json({ error: "stock and price must be non-negative" });
    }

    const id = nextItemId++; // will update exported let
    const newItem = createItem({
      id,
      name,
      category,
      stock,
      price,
      vendor,
    });

    items.push(newItem);

    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

// PUT /items/:id
export const updateItem = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const item = items.find((i) => i.id === id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const { name, category, stock, price, vendor } = req.body;

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ error: "stock cannot be negative" });
    }

    if (price !== undefined && price < 0) {
      return res.status(400).json({ error: "price cannot be negative" });
    }

    if (name !== undefined) item.name = name;
    if (category !== undefined) item.category = category;
    if (vendor !== undefined) item.vendor = vendor;
    if (stock !== undefined) item.stock = stock;
    if (price !== undefined) item.price = price;

    res.json(item);
  } catch (err) {
    next(err);
  }
};

// DELETE /items/:id  (Admin only)
export const deleteItem = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    items.splice(index, 1);

    res.json({ message: "Item deleted" });
  } catch (err) {
    next(err);
  }
};