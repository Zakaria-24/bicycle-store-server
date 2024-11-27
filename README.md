# Bicycle Shop API

An API for managing bicycle products, handling orders, and calculating revenue. Built with Node.js, Express, and MongoDB, it includes features for CRUD operations on products, creating orders, and calculating revenue.

---

## Features

- **Product Management:**

  - Add new bicycles.
  - Update bicycle details.
  - Fetch bicycle details by ID.
  - Delete bicycles.

- **Order Management:**

  - Create orders with reference to products.
  - Validate stock and calculate total price automatically.
  - Maintain original product details within the order.

- **Revenue Calculation:**

  - Calculate the total revenue generated from all orders.

- **Error Handling:**

  - Global error handling for cleaner code and better debugging.
  - Custom API error class for more meaningful error messages.

- **Validation:**
  - Schema-based validation using Mongoose.
  - Email and data type validation for enhanced security.

---

## Technologies Used

- **Backend Framework:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Language:** TypeScript
- **Development Tools:** Postman for API testing, VS Code for development

---

## API Endpoints

### Products

| Method | Endpoint                           | Description                   |
| ------ | ---------------------------------- | ----------------------------- |
| POST   | `/api/products`                    | Create a new product.         |
| GET    | `/api/products/:productId`         | Fetch product details by ID.  |
| PATCH  | `/api/products/update-product/:id` | Update product details by ID. |
| DELETE | `/api/products/:productId`         | Delete a product by ID.       |

### Orders

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/api/orders`         | Create a new order.      |
| GET    | `/api/orders`         | Fetch all orders.        |
| GET    | `/api/orders/revenue` | Calculate total revenue. |

---

## Installation and Setup

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- A package manager like npm or yarn.

### Steps to Set Up Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/bicycle-shop-api.git
   cd bicycle-shop-api
   ```
2. **Install dependencies:**

- npm install

3. **Set up environment variables:**

- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- NODE_ENV=development

4. **Run the application:**

- npm run dev
