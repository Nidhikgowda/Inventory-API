// In-memory "database" – simple arrays

export const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // plain for demo
    role: "ADMIN",
  },
  {
    id: 2,
    name: "Warehouse Staff",
    email: "staff@example.com",
    password: "staff123",
    role: "WAREHOUSE_STAFF",
  },
];

export const items = [
  {
    id: 1,
    name: "Dell Monitor",
    category: "Electronics",
    stock: 20,
    price: 8999.99,
    vendor: "Dell",
  },
  {
    id: 2,
    name: "HP Keyboard",
    category: "Electronics",
    stock: 50,
    price: 1299.0,
    vendor: "HP",
  },
];

export let nextUserId = users.length + 1;
export let nextItemId = items.length + 1;