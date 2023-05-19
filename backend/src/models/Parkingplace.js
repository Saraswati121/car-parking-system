const mongoose = require ("mongoose")

const parkingSchema=  mongoose.Schema({
  place: { type: String, required: true },
  address: { type: String, required: true },
  availableSlots: { 
    twoWheelers: { type: Number, required: true },
    fourWheelers: { type: Number, required: true },
  },
  vehicleTypesAllowed: { type: [String], required: true,  validate: {
    validator: function (value) {
      const allowedTypes = ["twoWheelers", "fourWheelers"];
      return value.every((type) => allowedTypes.includes(type));
    },
    message: "Invalid vehicle types",
  }, },
  price: { type: Number, required: true }
})

const parkingModel = mongoose.model("parkingPlace",parkingSchema)

module.exports = parkingModel