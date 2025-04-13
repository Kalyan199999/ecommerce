import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/admin/${user.user.id}`, {
          headers: {
            authorization: user.token,
          },
        });

        setOrders(res.data.orders);
        toast.success('Orders loaded successfully!');
      } 
      catch (err) {
        console.error('Failed to fetch admin orders', err);
        toast.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodColor = (method) => {
    switch (method) {
      case 'Cash on Delivery':
        return 'bg-gray-100 text-gray-700';
      case 'Online Payment':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'Unpaid':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">📦 Orders You've Received</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-700">Order #{order._id.slice(-6)}</h3>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-1 mb-4">
                <p className="text-gray-600"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                <p className="text-gray-800 font-semibold">Total: ${order.totalAmount}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getPaymentMethodColor(order.paymentMethod)}`}>
                    {order.paymentMethod}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">🛍 Products:</h4>
                <ul className="divide-y divide-gray-200">
                  {order.products.map((item, i) => (
                    <li key={i} className="py-3 flex justify-between">
                      <div>
                        <p className="text-gray-800 font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">Category: {item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-blue-600">Qty: {item.quantity}</p>
                        <p className="text-sm text-green-600 font-semibold">${item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
