import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UserOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/user/${user.user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };

    fetchOrders();
  }, [user]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">🛒 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white border border-gray-200 p-6 mb-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Order ID: <span className="text-gray-500">{order._id}</span>
              </h3>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                order.status === 'Delivered'
                  ? 'bg-green-100 text-green-800'
                  : order.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
            </div>

            <p className="text-gray-600 mb-1"><strong>Total:</strong> ${order.totalAmount}</p>
            <p className="text-gray-600 mb-1">
              <strong>Payment:</strong>
              <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded">
                {order.paymentMethod}
              </span>
            </p>
            <p className="text-gray-600 mb-1"><strong>Shipping:</strong> {order.shippingAddress}</p>
            <p className="text-gray-600 mb-4"><strong>Date:</strong> {formatDate(order.createdAt)}</p>

            <div>
              <p className="text-md font-semibold text-gray-800 mb-2">Items Ordered:</p>
              <ul className="divide-y divide-gray-200">
                {order.products.map((item, i) => (
                  <li key={i} className="py-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-500">Category: {item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-medium">Qty: {item.quantity}</p>
                      <p className="text-green-600 font-semibold">${item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrders;