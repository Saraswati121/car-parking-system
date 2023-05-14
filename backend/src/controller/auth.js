const Router = require("express")
const authRoute = Router()
const authmodel = require("../models/authModel")
const jwt = require('jsonwebtoken');

authRoute.post("/signup", async(req,res) => {
    const userMail = await authmodel.findOne({email: req.body.email})
    if(userMail){
        return res.send({message: "user already registered"})
    }

    const user = new authmodel(req.body)
    user.save((err,success) => {
        if(err){
            return res.status(500).send({message:"Error Occured"})
        }
        return res.status(201).send({message:"signup successful",authmodel:success._doc})
    })
})

authRoute.post("/login",async(req,res) => {
    const {email,password} = req.body
    const validUser = await authmodel.findOne({email,password})

    if(!validUser){
        return res.status(401).send({message: "Invalid credential"})
    }
    const token = jwt.sign({
        userName : validUser.lastName,
        email : validUser.email,
        password : validUser.password,
    },'Secret')
    return res.status(201).send({validUser,token})
})

module.exports= authRoute