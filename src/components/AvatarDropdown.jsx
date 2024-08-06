// src/components/AvatarDropdown.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import styles from "../styles/AvatarDropdown.module.css"; // You will create this CSS file
import { WishlistContext } from "../WishlistContext";
const AvatarDropdown = () => {
  const { currentUser } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const {wishlistItems}  = useContext(WishlistContext)
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div className={styles.avatarDropdown}>
      <img
        src="avatar.png" // Replace with your avatar image path or a user's profile image
        alt="User Avatar"
        onClick={toggleDropdown}
        className={styles.avatarImage}
      />
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          <h4 className={styles.email}>{currentUser.email}</h4>
          <h4><Link to="/wishlist" className={styles.menu}>Wishlist {
          (currentUser ? ((wishlistItems.length)) :  "")
        }
        
        
          </Link>{" "}</h4>
          <h4><Link to="/profile" className={styles.menu}>My Profile</Link></h4>
          <h4 onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </h4>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;

