import React from 'react'
import { Link } from 'react-router-dom'
import styles  from '../styles/Navbar.module.css'
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Container for  logo */}
      <div className={styles.logoContainer}></div>
      {/* Container for  search box  */}
      <div className={styles.searchContainer}></div>
      {/*  left container  */}
      <div className= {styles.leftContainer}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar