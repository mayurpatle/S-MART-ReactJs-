import React ,  {useEffect} from "react";

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
import UserProfile from "./components/UserProfile";
import styles from './App.module.css'
function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode");
    if (storedTheme) {
      setIsDarkMode(JSON.parse(storedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  
  return (
    <AuthProvider>
      <OrderProvider>
        <ShoppingCartProvider>
          <WishlistProvider>
            <div className={styles.app}> 
            <Navbar onSearch={setSearchQuery} isDarkMode = {isDarkMode}  toggleDarkMode = {toggleDarkMode} />
            <Routes>
              
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <Home  isDarkMode=  {isDarkMode} />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/products"
                element={<Products searchQuery={searchQuery} isDarkMode= {isDarkMode} />}
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

              <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
              /> {/* Add route for UserProfile */}
            </Routes>
            {/* Toast container for notifications */}
            
            </div>
            <br></br>
            <br></br>
          </WishlistProvider>
        </ShoppingCartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
