import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartPage = () => {

  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const handleRemove = (id,title) => {
    removeFromCart(id);
    toast.success(`${title} removed from cart`);
  }


  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Shopping Cart
      </h2>

      {
      cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">
          Your cart is empty. <Link to="/" className="text-blue-500 underline">Continue shopping</Link>
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000/${item.images[0].path}`}
                    alt={item.title}
                    className="w-24 h-24 object-contain rounded-lg border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">${item.price}</p>
                    {/* <p className="text-sm text-gray-400">Qty: {item.quantity}</p> */}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                    >
                      −
                    </button>
                    <span className="text-md font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                    >
                      +
                    </button>
                </div>


                <div className="mt-4 sm:mt-0 flex gap-3">
                  <button
                    onClick={() => handleRemove(item._id , item.title)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-8">
            <h4 className="text-xl font-bold text-blue-700">
              Total: ${total.toFixed(2)}
            </h4>

            <Link to='/checkout'>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Checkout
            </button></Link>
            
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;