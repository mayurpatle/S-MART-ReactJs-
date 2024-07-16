import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import styles from "../styles/Orders.module.css";

const Orders = () => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        const db = getFirestore();
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map((doc) => doc.data());
        setOrders(ordersList);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const  clear = () => {
    setOrders([]);
  }

  

  return (
    <div className={styles.ordersContainer}>
        <h1> your Orders </h1>
        {orders.length ===  0 ? (
            <p>no orders found </p>
        ): (
            orders.map((order, index ) => (
                <div key={index} className={styles.order}>
                    <h2> Order #{order.orderId}</h2>
                    <p>
                        {order.items.map(item => (
                            <span key={item.name}> {item.name} - ${item.price} </span>
                        ))}
                    </p>
                     <p>Total: ${order.total}</p>
                    
                </div>
            ))
        )
        }

        <button onClick={clear}> Clear all  Orders </button>

    </div>
  );
};

export default Orders;
