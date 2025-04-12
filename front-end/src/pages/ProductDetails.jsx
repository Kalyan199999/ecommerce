import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { useCart } from '../context/CartContext'; // adjust path as needed
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { sliderSettings } from './SliderSettings'


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleCart = (title)=>{
    addToCart(product);
    toast.success(`${title} added to cart`);

  }

  if (loading) return <div className="text-center py-10 text-lg">Loading...</div>;
  if (!product) return <div className="text-center py-10 text-red-500">Product not found.</div>;


  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="md:flex">
          
          <div className="md:w-1/2 bg-gray-100 p-4 relative">
            <Slider {...sliderSettings}>
              {product.images.map((img, index) => (
                <div key={index} className="flex items-center justify-center">
                  <img
                    src={`http://localhost:5000/uploads/products/${img.filename}`}
                    alt={`product-${index}`}
                    className="max-h-96 object-contain w-full"
                  />
                </div>
              ))}
            </Slider>
          </div>
  
          <div className="md:w-1/2 p-8 space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p><span className="font-semibold">Stock:</span> {product.stock}</p>
            <p className="text-2xl font-semibold text-blue-700">${product.price}</p>

            <Link to='/mycart'> 
              <button
                onClick={() => handleCart(product.title)}
                className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </Link>



          </div>
  
        </div>
      </div>
    </div>
  );
  
};

export default ProductDetails;
