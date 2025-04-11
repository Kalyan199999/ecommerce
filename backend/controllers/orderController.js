const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, shippingAddress } = req.body;

    const order = new Order({
      user: req.user.id,
      products,
      totalAmount,
      shippingAddress,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
};


module.exports = { 
    createOrder, 
    getUserOrders, 
    getAllOrders 
};