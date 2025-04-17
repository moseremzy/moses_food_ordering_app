# 🍽️ Food Ordering Web App
A full-stack food ordering platform that allows users to browse, order, and track food seamlessly. Built with a modern front-end framework and a robust backend API, the system ensures real-time updates, smooth user interaction, and secure authentication.

## 🛠️ Tech Stack

### Frontend (Client)
- **Vue.js** – For a fast, reactive user interface  
- **Pinia** – State management made simple and scalable  
- **Axios** – Handles HTTP requests to the backend API

### Backend (Server)
- **Express.js** – Lightweight and fast Node.js web framework  
- **CORS** – Ensures only the frontend can securely access the API  
- **express-session** – Manages user sessions for authentication  
- **MySQL** – Relational database for persistent data storage

## ⚙️ Features
- 🔐 **Authentication with Sessions** – Users stay logged in using secure session-based auth handled on the backend  
- 📦 **API-Driven Architecture** – The backend provides RESTful endpoints consumed by the Vue frontend  
- 📊 **State Management with Pinia** – Consistent data across views like cart, orders, and user info  
- 🔄 **CORS Security** – Only requests from the frontend origin are allowed  
- 🧾 **Order Management System** – Customers can place, view, and track orders in real time

## 📁 Folder Structure
```
food_ordering_app/
├── client/               # Vue.js frontend
│   └── src/
│       ├── assets/       # Static files (images)
│       ├── stores/       # Pinia stores (interactive, items, orders, settings, user)
│       ├── router/       # Vue page routes
│       ├── views/        # Vue pages
│       ├── middlewares/  # Custom middlewares (if any)
│       └── components/   # Vue components
│
├── server/               # Express.js backend
│   ├── api/              # Controllers
│   ├── images/           # Static files (images)
│   ├── middlewares/      # Middleware logic (e.g., sessions, auth checks)
│   ├── routes/           # API routes
│   └── views/            # Handlebars mail templates
│
├── food_ordering_app.sql # the actual database file containing db schema
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/moseremzy/moses_food_ordering_app.git
cd food_ordering_app
```

### 2. Install dependencies

**Frontend**
```bash
cd client
npm install
```

**Backend**
```bash
cd ../server
npm install
```

### 3. Run the app

**Backend (Express server)**
```bash
npm start
```

**Frontend (Vue app)**
```bash
npm run dev
```

## 📌 Notes
1. Ensure your MySQL database is running and configured in the backend's `database.js` file  
2. Update the CORS origin in the backend to match your frontend URL  
3. The app is structured to be hosted on the same server using Express to serve both the API and built Vue files
4. Import the food_ordering_app.sql file located in the root folder into your MySQL server before running the backend.

## 📫 Contact
Built with ❤️ by **Agbaoje Moses**  
Feel free to reach out via [GitHub](https://github.com/moseremzy)
