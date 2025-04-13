const express = require('express');
const router = express.Router();
const { verifyAdmin ,userAuth} = require('../middleware/admin');


const { createOrder,getUserOrders,getAllOrders } = require('../controllers/orderController');

// craete the new order for user
router.post('/', userAuth, createOrder);

// get the user orders
router.get('/user/:id', userAuth, getUserOrders);

// get all the orders
router.get('/', userAuth,verifyAdmin, getAllOrders);

module.exports = router;
