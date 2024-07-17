import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useOrders } from "../OrderContext";
import styles from "../styles/Orders.module.css";

const Orders = () => {
  const { currentUser } = useContext(AuthContext);
  const { orders } = useOrders();

  if (!currentUser) {
    return <p>Please log in to view your orders.</p>;
  }

  const userOrders = orders.filter((order) => order.userId === currentUser.uid);

  return (
    <div className={styles.orders}>
      <h1>Your Orders</h1>
      {userOrders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className={styles.orderList}>
          {userOrders.map((order) => (
            <div key={order.orderId} className={styles.orderItem}>
              <h3>Order ID: {order.orderId}</h3>
              <p>Total: ${order.total}</p>
              <h4>Items:</h4>
              {order.items.map((item, index) => (
                <p key={index}>
                  {item.name} - ${item.price}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
