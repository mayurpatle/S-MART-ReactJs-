import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from  '../styles/Carousel.module.css'
const CustomCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className={styles.container}>
        {/* first     */}
        <div className={styles.innerContainer}>
          <div>
            <button onClick={prevSlide} className="">
              ‹
            </button>
          </div>

          {/* Central   */}
          <div className={styles.centralContainer}>
            <div className={styles.c1}>
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
              />
            </div>
            <div className={styles.c2}>
              <h2> Product 1 </h2>
              <p> this is a dumy product </p>
              <div className={styles.price}>
                <h4>Price </h4>
                <h4
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "black",
                  }}
                >
                  {" "}
                  Rs 40000{" "}
                </h4>
              </div>
              <h5> Discounted Price : 25000</h5>

              
            </div>
          </div>

          {/* Last  */}
          <div>
            <button onClick={nextSlide} className="">
              ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

CustomCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CustomCarousel;

