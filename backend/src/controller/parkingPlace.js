const Router = require("express")
const parkingRoute = Router()
const parkingmodel = require("../models/Parkingplace")
const jwt = require("jsonwebtoken");

parkingRoute.get("/parkingPlace",async(req,res)=>{
  try{
    const parkingPlace= await parkingmodel.find()
      res.send(parkingPlace)
  }catch(err){
    res.status(500).json({ message: 'Server Error', err});
  }
})

parkingRoute.post("/parkingPlace",async(req,res)=>{
 try {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const { role } = jwt.verify(token, "Secret");
  if (role !== "Admin") {
    return res.status(403).send({ message: "Not authorized" });
  }
    const { place,pincode, address, availableSlots, twoWheelersprice,fourWheelersprice, } = req.body;
    if (!place || !pincode || !address || !availableSlots || !twoWheelersprice || !fourWheelersprice) {
      return res.status(422).send({ message: "fill all the details" });
    }
    if(isNaN(pincode)){
      return res.status(422).send({ message: "pincode should be a number" });
    }
    const parkingPlace = new parkingmodel({
      place,
      pincode,
      address,
      availableSlots,
      twoWheelersprice,
      fourWheelersprice,

    });
    const savedParkingPlace = await parkingPlace.save();
    
    res.status(201).send({ message: "parking place added successfully", savedParkingPlace});;
  } catch (error) {
    res.status(500).json({ message: 'Failed to create parking place', error});
  }
});

module.exports =parkingRoute