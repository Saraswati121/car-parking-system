const mongoose = require ("mongoose")

const parkingSchema=  mongoose.Schema({
  placeName: { type: String, required: true },
  address: { type: String, required: true },
  availableSlots: { 
    twoWheelers: { type: Number, required: true },
    fourWheelers: { type: Number, required: true },
  },
  vehicleTypesAllowed: { type: [String], required: true },
  price: { type: Number, required: true }
})

const parkingModel = mongoose.model("parkingPlace",parkingSchema)

module.exports = parkingModel