const mongoose = require('mongoose');

const requestSchema= mongoose.Schema({
    place: { type: String, required: true },
    pincode:{type:Number, required: true},
    // avilableplace: {type: mongoose.Schema.Types.ObjectId, ref: 'parkingPlace' },
    vehicleType: { type: String, required: true },
    duration: { type: Number, required: true },
    status : { type: String}
})

const requestModel = mongoose.model("request",requestSchema)

module.exports = requestModel