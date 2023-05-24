const mongoose = require ("mongoose")

const parkingSchema=  mongoose.Schema({
  place: { type: String, required: true },
  pincode:{type:Number, required: true},
  address: { type: String, required: true },
  availableSlots: { 
    twoWheelers: { type: Number, required: true },
    fourWheelers: { type: Number, required: true },
  },
  twoWheelersprice:{type: Number, required: true},
  fourWheelersprice: { type: Number, required: true }
})

const parkingModel = mongoose.model("parkingPlace",parkingSchema)

module.exports = parkingModel