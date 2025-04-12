import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { useCart } from '../context/CartContext';



const Navbar = () => {
  const { cartItems } = useCart();

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAdmin = user ? user.user.isAdmin : false;

  const handleLogout = () => {
    logout()
    navigate('/login');
  };

  // console.log(user);
  
  return (

    <nav className="bg-white shadow-md p-4 flex justify-between items-center">

      <Link to="/" className="text-2xl font-bold text-blue-600">ShopMate</Link>
      
      <div className="space-x-4">
        {
            user ? 
                <>
                  {
                    isAdmin ? 

                    <>
                      <Link to="/admin-products" className="text-blue-600 hover:underline font-medium">My Products</Link>
                      
                      <Link to="/add-product" className="text-blue-500 hover:underline font-medium">Add Product</Link>
                     
                      <Link to="/admin" className="text-blue-600 hover:underline font-medium">Dashboard</Link>
                      
                      <span className="text-gray-700 font-medium">Hi, {user.user.name}</span>
                      
                      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Logout
                      </button>

                    </> 
                    : 
                    <>
                      <Link to="/" className="text-blue-500 hover:underline font-medium">Home</Link>

                      <Link to="/orders" className="text-blue-600 hover:underline font-medium">My Orders</Link>

                      <Link to="/mycart" className="text-blue-600 hover:underline font-medium">My Cart</Link>

                      {/* <Link to="/cart" className="relative text-3xl">
                          🛒
                          <i class='bx bxs-cart'></i>
                          {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                              {cartItems.length}
                            </span>
                          )}
                      </Link> */}

                      <span className="text-gray-700 font-medium">Hi, {user.user.name}</span>

                      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Logout
                      </button>
                    </>
                  }
                </>
                 : 
            
                <div className="space-x-4">
                  {/* <Link to="/" className="text-orange-500 hover:underline font-medium">Home</Link> */}
                  <Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
                  <Link to="/register" className="text-green-600 hover:underline font-medium">Register</Link>
                </div>
            
          }
          
      </div>
    </nav>

  );
};

export default Navbar;