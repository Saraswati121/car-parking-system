const Router = require("express")
const parkingRoute = Router()
const parkingmodel = require("../models/Parkingplace")

parkingRoute.post("/parkingPlace",async(req,res)=>{
 try {
    const { name, address, availableSlots, vehicleTypesAllowed, price, duration } = req.body;
    const parkingPlace = new parkingmodel({
      name,
      address,
      availableSlots,
      vehicleTypesAllowed,
      price,
      duration,
    });
    const savedParkingPlace = await parkingPlace.save();

    res.status(201).send({ message: "parking place added successfully", savedParkingPlace});;
  } catch (error) {
    res.status(500).json({ message: 'Failed to create parking place', error});
  }
});

module.exports =parkingRoute