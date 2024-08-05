import React , { useContext} from 'react'
import { WishlistContext } from '../WishlistContext' 
import styles from "../styles/Wishlist.module.css";
const Wishlist = () => {
    const  {wishlistItems  ,  removeFromWishlist }  = useContext(WishlistContext) ;
    
    const  uniqueWishlistItems  = wishlistItems.reduce((acc , item )  => {
      const  foundItem   =  acc.find(accItem   =>  accItem.id === item.id);
      if  (  foundItem){
        foundItem.quantity += 1  ; 

      }else {
        acc.push({...item  ,  quantity : 1  }) ;  

      }

      return acc; 



    } ,  [] )

  return (
    
    <div className={styles.wishlist}>
      <h1> Wishlist </h1>
      <div className={styles.wishlistItems}>
        {uniqueWishlistItems.length === 0 ? (
          <p>No items in the wishlist</p>
        ) : (
          uniqueWishlistItems.map((item) => (
            <div key={item.id} className={styles.wishlistItem}>
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <button onClick={() => removeFromWishlist(item.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
    
  );
}

export default Wishlist