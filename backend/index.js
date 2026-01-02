require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // File handling
const fs = require('fs');
const path = require('path');

// Import Models
const Product = require('./models/Product');
const Order = require('./models/Order');

const app = express();
app.use(express.json());
app.use(cors());

// --- FILE UPLOAD SETUP (Multer) ---
// Create 'uploads' folder if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Configure Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Save as: timestamp-filename.pdf
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Serve static files (so frontend can access uploaded PDFs)
app.use('/uploads', express.static('uploads'));

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ JIITMart Database Connected!"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// --- ROUTES ---

// 1. GET ALL PRODUCTS (Shop)
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. ADD PRODUCT (Admin/Seed)
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. PLACE ORDER (Student)
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    console.log("🔔 New Order Placed:", savedOrder._id);
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// 4. UPLOAD FILE (Print Service)
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Return the URL where the file is accessible
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ message: "File Uploaded", url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. GET ALL ORDERS (Owner Dashboard)
app.get('/api/orders', async (req, res) => {
  try {
    // Sort by newest first (-1)
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. UPDATE ORDER STATUS (Kitchen)
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true } // Return the updated document
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));