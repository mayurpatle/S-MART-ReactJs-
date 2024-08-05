// src/components/AvatarDropdown.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { auth } from "../firebase";
import styles from "../styles/AvatarDropdown.module.css"; // You will create this CSS file

const AvatarDropdown = () => {
  const { currentUser } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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
          <p className={styles.email}>{currentUser.email}</p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
