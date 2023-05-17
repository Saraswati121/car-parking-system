const Router = require("express")
const parkingRoute = Router()
const parkingmodel = require("../models/Parkingplace")

parkingRoute.get("/parkingPlace",async(req,res)=>{
  try{
    const parkingPlace= await parkingmodel.find(
      res.send(parkingPlace)
    )
  }catch(err){
    res.status(500).json({ message: 'Server Error', err});
  }
})

parkingRoute.post("/parkingPlace",async(req,res)=>{
 try {
    const { placeName, address, availableSlots, vehicleTypesAllowed, price, duration } = req.body;
    const parkingPlace = new parkingmodel({
      placeName,
      address,
      availableSlots,
      vehicleTypesAllowed,
      price
    });
    const savedParkingPlace = await parkingPlace.save();
    res.status(201).send({ message: "parking place added successfully", savedParkingPlace});;
  } catch (error) {
    res.status(500).json({ message: 'Failed to create parking place', error});
  }
});


parkingRoute.get("/customer/parkingPlace",async(req,res)=>{
  try{
    const parkingPlace= await parkingmodel.find(
      res.json(parkingPlace)
    )
  }catch(err){
    res.status(500).json({ message: 'Server Error', err});
  }
})

module.exports =parkingRoute