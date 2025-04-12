import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const obj = {
    title: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  }

const UpdateProduct = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

//   console.log(user);

  const [product, setProduct] = useState(obj);

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        console.log(res.data);
        
      } catch (err) {
        toast.error('Failed to fetch product details');
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('stock', product.stock);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': user.token
        }
      });
      toast.success('Product updated successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Update Product</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={product.title}
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
            className="w-full p-2 rounded border border-gray-300 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:mr-4 file:border-0 hover:file:bg-blue-700 cursor-pointer"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
