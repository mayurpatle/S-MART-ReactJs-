// src/components/AnimatedSection.js
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from '../styles/AnimatedSection.module.css';

const AnimatedSection = ({ children ,  isDarkMode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: { duration: 5 },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100, rotateY: 90 }}
      animate={controls}
      className={` ${
                  isDarkMode ? styles.animatedSectionDark : styles.animatedSection
                }`}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
