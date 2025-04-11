const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

        products: [
          {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
          }
        ],

        totalAmount: { type: Number, required: true },

        status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered

        shippingAddress: { type: String, required: true },

        paymentStatus: { type: String, default: 'Unpaid' }, // Paid, Unpaid
}, 

{ timestamps: true }

);

module.exports = mongoose.model('Order', orderSchema);
