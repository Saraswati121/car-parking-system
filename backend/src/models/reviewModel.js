const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
  rating: { type: Number, required: true, max: 5 },
  comment: { type: String },
});

const ReviewModel = mongoose.model('review', ReviewSchema);
module.exports = ReviewModel;
