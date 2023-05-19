const Router = require("express")
const serviceRequest= Router()
const requestModel= require('../models/serviceRequest')
const parkingmodel = require("../models/Parkingplace")

serviceRequest.post('/users/servicesRequest', async (req, res) => {
  try {
    const { place, vehicleType, duration } = req.body;
    const parkingPlace = await parkingmodel.findOne({ place });

    if (!parkingPlace) {
      return res.status(404).json({ error: 'Parking place not found' });
    }

    const { availableSlots, vehicleTypesAllowed } = parkingPlace;
    const slotsForVehicle = vehicleType === 'twoWheelers' ? availableSlots.twoWheelers : availableSlots.fourWheelers;

    if (slotsForVehicle === 0) {
      return res.status(400).json({ error: 'No slots available for the selected vehicle type' });
    }

    if (!vehicleTypesAllowed.includes(vehicleType)) {
      return res.status(400).json({ error: 'Selected vehicle type not allowed in this parking place' });
    }

    const serviceRequest = new requestModel({
      place,
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
      const serviceRequests = await requestModel.find();
      res.json(serviceRequests);
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