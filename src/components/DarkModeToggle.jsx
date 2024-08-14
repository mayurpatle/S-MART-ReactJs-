// DarkModeToggle.jsx
import React from "react";
import styles from "../styles/DarkModeToggle.module.css";

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button onClick={toggleDarkMode} className={`${isDarkMode ?  styles.toggleButtonDark  : styles.toggleButton }`}>
      {isDarkMode   ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
