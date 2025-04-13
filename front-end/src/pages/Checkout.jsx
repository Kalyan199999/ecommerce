import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  

  const handlePlaceOrder = async () => {
    if (!address) return toast.error('Please enter a shipping address');

    

    try {
      const orderData = {

        userId: user.user.id,

        shippingAddress: address,

        totalAmount,

        products: cartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
          adminId: item.createdBy, // must be part of product model
        })),

        paymentMethod: 'Cash on Delivery', // default
      };
      

      const myorder = await axios.post('http://localhost:5000/api/orders',orderData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`, 
          },
        }
      );

      console.log(myorder);
      

      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between border p-4 rounded-lg">
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p>Qty: {item.quantity}</p>
            </div>
            <p>${item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="block font-semibold">Shipping Address:</label>
        <textarea
          rows="3"
          className="w-full border rounded p-2 mt-1"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h3 className="text-xl font-bold">Total: ${totalAmount.toFixed(2)}</h3>
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
