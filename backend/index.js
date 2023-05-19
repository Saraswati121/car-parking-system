const express = require('express');
const connect = require("./src/config/db")
const authentication = require("./src/controller/auth")
const parkingplace= require("./src/controller/parkingPlace")
const serviceReq= require("./src/controller/servicesRequest")
const reviews = require("./src/controller/review")
const app = express();
const cors= require('cors')

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())

app.use("/auth",authentication)
app.use("/",parkingplace)
app.use('/',serviceReq)
app.use('/',reviews)

app.get("/",(req,res)=>{
    res.send({ message: "Welcome to parking-system Backend"})
})

const port = process.env.PORT || 8080;

app.listen(port,async()=>{
    await connect;
    console.log('listening on port 8080');
})
