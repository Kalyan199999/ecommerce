import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct'
import ProductDetails from './pages/ProductDetails';
import UpdateProduct from './pages/UpdateProduct'
import AdminProducts from './pages/AdminProducts'
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import UserOrders from './pages/UserOrders';


function App() {
  return (
    <Router>

      <Navbar />
      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<Dashboard />} />

        <Route path="/admin-products" element={<AdminProducts />} />    

        <Route path="/add-product" element={<AddProduct />} />

        <Route path="/update-product/:id" element={<UpdateProduct />} />

        <Route path="/delete/:id" element={<h1 className='text-red-500 text-3xl font-bold'>Delete</h1>} />
        
        {/* <Route path="/orders" element={<h1>Orders</h1>} /> */}

        <Route path="/mycart" element={<CartPage />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<UserOrders />} />


        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/*" element={<h1 className='text-center text-red-500 text-3xl font-bold'>Error</h1>} />
        
      </Routes>

    </Router>
  );
}

export default App;
