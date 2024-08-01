import { createContext } from 'react';

import React ,  {useState , useEffect  ,    }  from  'react'  ; 

export  const  WishlistContext   =  createContext()  ; 

export const  WishlistProvider = ({ children })  => {
    const   [wishlistItems , setWishlistItems  ]  = useState([])  ;  

    useEffect(() => {
        const  savedWishlist = JSON.parse(localStorage.getItem('wishlist'))   || []    ; 
        setWishlistItems(savedWishlist)    ;  

    }  ,  []  )  ;  

    useEffect(()=> {
        localStorage.setItem('wishlist' , JSON.stringify(wishlistItems))    ;  

    } ,  [wishlistItems])  ;  

    const addToWishlist = (product)  => {
        setWishlistItems((prev)  => [...prev ,  product ])  ; 

    }; 

    const  removeFromWishlist = (productId)  => {
        setWishlistItems((prevItems)  => 
        prevItems.filter((item)  => item.id !== productId));  

    } ;  


    return  (
        <WishlistContext.Provider value={{ wishlistItems , addToWishlist , removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>  
    );  

}