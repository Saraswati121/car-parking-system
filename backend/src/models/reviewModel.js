const mongoose = require('mongoose')

const ReviewSchema = mongoose. Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
    serviceRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'request', required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
});

const reviewModel = mongoose.model('review',ReviewSchema)
module.exports = reviewModel

  