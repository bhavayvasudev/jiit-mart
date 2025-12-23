require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Import Models
const Product = require('./models/Product');
const Order = require('./models/Order'); // We will create this next if missing

const app = express();
app.use(express.json());
app.use(cors());

// Create 'uploads' folder for PDFs if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static('uploads'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ JIITMart Database Connected!"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// --- ROUTES ---

// 1. Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Add a Product (Run this via Thunder Client/Postman)
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Place Order Route
app.post('/api/orders', async (req, res) => {
  try {
    // If Order model doesn't exist yet, we just log it
    console.log("🔔 New Order Received:", req.body);
    res.json({ message: "Order Placed Successfully!", orderId: "TEMP_ID" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. GET ALL ORDERS (For Admin Dashboard)
app.get('/api/orders', async (req, res) => {
  try {
    // Fetch orders, sort by newest first
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. UPDATE ORDER STATUS (To mark as "Ready")
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));