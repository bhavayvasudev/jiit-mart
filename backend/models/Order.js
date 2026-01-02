const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  studentName: { type: String, default: "Student" }, // e.g., "Rahul (B-304)"
  items: [
    {
      name: String,
      qty: Number,
      price: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  location: { type: String, required: true }, // e.g., "Hostel H-104"
  paymentMethod: { type: String, enum: ['UPI', 'CASH'], default: 'UPI' },
  status: { 
    type: String, 
    enum: ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'], 
    default: 'Pending' 
  },
  printFile: { type: String } // URL to PDF if this is a print order
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);