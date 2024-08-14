import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from "./styles/Checkout.module.css";
import { AuthContext } from "./AuthContext";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { useOrders } from "./OrderContext";
import axios from "axios";
const Checkout = () => {
  const { currentUser } = useContext(AuthContext);
  const { cartItems, clearCart, removeFromCart } = useContext(ShoppingCartContext);
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const router = useNavigate()  ; 
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [amount  , setAmount ]  = useState("")  ;  

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    if (currentUser) {
      const savedAddresses = JSON.parse(localStorage.getItem(`addresses_${currentUser.uid}`)) || [];
      if (Array.isArray(savedAddresses)) {
        setAddresses(savedAddresses);
        if (savedAddresses.length > 0) {
          setSelectedAddress(savedAddresses[0]);
        }
      }
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("Cart Items: ", cartItems);
    console.log("Total Price: ", totalPrice);
  }, [cartItems, totalPrice]);

  useEffect(()=>{
    setAmount(cartItems.reduce((sum  , item  ) => sum  + item.price , 0 ));

  }, [cartItems])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Save new address to localStorage if it's a new one
    if (newAddress && !addresses.includes(newAddress)) {
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      localStorage.setItem(`addresses_${currentUser.uid}`, JSON.stringify(updatedAddresses));
    }


    const order = {
      userId: currentUser.uid,
      items: cartItems,
      total: totalPrice,
      name: formData.get("name"),
      email: formData.get("email"),
      address: selectedAddress || formData.get("address") || newAddress,
      orderId: new Date().getTime(),
    };

    await addOrder(order);
    clearCart();
    toast.success('order placed')
    navigate("/orderplaced");
  };

  const  handlePayment  = async () => {
    const { data: order } = await axios.post('http://localhost:5000/api/create-order', {
      amount,
      currency: 'INR',
    });

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID',
      amount: order.amount,
      currency: order.currency,
      name: 'Your Company Name',
      description: 'Test Transaction',
      order_id: order.id,
      handler: async function (response) {
        const { data: verification } = await axios.post('http://localhost:5000/api/verify-payment', {
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });

        if (verification.status === 'success') {
          alert('Payment successful!');
          clearCart();
          router.push('/orderplaced');
        } else {
          alert('Payment failed!');
        }
      },
      prefill: {
        name: currentUser?.displayName || 'John Doe',
        email: currentUser?.email || 'johndoe@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();

  }

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
          <select
            name="address"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
          >
            {addresses.length > 0 ? (
              addresses.map((address, index) => (
                <option key={index} value={address}>
                  {address}
                </option>
              ))
            ) : (
              <option value="">No saved addresses</option>
            )}
            <option value="">Enter new address</option>
          </select>
          {selectedAddress === "" && (
            <input
              type="text"
              name="address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter new address"
              required
            />
          )}
        </div>
        <div className={styles.total}>
          <h2>Total: ₹{amount}</h2>
        </div>
        <div className={styles.paymentButton}>
          <button onClick={handlePayment}>Pay Now</button>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;




