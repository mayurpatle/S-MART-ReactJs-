import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { auth } from "../firebase";
import styles from "../styles/Navbar.module.css";

const Navbar = ({ onSearch }) => {
  const { currentUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await auth.signOut();
  };

  const isAdmin =
    currentUser && currentUser.email === "mayurpatle108@gmail.com"; // Replace with your admin email

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">S-MART</Link>
      </div>
      <div className={styles.leftContainer}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
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
          <>
            <span className={styles.userEmail}>{currentUser.email}</span>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </>
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
