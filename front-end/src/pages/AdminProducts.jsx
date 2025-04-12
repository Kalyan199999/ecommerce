import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const { user } = useAuth(); // assuming user.user.id is admin ID
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/admin/${user.user.id}`);
        setProducts(res.data.products);
        // console.log(res.data);
      } catch (err) {
        toast.error('Failed to load your products');
      }
    };

    fetchAdminProducts();
  }, []);

  return (

    <div className="p-6 max-w-4xl mx-auto">
        
      <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Admin Products</h2>
      {
        products.length === 0 ? (
          <p className="text-gray-500 text-center">No products added yet.</p>
        ) : 
        (
        <div className="flex flex-col gap-6">
          {
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded-2xl shadow-lg p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div>
                  <img
                    src={`http://localhost:5000/${product.images[0].path}`}
                    alt={product.title}
                    className="w-40 h-40 object-contain rounded-xl shadow-sm border border-gray-200"
                  />
                </div>
            
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-blue-800">{product.title}</h3>
                  <div className="mt-2 text-sm text-gray-500 space-y-1">
                    <p>Category: {product.category}</p>
                    <p>Stock: {product.stock}</p>
                    <p className="text-xl font-bold text-blue-600">${product.price}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-4 sm:mt-0 sm:ml-auto">
                  <Link to={`/update-product/${product._id}`}>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                      Update
                    </button>
                  </Link>
                  <Link to={`/delete/${product._id}`}>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                      Delete
                    </button>
                  </Link>
                </div>

        </div>
        ))
        }

        </div>
      )}

    </div>
  );
};

export default AdminProducts;
