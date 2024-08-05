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
    if (!currentUser) return;
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    if (!currentUser) return;
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const uniqueCartItems = cartItems.reduce((acc, item) => {
    const foundItem = acc.find(accItem => accItem.id === item.id);
    if (foundItem) {
      foundItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <ShoppingCartContext.Provider
      value={{ uniqueCartItems , cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
