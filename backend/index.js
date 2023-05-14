const express = require('express');
const connect = require("./src/config/db")
const authentication = require("./src/controller/auth")
const app = express();
const cors= require('cors')

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors())

app.use("/auth",authentication)

app.get("/",(req,res)=>{
    res.send({ message: "Welcome to ideoticAuth Backend"})
})

const port = process.env.PORT || 8080;

app.listen(port,async()=>{
    await connect;
    console.log('listening on port 8080');
})