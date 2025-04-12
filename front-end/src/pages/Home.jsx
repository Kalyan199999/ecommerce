import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [products, setProducts] = useState([]);

  const {user} = useAuth();
  

  const getAllProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data.products);
      
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (

    <div className="min-h-screen bg-blue-50 py-10 px-4">
      
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">Our Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
          {
          products.map((product) => (
           
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-all"
            >
              
              {
              product.images && product.images.length > 0 && (
                <img
                  src={`http://localhost:5000/${product.images[0].path}`}
                  alt={product.title}
                  className="w-full h-48 object-contain rounded-md mb-4 bg-gray-100"
                />
              )}

              <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
              
              <p className="text-gray-600 line-clamp-2">{product.description}</p>

              <div className="mt-4 flex justify-between items-center">
                
                <span className="text-blue-600 font-bold text-lg">₹.{product.price}</span>
                
                <Link
                  to={`/product/${product._id}`}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  View
                </Link>

                {
                  user?.user.isAdmin &&
                  <Link
                  to={`/update-product/${product._id}`}
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  update
                </Link>}
              
              </div>
            
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-center col-span-full text-gray-600">No products available yet.</p>
          )}

        </div>

      </div>

    </div>
  );
};

export default Home;
