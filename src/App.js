import React from 'react';
import './App.css';
import Home from './pages/Home';
import { Route , Routes  } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import ProductDetail  from './pages/ProductDetail';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />

      </Routes>
    </div>
  );
}

export default App;
