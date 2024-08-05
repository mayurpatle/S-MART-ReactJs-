// src/components/ShoppingCart.js
import React, { useContext } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";
import styles from "../styles/ShoppingCart.module.css";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(ShoppingCartContext);

  // Process cartItems to get unique products with quantities
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
    <div className={styles.shoppingCart}>
      <h1>Shopping Cart</h1>
      <div className={styles.cartItems}>
        {uniqueCartItems.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          uniqueCartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      {uniqueCartItems.length > 0 && (
        <>
          <button onClick={clearCart} className={styles.clearCart}>
            Clear Cart
          </button>
          <Link to="/checkout">
            <button className={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;

