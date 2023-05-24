const Router = require("express")
const contactRoute = Router()
const contactModel = require('../models/contact')

contactRoute.post('/contact',async(req,res)=>{
    try{
    const { firstName,lastName,feedback } = req.body;
    if (!firstName || !lastName || !feedback) {
      return res.status(422).send({ message: "fill all the details" });
  }
    const contactDetails = new contactModel({
        firstName,
        lastName,
        feedback
    });
    const savedContact = await contactDetails.save();
    res.status(201).send({ message: "contact details added successfully", savedContact});;
  } catch (error) {
    res.status(500).json({ message: 'Failed to add contact deatils', error});
  }
})

module.exports =contactRoute