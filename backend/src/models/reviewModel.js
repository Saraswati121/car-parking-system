const mongoose = require('mongoose')

const ReviewSchema = mongoose. Schema({
    user: { type: Schema.Types.ObjectId, ref: 'auth', required: true },
    parkingPlace: { type: Schema.Types.ObjectId, ref: 'ParkingPlace', required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const reviewModel = mongoose.model('Review',ReviewSchema)
module.exports = reviewModel

  