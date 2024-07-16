import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCartProvider from "./ShoppingCartContext";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./Checkout";
import OrderPlaced from "./pages/OrderPlaced";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { AuthProvider } from "./AuthContext";
function App() {
  const [cartItems, setCartItems] = React.useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} />}
          />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/orderplaced" element={<OrderPlaced />} />{" "}
          {/* Add route for OrderPlaced */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ShoppingCartProvider>
    </AuthProvider>
  );
}

export default App;
