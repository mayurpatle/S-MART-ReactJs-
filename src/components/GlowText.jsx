import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/GlowText.module.css';

const GlowText = ({ children }) => {
  return (
    <motion.h1
      className={styles.glowText}
      whileHover={{
        textShadow: "0px 0px 8px rgba(255, 255, 255, 1), 0px 0px 10px rgba(0, 0, 255, 1), 0px 0px 10px rgba(0, 255, 255, 1)",
        scale: 1.1,
        rotate: 5,
        transition: {
          duration: 0.3,
        },
      }}
    >
      {children}
    </motion.h1>
  );
};

export default GlowText;
