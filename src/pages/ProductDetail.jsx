import React from 'react'
import { useState  ,  useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/ProductDetail.css'
const ProductDetail = () => {

    const {productId}  =  useParams() ; 
    const [product   , setProduct ]  = useState(null)  ;
    const [loading, setLoading] = useState(true);
    
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
    <div className='product-detail'>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
    </div>
  )
}

export default ProductDetail

