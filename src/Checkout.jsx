import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Checkout.module.css";
import { AuthContext } from "./AuthContext";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const Checkout = () => {
  const { currentUser } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    console.log("Cart Items: ", cartItems);
    console.log("Total Price: ", totalPrice);
  }, [cartItems, totalPrice]);

  const handleSubmit = async (event) => {
    navigate("/orderplaced");
    event.preventDefault();
    const formData = new FormData(event.target);
    const order = {
      userId: currentUser.uid,
      items: cartItems,
      total: totalPrice,
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      orderId: new Date().getTime(),
    };

    try {
      const db = getFirestore();
      await addDoc(collection(db, "orders"), order);
      clearCart(); 
      navigate("/orderplaced");
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  return (
    <div className={styles.checkout}>
      <h1>Checkout</h1>
      <div className={styles.cartItems}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              <h2>{item.name}</h2>
              <p>${item.price}</p>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
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
