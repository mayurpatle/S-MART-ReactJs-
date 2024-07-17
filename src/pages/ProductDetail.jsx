import React from 'react'
import { useState  ,  useEffect , useContext} from 'react'
import { useParams } from 'react-router-dom'
import styles from '../styles/ProductDetail.module.css';
import { ShoppingCartContext } from "../ShoppingCartContext";
import Reviews from '../components/Reviews';
const ProductDetail = () => {

    const {productId}  =  useParams() ; 
    const [product   , setProduct ]  = useState(null)  ;
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(ShoppingCartContext);
    
    useEffect(() => {
        console.log("Fetching product data...");
        fetch('/products.json')
        .then(response  => response.json())
        .then(data =>{
            console.log("Fetched product data:", data);
            const selectedProduct  =  data.find(p => p.id === parseInt(productId)) ;
            setProduct(selectedProduct) ;
            setLoading(false);


        })  ; 

    }  ,  [productId])  ; 

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!product) {
      return <p>Product not found</p>;
    }

    
    
    return (
      <div className={styles.productDetail}>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <br></br>
        <p>{product.info}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <Reviews productId={productId} />
      </div>
    );
}

export default ProductDetail

