const Router = require('express');
const reviewRoute = Router();
const reviewModel = require('../models/reviewModel');

reviewRoute.post('/users/reviews', async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment ) {
      return res.status(422).send({ message: "fill all the details" });
    }
    //const { userId } = req.user;
    const review = new reviewModel({
      rating,
      comment,
      //user_id: userId, 
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
   // const reviews = await reviewModel.find().populate('user_id');
   const reviews = await reviewModel.find()
    res.send(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = reviewRoute;
