const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { quote } = req.body;
    const review = new Review({
      user: req.user._id,
      quote
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 