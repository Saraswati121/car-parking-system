const Router = require('express');
const reviewRoute = Router();
const reviewModel = require('../models/reviewModel');

reviewRoute.post('/users/reviews/:id', async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id } = req.params;
    const review = new reviewModel({
      user: req.user.id,
      serviceRequestId: id,
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
