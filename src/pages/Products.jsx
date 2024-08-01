import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/Products.module.css";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../ShoppingCartContext";
import { WishlistContext } from "../WishlistContext";
const Products = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const productsPerPage = 5;

  useEffect(
    () => {
      fetch("/products.json")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
        })

        .catch((error) => console.error("Error:", error)); // Error handling
    },
    []
    // [] means this effect will only run once on component mount
  );
  useEffect(() => {
    let updatedProducts  = [...products]
    if (searchQuery) {
      setFilteredProducts(
        updatedProducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } 
    if(filterOption){
      updatedProducts = updatedProducts.filter(product =>  product.category === filterOption)  ; 

    }

    if  (sortOption  === 'priceAsc'){
      updatedProducts.sort((a, b) => a.price - b.price);

    }else if (sortOption  === 'priceDesc'){
      updatedProducts.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(updatedProducts);


  }, [searchQuery, products ,  sortOption  , filterOption]);

  const { addToCart } = useContext(ShoppingCartContext);
  const {addToWishlist}  = useContext(WishlistContext)  ; // added 
  // Pagination  logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleClick = (event, number) => {
    setCurrentPage(number);
  };
  const prevButtonclick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const nextButtonClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div>
        <h1> Products </h1>
        {/* for  sort and  filter */ }
        <div className={styles.filters}>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>

          <select
            onChange={(e) => setFilterOption(e.target.value)}
            value={filterOption}
          >
            <option value="">Filter By Category</option>
            <option value="bed">bed</option>
            <option value="sofa">sofa</option>
            <option value="chair">chair</option>
          </select>
        </div>


        {/* for product g display    */}
        <div className={styles.productList}>
          {currentProducts.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <p>Category :  {product.category}</p>
              <Link to={`/products/${product.id}`}> View Details </Link>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button onClick={() => addToWishlist(product)} >
                Add to  Wishlist 
              </button> {/* Wishlist button  */}
            </div>
          ))}
        </div>
      </div>

      {/* for pagination  */}
      <div className={styles.pagination}>
        <button onClick={prevButtonclick}> prev </button>
        {pageNumbers.map((number) => (
          <button key={number} onClick={(event) => handleClick(event, number)}>
            {number}
          </button>
        ))}
        <button onClick={nextButtonClick}> next </button>
      </div>
      <br></br>
    </>
  );
};

export default Products;
