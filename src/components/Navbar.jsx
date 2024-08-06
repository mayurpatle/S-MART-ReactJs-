import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import styles from "../styles/Navbar.module.css";
import { WishlistContext } from "../WishlistContext";
import AvatarDropdown from "./AvatarDropdown";
import { ShoppingCartContext } from "../ShoppingCartContext";

const Navbar = ({ onSearch }) => {
  const { currentUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
   
  const {uniqueWishlistItems }  = useContext(WishlistContext)  ; 
  const {uniqueCartItems }  = useContext(ShoppingCartContext)   ;  


  const isAdmin =
    currentUser && currentUser.email === "mayurpatle108@gmail.com"; // Replace with your admin email

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/"><img src="../../public/smart_logo.png" alt="company logo"></img></Link>
      </div>
      <div className={styles.leftContainer}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart {
          (currentUser ? ((uniqueCartItems.length)) :  "")
        }</Link>
        <Link to="/wishlist">Wishlist {
          (currentUser ? ((uniqueWishlistItems.length)) :  "")
        }
        
        
        </Link>{" "}
        {/* Wishlist link */}
        {currentUser && <Link to="/orders">Orders</Link>}
        {isAdmin && <Link to="/admin">Admin Dashboard</Link>} {/* Admin link */}
      </div>
      <div className={styles.rightContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className={styles.searchInput}
        />
        {currentUser ? (
          <AvatarDropdown /> // Use the AvatarDropdown component
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
