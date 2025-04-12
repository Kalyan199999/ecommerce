import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useAuth } from '../context/AuthContext';

const obj = {
  name: '',
  description: '',
  price: 0,
  category: '',
  stock: 0
}

const AddProduct = () => {

   const {user} = useAuth();

  //  console.log(user);

  const [product, setProduct] = useState(obj);

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
  formData.append('title', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price);
  formData.append('category', product.category);
  formData.append('stock', product.stock);
  formData.append('adminId', user.user.id); // assuming this is admin ID

  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]); //  name must be 'images'
  }


    console.log(formData);
    

    try {
      const response = await axios.post('http://localhost:5000/api/products/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization':user.token
        }
      });

      console.log(response);
      
      toast.success('Product added successfully!');
      setProduct(obj);
      setImages([]);

    } catch (error) {
      toast.error('Failed to add product');
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none p-3 rounded-lg"
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product Description"
            required
            rows={4}

            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none p-3 resize-none rounded-lg"
          />
          
          <div className="flex gap-4">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              min={0}
              required
              className="w-1/3 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none p-3 rounded-lg"
            />
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Category"
              required
              className="w-1/3 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none p-3 rounded-lg"
            />
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock"
              min={0}
              required
              className="w-1/3 border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none p-3 rounded-lg"
            />

          </div>

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
