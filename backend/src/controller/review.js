const Router = require('express');
const reviewRoute = Router();
const reviewModel = require('../models/reviewModel');

reviewRoute.post('/users/reviews', async (req, res) => {
  try {
    const { user, serviceRequestId, rating, comment } = req.body;
    const review = new reviewModel({
      user,
      serviceRequestId,
      rating,
      comment,
    });
    await review.save();
    res.status(201).send({ message: 'Review created successfully', review });
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

reviewRoute.get('/reviews', async (req, res) => {
  try {
    const reviews = await reviewModel.find().populate('user', 'userName email');
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = reviewRoute;