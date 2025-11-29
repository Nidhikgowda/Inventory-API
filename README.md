# Product Management API

A Node.js & Express.js REST API with Role‑Based Access Control (RBAC), JWT authentication, pagination, filtering, and CRUD operations for products.

---

## Features

- User Authentication (JWT)  
- Role-Based Access Control: `admin`, `user`  
- CRUD operations for products (Create, Read, Update, Delete)  
- Pagination & filtering of products  
- Password hashing (bcrypt)  
- Middleware: request logger, error handler, role check  

---

## Project Structure

product-api/
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



PORT=5000
JWT_SECRET=mysecret123


---

## API Endpoints

### Users

| Method | Endpoint   | Auth required? |
|--------|------------|----------------|
| POST   | `/register` | No             |
| POST   | `/login`    | No             |
| GET    | `/profile`  | Yes (JWT)      |

### Products

| Method | Endpoint             | Roles allowed        |
|--------|----------------------|----------------------|
| GET    | `/products`           | admin, user          |
| GET    | `/products/:id`       | admin, user          |
| POST   | `/products`           | admin                |
| PUT    | `/products/:id`       | admin                |
| DELETE | `/products/:id`       | admin                |

#### Pagination & Filtering

- Query parameters supported: `page`, `limit`, `category`, `minPrice`, `maxPrice`, `search`  
- Example: `/products?search=phone&category=mobile&page=2&limit=5`  

---

## RBAC & Authentication

- JWT authentication to verify user identity  
- Role‑middleware to check for allowed roles; unauthorized access returns 403  

---

## Middleware

- Logger: logs every HTTP request  
- 404 Handler: handles unknown routes with a clean 404 response  
- Error Handler: global error-handling middleware for catching server errors  

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

Testing

You can test the API manually using Postman / Thunder Client.
Automated tests (if present) use Jest + Supertest covering controllers, authentication, RBAC, pagination, and filtering.

License

MIT License

Authors / Contributors

[Your Name] — initial work & maintenance

Acknowledgements

Thanks to all open‑source libraries and contributors that make this project possible.


---

If you want — I can **generate a fully formatted README** (Markdown) based on this template for you — i.e. ready to paste. Do you want me to prepare that now?
::contentReference[oaicite:0]{index=0}