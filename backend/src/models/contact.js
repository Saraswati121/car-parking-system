const mongoose = require ("mongoose")

const contactSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName: {type:String, required:true},
    feedback: {type:String, required:true}
})

const contactModel = mongoose.model('contact', contactSchema)

module.exports= contactModel