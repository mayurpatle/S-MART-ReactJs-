import React, { useState, useEffect } from "react";
import styles from "../styles/AdminDashboard.module.css";
import productsData from "../products.json";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formState, setFormState] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    
  });

  useEffect(() => {
    // Load products from JSON file
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
    setProducts(productsData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.id === null) {
      // Add new product
      const newProduct = {
        id: new Date().getTime(), // Generating a unique ID
        name: formState.name,
        price: parseFloat(formState.price),
        description: formState.description,
        
      };
      setProducts([...products, newProduct]);
    } else {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.id === formState.id
          ? { ...formState, price: parseFloat(formState.price) }
          : product
      );
      setProducts(updatedProducts);
    }
    setFormState({
      id: null,
      name: "",
      price: "",
      description: "",
      
    });
  };

  const handleEdit = (product) => {
    setFormState(product);
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  return (
    <div className={styles.adminDashboard}>
      <h1>Admin Dashboard</h1>
      <form className={styles.productForm} onSubmit={handleSubmit}>
        <h2>{formState.id === null ? "Add New Product" : "Update Product"}</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formState.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={formState.price}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={formState.description}
          onChange={handleInputChange}
          required
        />
        
        <button type="submit">
          {formState.id === null ? "Add Product" : "Update Product"}
        </button>
      </form>
      <div className={styles.productList}>
        <h2>Products</h2>
        {products.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={styles.productImage}
            />
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
