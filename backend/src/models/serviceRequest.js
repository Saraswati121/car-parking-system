const mongoose = require('mongoose');

const requestSchema= mongoose.Schema({
    place: { type: String, required: true },
    vehicleType: { type: String, required: true },
    duration: { type: Number, required: true },
    //status: { type: String, enum: ['pending', 'accepted', 'rejected', 'canceled'], default: 'pending' },
    status : { type: String, required: true}
})

const requestModel = mongoose.model("Request",requestSchema)

module.exports = requestModel