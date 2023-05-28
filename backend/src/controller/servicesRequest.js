const Router = require("express")
const serviceRequest= Router()
const requestModel= require('../models/serviceRequest')
const parkingmodel = require("../models/Parkingplace")

serviceRequest.post('/users/servicesRequest', async (req, res) => {
  try {
    const { place, pincode, vehicleType, duration } = req.body;

    if (!place || !pincode || !vehicleType || !duration) {
      return res.status(422).send({ message: "fill all the details" });
    }
    if (isNaN(pincode)) {
      return res.status(422).send({ message: "pincode should be a number" });
    }
    let slotsAvailable = false;
    let updatedSlots = {};

    if (vehicleType === 'twoWheelers') {
      const parkingPlace = await parkingmodel.findOne({ place, pincode });
      if (parkingPlace && parkingPlace.availableSlots.twoWheelers > 0) {
        updatedSlots = { 'availableSlots.twoWheelers': parkingPlace.availableSlots.twoWheelers - 1 };
        slotsAvailable = true;
      }
    } else if (vehicleType === 'fourWheelers') {
      const parkingPlace = await parkingmodel.findOne({ place, pincode });
      if (parkingPlace && parkingPlace.availableSlots.fourWheelers > 0) {
        updatedSlots = { 'availableSlots.fourWheelers': parkingPlace.availableSlots.fourWheelers - 1 };
        slotsAvailable = true;
      }
    } else {
      return res.status(422).json({ message: "Invalid vehicle type" });
    }

    // Update the slots count in the database
    await parkingmodel.updateOne({ place, pincode }, { $set: updatedSlots });

    const serviceRequest = new requestModel({
      place,
      pincode,
      vehicleType,
      duration,
      status: 'Pending',
    });

    await serviceRequest.save();
    res.status(200).json({ message: 'Sending request to vehicle', serviceRequest });
  } catch (err) {
    console.error('Error creating service request:', err);
    res.status(500).json({ error: 'Server error', specificError: err.message });
  }
});

serviceRequest.get('/users/service-requests', async (req, res) => {
    try {
      const parkingPlace = await parkingmodel.findOne({ place });
      const serviceRequests = await requestModel.find();
      res.json(serviceRequests,parkingPlace);
    } catch (err) {
      console.error('Error fetching service requests:', err);
      res.status(500).json({ error: 'Server error' });
    }
});

serviceRequest.patch('/users/service-requests/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      const serviceRequest = await requestModel.findByIdAndUpdate(id,updateData,{new:true});
      return res.status(200).send(serviceRequest);
    } catch (err) {
      console.error('Error updating service request:', err);
      res.status(500).json({ error: 'Server error' });
    }
});

serviceRequest.delete('/user/serviceRequest/:id',async(req, res) => {
    try {
        const { id } = req.params;
        const serviceRequest = await requestModel.findByIdAndDelete(id);
        res.status(200).send({message: 'Service deleted successfully'},serviceRequest);
      } catch (err) {
        console.error('Error deleting service request:', err);
        res.status(500).json({ error: 'Server error' });
      }
})

module.exports = serviceRequest;