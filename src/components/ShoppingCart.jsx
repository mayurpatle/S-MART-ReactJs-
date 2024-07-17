// src/components/ShoppingCart.js
import React, { useContext } from "react";
import { ShoppingCartContext } from "../ShoppingCartContext";
import styles from "../styles/ShoppingCart.module.css";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearCart } =
    useContext(ShoppingCartContext);


  

  return (
    <div className={styles.shoppingCart}>
      <h1>Shopping Cart</h1>
      <div className={styles.cartItems}>
        {cartItems.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              <h2>{item.name}</h2>
              <p>${item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
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
