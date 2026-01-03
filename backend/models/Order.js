const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  deliveryCharge: { type: Number, default: 5 },
  location: { type: String, required: true }, // Hostel Room / Landmark
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'COMPLETED', 'REJECTED', 'CANCELLED'],
    default: 'PENDING'
  },
  paymentMethod: { type: String, default: 'CASH_ON_DELIVERY' } // No Online Payment
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);