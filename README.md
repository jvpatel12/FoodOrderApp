# 🍽️ Food Order App

A modern, full-stack food ordering application built with React and Node.js/Express.

## 📋 Project Overview

The Food Order App is a responsive web application that allows users to browse available meals, add items to their cart, and complete orders with customer details. The app features a clean user interface, real-time cart management, and order submission with validation.

## ✨ Key Features

- **Browse Meals** — Display available meals fetched from the backend API
- **Shopping Cart** — Add/remove items with quantity management
- **Checkout Form** — Collect customer details (full name, street, email, phone)
- **Form Validation** — Email and phone number validation with error messages
- **Order Submission** — Submit orders to the backend with success confirmation
- **Success Message** — Visual feedback after successful order placement
- **Error Handling** — Comprehensive error handling with user-friendly messages
- **Custom HTTP Hook** — Reusable `useHttp` hook for API calls with loading states
- **Responsive Design** — Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** — UI library with hooks
- **Vite** — Fast build tool and dev server
- **Context API** — State management for cart and user progress

### Backend
- **Node.js** — JavaScript runtime
- **Express** — Web framework
- **Body Parser** — JSON request parsing
- **File System** — JSON-based data persistence

## 📁 Project Structure

```
01-starting-project/
├── src/                          # React source code
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # React entry point
│   ├── index.css                 # Global styles
│   ├── assets/
│   │   ├── logo.jpg             # App logo
│   │   └── formatting.js        # Utility functions (currency formatting)
│   ├── Components/
│   │   ├── Header.jsx           # Navigation header with cart button
│   │   ├── Meals.jsx            # Meals listing component
│   │   ├── Mealitem.jsx         # Individual meal item
│   │   ├── Cart.jsx             # Shopping cart modal
│   │   ├── Checkout.jsx         # Checkout form with order submission
│   │   └── UI/
│   │       ├── Button.jsx       # Reusable button component
│   │       └── Model.jsx        # Modal component (dialog)
│   └── Hooks/
│       ├── CartContext.jsx      # Cart state management
│       ├── UserProgressContext.jsx  # App flow state (cart/checkout)
│       └── useHttp.js           # Custom HTTP hook
├── backend/                      # Node.js/Express server
│   ├── app.js                   # Server entry point
│   ├── package.json             # Backend dependencies
│   ├── data/
│   │   ├── available-meals.json # Menu data
│   │   └── orders.json          # Submitted orders
│   └── public/                  # Static assets
├── public/                       # Frontend static assets
├── package.json                 # Frontend dependencies
├── vite.config.js              # Vite configuration
└── index.html                  # HTML entry point
```

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Frontend Setup

1. Navigate to project root:
```bash
cd 01-starting-project
```

2. Install dependencies:
```bash
npm install
```

3. Start dev server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node app.js
```

The backend API will run on `http://localhost:3000`

## 📖 How to Use

1. **View Meals** — Open the app and see available meals with prices
2. **Add to Cart** — Click on a meal to add it to your cart
3. **Manage Cart** — Click the "Cart" button in the header to view items, adjust quantities, or remove items
4. **Checkout** — Click "Go to Checkout" in the cart modal
5. **Fill Details** — Enter your full name, street address, email, and phone number
6. **Submit** — Click "Confirm" to place your order
7. **Success** — See the success message confirming your order

## 🔑 Key Components

### Header Component (`Header.jsx`)
- Displays app title and logo
- Shows cart button with item count
- Handles cart modal opening

### Meals Component (`Meals.jsx`)
- Fetches meals from backend `/meals` endpoint
- Displays meal list with MealItem components
- Manages meal selection

### Cart Component (`Cart.jsx`)
- Modal showing cart items and total price
- Add/remove item quantities
- Checkout navigation
- Connected to CartContext and UserProgressContext

### Checkout Component (`Checkout.jsx`)
- Form for collecting customer details
- Client-side validation
- Order submission via `useHttp` hook
- Success message display with auto-close
- Error handling and user feedback

### useHttp Hook (`useHttp.js`)
Custom React hook for HTTP requests:
- Handles GET/POST requests
- Loading state management
- Error handling (network, HTTP, parsing)
- Request cancellation support
- Can be reused across components

## 🔄 Data Flow

```
User → Header (view cart)
   ↓
Meals Component (display items)
   ↓
User adds item → CartContext stores it
   ↓
User opens Cart → Shows items with remove/adjust quantity
   ↓
User clicks "Go to Checkout" → Shows Checkout form
   ↓
User fills form → submitHandler validates & calls useHttp
   ↓
useHttp sends POST to backend → backend saves order
   ↓
Success message → Auto-close & cart cleared
```

## 📡 Backend API Endpoints

### GET `/meals`
Fetches available meals
```json
[
  { "id": 1, "name": "Pizza", "price": 12.99, "description": "..." },
  { "id": 2, "name": "Burger", "price": 9.99, "description": "..." }
]
```

### POST `/orders`
Submits a new order
```json
{
  "order": {
    "items": [{ "id": 1, "name": "Pizza", "quantity": 2, "price": 12.99 }],
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "street": "123 Main St",
      "phone": "555-1234",
      "postal-code": "00000",
      "city": "Unknown"
    }
  }
}
```

Response (success):
```json
{ "message": "Order created!" }
```

## 🧪 Testing the App

1. Start both frontend and backend servers
2. Add multiple items to cart
3. Click Cart button to view items
4. Test cart operations (increase/decrease quantity, remove items)
5. Click "Go to Checkout"
6. Test form validation:
   - Leave fields empty
   - Enter invalid email
   - Enter invalid phone
7. Fill all fields correctly and submit
8. See success message
9. Cart should be cleared and modal closes

## 🎨 Styling

The app uses CSS for styling with:
- Modal dialogs for cart and checkout
- Responsive button components
- Error message styling
- Success message styling with checkmark

## 🔐 Error Handling

The app handles various error scenarios:
- **Network Errors** — Connection issues are caught and displayed
- **HTTP Errors** — Backend validation errors are shown to users
- **Form Validation** — Client-side validation with error messages
- **JSON Parsing** — Invalid responses are handled gracefully

## 📝 Context Providers

### CartContext
Manages shopping cart state:
- `items` — Array of cart items
- `addItem(item)` — Add item to cart
- `removeItem(id)` — Remove item from cart

### UserProgressContext
Manages app flow state:
- `progress` — Current page ("cart" or "checkout")
- `showCart()` — Display cart modal
- `hideCart()` — Hide cart modal
- `showCheckout()` — Display checkout modal
- `hideCheckout()` — Hide checkout modal

## 🚀 Future Enhancements

- Add product filtering/search
- Implement user authentication
- Add order history/tracking
- Payment gateway integration
- Database instead of JSON files
- Admin panel for menu management
- Email notifications for orders
- Rating/review system

## 📄 License

This project is part of a React learning course.

---

**Happy Ordering! 🍕🍔🍜**
#   F o o d O r d e r A p p  
 