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
import Orders from "./pages/Orders";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { OrderProvider } from "./OrderContext";
import AdminDashboard from "./pages/AdminDashboard";
import ErrorBoundary  from "./ErrorBoundary";
import Wishlist from "./components/Wishlist";
import { WishlistProvider } from "./WishlistContext";

function App() {
  
  const [searchQuery, setSearchQuery] = React.useState("");
  
  return (
    <AuthProvider>
      <OrderProvider>
        <ShoppingCartProvider>
          <WishlistProvider>
            
            <Navbar onSearch={setSearchQuery} />
            <Routes>
              
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <Home />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/products"
                element={<Products searchQuery={searchQuery} />}
              />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <ShoppingCart />
                  </ProtectedRoute>
                }
              />
              <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
              <Route
                path="/orderplaced"
                element={
                  <ProtectedRoute>
                    <OrderPlaced />
                  </ProtectedRoute>
                }
              />
              {/* Add route for OrderPlaced */}
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin" element={<AdminDashboard />} />{" "}
              {/* Add route for AdminDashboard */}
            </Routes>
          </WishlistProvider>
        </ShoppingCartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
