// src/ShoppingCartContext.js
import React, { createContext, useState , useEffect  , useContext } from "react";
import { AuthContext } from "./AuthContext";
export const ShoppingCartContext = createContext();

const ShoppingCartProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    if (currentUser) {
      const storedCartItems =
        JSON.parse(localStorage.getItem(`cart_${currentUser.uid}`)) || [];
      setCartItems(storedCartItems);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        `cart_${currentUser.uid}`,
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, currentUser]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
