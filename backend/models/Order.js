const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  studentName: { type: String, default: "Student" },
  items: Array,
  totalAmount: Number,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);