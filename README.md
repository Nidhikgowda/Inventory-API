# Inventory API

A Node.js & Express.js REST API for managing inventory with **Role-Based Access Control (RBAC)**, JWT authentication, pagination, filtering, and CRUD operations for products/items.

---

## Features

- **User Authentication** with JWT
- **Role-Based Access Control**: `admin`, `user`
- **CRUD Operations** for inventory items (Create, Read, Update, Delete)
- **Pagination & Filtering** of items
- **Password Hashing** using bcrypt
- **Middleware**: request logger, error handler, role check

---

## Project Structure

inventory-api/
├── package.json
├── README.md
└── src/
├── server.js
├── app.js
├── database/
│ └── memory.js
├── models/
├── middleware/
│ ├── auth.js
│ ├── role.js
│ ├── logger.js
│ ├── 404handler.js
│ └── errorHandler.js
├── routes/
│ ├── userRoutes.js
│ └── productRoutes.js
└── controllers/
├── userController.js
└── productController.js


---

## Environment Variables

Create a `.env` file in the root:



PORT=5000
JWT_SECRET=mysecret123


---

## API Endpoints

### Users

| Method | Endpoint   | Auth Required? |
|--------|------------|----------------|
| POST   | /register  | No             |
| POST   | /login     | No             |
| GET    | /profile   | Yes (JWT)      |

### Products / Inventory Items

| Method | Endpoint           | Roles Allowed |
|--------|------------------|---------------|
| GET    | /products         | admin, user   |
| GET    | /products/:id     | admin, user   |
| POST   | /products         | admin         |
| PUT    | /products/:id     | admin         |
| DELETE | /products/:id     | admin         |

---

## Pagination & Filtering

Supports query parameters:



page, limit, category, minPrice, maxPrice, search


**Example:**



/products?search=laptop&category=electronics&page=1&limit=10


---

## RBAC & Authentication

- JWT authentication to verify user identity  
- Role middleware to check allowed roles  
- Unauthorized access returns **403 Forbidden**

---

## Middleware

- **Logger**: logs every HTTP request  
- **404 Handler**: handles unknown routes with a clean 404 response  
- **Error Handler**: global middleware for server errors  

---

## Setup & Running Locally

```bash
# Install dependencies
npm install

# (Optional) Install nodemon for development
npm install --save-dev nodemon

# Run in development
npm run dev

# Run in production mode
npm start
