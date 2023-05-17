const mongoose = require('mongoose');

const requestSchema= mongoose.Schema({
    place: { type: String, required: true },
    vehicleType: { type: String, required: true },
    duration: { type: Number, required: true },
    //status: { type: String, enum: ['pending', 'accepted', 'rejected', 'canceled'], default: 'pending' },
    status : { type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
})

const requestModel = mongoose.model("request",requestSchema)

module.exports = requestModel