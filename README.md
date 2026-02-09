# Earthloom - Sustainable E-commerce Platform

## 📌 Overview
Earthloom is a modern e-commerce application dedicated to sustainable and eco-friendly products. It features a responsive UI, dynamic product catalog, and a RESTful API to manage and serve product data effectively.

## 🚀 Features
- **Dynamic Product Catalog**: Products and categories are fetched dynamically from a backend database.
- **Search & Filter**: Advanced filtering by category, price range, and customer rating.
- **Cart & Wishlist**: Fully functional shopping cart and wishlist management.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across all devices.
- **REST API**: Custom Node.js/Express backend serving data and static assets.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: SQLite (Lightweight and zero-configuration)
- **State Management**: React Context API

## ⚙️ Installation & Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/earthloomenquiry/earthloom.git
cd earthloom
```

### 2. Backend Setup
The backend handles the API and database connection.
```bash
cd backend
npm install
npm run dev
```
> **Note:** If `npm run dev` fails or hangs, you can manually start the server:
> ```bash
> node server.js
> ```
*The server runs on `http://localhost:3000`.*

### 3. Frontend Setup
Open a new terminal in the project root directory to start the React application.
```bash
npm install
npm run dev
```
*The application will open at `http://localhost:5173`.*

## 🔌 API Endpoints
- `GET /api/products`: Retrieve list of all products.
- `GET /api/products/:id`: Retrieve details for a specific product.
- `GET /api/categories`: Retrieve list of product categories.

## 📂 Project Structure
- **backend/**: Contains `server.js`, `database.js` (SQLite configuration), and `earthloom.db`.
- **src/**: React frontend code (components, pages, context, services).
- **public/**: Static assets including product images.

---
Developed for Earthloom.
