import React ,  {useState ,  useEffect } from 'react'
import styles from  '../styles/Home.module.css'
import CustomCarousel  from '../components/CustomCarousel';
import Whatsapp from  '../components/Whatsapp'
import { Link } from 'react-router-dom';
const Home = () => {
  const  [images ,  setImages ]  = useState([])   ; 

  useEffect(() => {
    fetch('/discount.json')
      .then(response => response.json())
      .then((data) => {
        const img = data.map((p) => p.img);
        setImages(img); // set images  state with fetched images
      })
      .catch((error) => console.error("Error fetching data:", error)); // Handle errors
  }  ,  []   )

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
      <CustomCarousel  images={images} />
      <Whatsapp />
      
    </>
  );
}

export default Home