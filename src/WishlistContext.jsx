import { createContext } from 'react';
import { AuthContext } from "./AuthContext";
import React ,  {useState , useEffect  ,   useContext }  from  'react'  ; 

export  const  WishlistContext   =  createContext()  ; 

export const  WishlistProvider = ({ children })  => {
    const   [wishlistItems , setWishlistItems  ]  = useState([])  ; 
    const { currentUser } = useContext(AuthContext); 

    useEffect(() => {
        if  (currentUser) {
        const  savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${currentUser.uid}`))   || []    ; 
        setWishlistItems(savedWishlist)    ;  
        }
    }  ,  [currentUser]  )  ;  

    useEffect(()=> {
        if ( currentUser){
            localStorage.setItem(`wishlist_${currentUser.uid}` , JSON.stringify(wishlistItems))    ;  
        }

    } ,  [wishlistItems , currentUser])  ;  

    const addToWishlist = (product)  => {
        if (!currentUser) return;
        setWishlistItems((prev)  => [...prev ,  product ])  ; 

    }; 

    const  removeFromWishlist = (productId)  => {
        if (!currentUser) return;
        setWishlistItems((prevItems)  => 
        prevItems.filter((item)  => item.id !== productId));  

    } ;  


    const  uniqueWishlistItems  = wishlistItems.reduce((acc , item )  => {
      const  foundItem   =  acc.find(accItem   =>  accItem.id === item.id);
      if  (  foundItem){
        foundItem.quantity += 1  ; 

      }else {
        acc.push({...item  ,  quantity : 1  }) ;  

      }

      return acc; 



    } ,  [] )


    return  (
        <WishlistContext.Provider value={{ uniqueWishlistItems ,wishlistItems , addToWishlist , removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>  
    );  

}