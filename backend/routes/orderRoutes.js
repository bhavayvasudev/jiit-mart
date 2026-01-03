const express = require('express');
const router = express.router();
const Order = require('../models/Order');
const { verifyToken, verifyOwner } = require('../middleware/auth'); // Assuming these exist

// UPDATE ORDER STATUS (Owner Only)
router.patch('/:id/status', verifyToken, verifyOwner, async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['ACCEPTED', 'PREPARING', 'READY', 'COMPLETED', 'REJECTED'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status transition" });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET ALL ORDERS (Owner)
router.get('/admin/all', verifyToken, verifyOwner, async (req, res) => {
  try {
    // Populate user details to see who ordered
    const orders = await Order.find()
      .populate('student', 'name email') 
      .sort({ createdAt: -1 }); // Newest first
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET MY ORDERS (Student)
router.get('/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ student: req.user.id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;