const mongoose = require('mongoose')
const connection = mongoose.connect("mongodb://localhost:27017/systems")
// mongodb+srv://parking-system:parking-system@cluster0.focsr3a.mongodb.net/?retryWrites=true&w=majority
module.exports = connection