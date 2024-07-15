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
function App() {
  const [cartItems, setCartItems] = React.useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/orderplaced" element={<OrderPlaced />} />{" "}
        {/* Add route for OrderPlaced */}
      </Routes>
    </ShoppingCartProvider>
  );
}

export default App;
