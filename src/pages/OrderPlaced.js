import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/OrderPlaced.module.css";

const OrderPlaced = () => {
  return (
    <div className={styles.orderPlaced}>
      <h1>Congratulations!</h1>
      <p>Your order has been placed successfully.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default OrderPlaced;
