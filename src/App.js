import React from 'react';
import './App.css';
import Home from './pages/Home';
import { Route , Routes  } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/products' element = {<Products />} />
      </Routes>
    </div>
  );
}

export default App;
