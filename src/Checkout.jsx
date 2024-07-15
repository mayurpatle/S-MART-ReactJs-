import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "./ShoppingCartContext";
import styles from './styles/Checkout.module.css'

const Checkout = () => {
  const { cartItems, clearCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order data to a server
    clearCart(); // Clear the cart after placing the order
    navigate("/orderplaced"); // Navigate to the order placed page
  };

  return (
    <div className={styles.checkout}>
      <h1>Checkout</h1>
      <div className={styles.cartItems}>
        {cartItems.map((item, index) => (
          <div key={index} className={styles.cartItem}>
            <h2>{item.name}</h2>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        <h2>Total: ${totalPrice}</h2>
      </div>
      <form className={styles.checkoutForm} onSubmit={handleSubmit}>
        <h2>Enter your details</h2>
        <div>
          <label>Name</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Address</label>
          <input type="text" name="address" required />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
