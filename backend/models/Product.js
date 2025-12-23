const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['food', 'essential'], required: true },
  image: { type: String, default: 'https://placehold.co/400' }
});

module.exports = mongoose.model('Product', ProductSchema);