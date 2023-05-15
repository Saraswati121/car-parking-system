const mongoose = require ("mongoose")

const parkingSchema=  mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  availableSlots: { type: Number, required: true },
  vehicleTypesAllowed: { type: [String], required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
})

const parkingModel = mongoose.model("parkingPlace",parkingSchema)

module.exports = parkingModel