import React ,  {useState ,  useEffect } from 'react'
import styles from  '../styles/Home.module.css'
import CustomCarousel  from '../components/CustomCarousel';
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
      <div className={styles.home}>
        <h1>Welcome to the Home Page</h1>
        {/* write   some  content   message  for  ecommerce  home page */}

        <p>This is a basic e-commerce home page.</p>
      </div>
      <CustomCarousel  images={images} />
    </>
  );
}

export default Home