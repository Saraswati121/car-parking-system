const Router = require("express")
const authRoute = Router()
const authmodel = require("../models/authModel")
const jwt = require('jsonwebtoken');

authRoute.post("/signup", async (req, res) => {
    try {
      const userMail = await authmodel.findOne({ email: req.body.email });
  
      if (!req.body.userName || !req.body.email || !req.body.password || !req.body.role) {
        return res.status(422).send({ message: "Please fill in all the details." });
      }
  
      if (userMail) {
        return res.send({ message: "User already registered." });
      }
  
      const user = new authmodel(req.body);
      await user.save();
  
      return res.status(201).send({ message: "Signup successful", authmodel: user });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "An error occurred while signing up." });
    }
  });
  

authRoute.post("/login",async(req,res) => {
    const {email,password} = req.body
    if (!email || !password) {
        return res.status(422).send({ message: "fill all the details" });
    }
    let validemail= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(password.length < 8){
      return res.status(422).send({ message: "please enter a password with atleast 8 characters" });
    }
    if(!validemail.test(email)){
      return res.status(422).send({ message: "please enter a valid email address" });
    }
    const validUser = await authmodel.findOne({email,password})

    if(!validUser){
        return res.status(401).send({message: "Invalid credential"})
    }
    const token = jwt.sign({
        userName : validUser.lastName,
        email : validUser.email,
        password : validUser.password,
        role: validUser.role,
    },'Secret')
    return res.status(201).send({message:"login successful",validUser,token})
})

module.exports= authRoute