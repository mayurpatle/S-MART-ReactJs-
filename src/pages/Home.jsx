import React ,  {useState ,  useEffect } from 'react'
import { motion, useAnimation, useScroll  } from 'framer-motion';
import styles from  '../styles/Home.module.css'
import CustomCarousel  from '../components/CustomCarousel';
import Whatsapp from  '../components/Whatsapp'
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
const Home = () => {
  const  [images ,  setImages ]  = useState([])   ; 
  const controls = useAnimation();
  const { scrollY } = useScroll();


  useEffect(() => {
    fetch('/discount.json')
      .then(response => response.json())
      .then((data) => {
        const img = data.map((p) => p.img);
        setImages(img); // set images  state with fetched images
      })
      .catch((error) => console.error("Error fetching data:", error)); // Handle errors
  }  ,  []   )  ;  

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 100) {
        controls.start({ backgroundColor: 'linear-gradient(180deg, #000, #333)' });
      } else {
        controls.start({ backgroundColor: 'linear-gradient(180deg, #fff, #ddd)' });
      }
    });
  }, [scrollY, controls]);

  

  return (
    <>
    <div className={styles.hero} >

      <div className={styles.herocontent}>
            <h1>Art of Living Spaces</h1>
            <p >Transforming your home into a masterpiece with exquisite furniture.</p>
            <Link to="/products" className={styles.ctabutton} >Shop Now  </Link>
      </div> 
      

    </div>
    
      <div className={styles.discount}>
        <h1>Discounts on the Way! </h1>
        {/* write   some  content   message  for  ecommerce  home page */}

        
      </div>
      <AnimatedSection>
      <CustomCarousel  images={images} />
      </AnimatedSection>
      <Whatsapp />
      
    </>
  );
}

export default Home