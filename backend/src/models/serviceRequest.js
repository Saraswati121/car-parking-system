const mongoose = require('mongoose');

const requestSchema= mongoose.Schema({
    place: { type: String, required: true },
    vehicleType: { type: String, required: true },
    duration: { type: Number, required: true },
    status : { type: String},
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true },
})

const requestModel = mongoose.model("request",requestSchema)

module.exports = requestModel