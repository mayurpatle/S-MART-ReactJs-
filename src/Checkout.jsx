import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/Checkout.module.css";
import { AuthContext } from "./AuthContext";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { useOrders } from "./OrderContext";
const Checkout = () => {
  const { currentUser } = useContext(AuthContext);
  const { cartItems, clearCart , removeFromCart } = useContext(ShoppingCartContext);
  const {addOrder}  =  useOrders()  ;  
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

    await addOrder(order);
    clearCart();
    navigate("/orderplaced");  // Redirect to order placed page once order is placed.  // Note: This should be replaced with a real order placement API call.  // Also, make sure to handle any potential errors that may occur during the API call.  // You may want to use a try-catch block to handle these errors.  // Also, consider implementing error handling for the form submission process.  // For example, you could display an error message if the form submission fails.  // Remember to also handle any potential errors that may occur during the order placement process.  // You may want to use a try-catch block to handle these errors.  // Also, consider implementing error handling for the form submission process.  // For example, you could display an error message if the form submission fails.  // You may want to use a try-catch block to handle these errors.  // Also, consider

    
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
    <div className={styles.checkout}>
      <h1>Checkout</h1>
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
