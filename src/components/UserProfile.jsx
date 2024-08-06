import React    ,  {useContext   ,  useState ,  useEffect } from  'react'  ; 
import { AuthContext } from '../AuthContext';
import { useOrders} from  '../OrderContext'  ; 
import { WishlistContext } from '../WishlistContext';
import styles from "../styles/UserProfile.module.css"; 


const  UserProfile = () => {
    const {currentUser}  =   useContext(AuthContext)  ;  
    const {orders }  = useOrders() ;  
    const  {wishlistItems  }  = useContext(WishlistContext)  ;  
    const [userOrders , setuserOrders]  = useState([]) ;   

    useEffect(()=>{
        if (currentUser){
            const filteredOrders = orders.filter(order =>  order.userId === currentUser.uid) ;  
            setuserOrders(filteredOrders)  ; 

        }
    },  [currentUser , orders  ]);  

    if(!currentUser){
        return <p> Please Log in to view  your  profile  </p>

    }


    return(
        <div className={styles.userProfile}>
            <h1>User Profile</h1>
            <div className={styles.userDetails}>
                <h2> User Details </h2>
                <p> Email  :  {currentUser.email} </p>
            </div>

            <div className={styles.orderHistory}>
                <h2>Order History </h2>
                {
                    userOrders.length === 0 ? (
                        <p> No Orders Found  </p>
                    ) : (
                        <ul>
                            {
                                userOrders.map((order , index )   => (
                                    <li key={index}>
                                        <p> Order ID : {order.id}</p>
                                        <p> Total : ${order.total}</p>
                                        <p> Order Date : {new Date(order.orderDate).toLocaleDateString()}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }

            </div>
            <div className={styles.wishlist}>
        <h2>Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p>No items in the wishlist.</p>
        ) : (
          <ul>
            {wishlistItems.map((item, index) => (
              <li key={index}>
                <p>{item.name}</p>
                <p>${item.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

        </div>
    );  


};  

export default  UserProfile  ; 
