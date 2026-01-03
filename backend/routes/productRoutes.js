// TOGGLE AVAILABILITY
router.patch('/:id/availability', verifyToken, verifyOwner, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.isAvailable = !product.isAvailable; // Toggle
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error updating inventory" });
  }
});