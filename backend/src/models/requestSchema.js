const mongoose = require('mongoose');

const requestSchema= mongoose.Schema({
    parkingPlace: { type: Schema.Types.ObjectId, ref: 'ParkingPlace', required: true },
    vehicleType: { type: String, required: true },
    duration: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'canceled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },  
})

const requestModel = mongoose.model("Request",requestSchema)

module.exports = requestModel