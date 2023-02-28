const mongoose = require("mongoose")
const {model, Schema} = mongoose

const contactSchema = Schema({
    firstName: {type:String},
    lastName: {type:String},
    email: {type:String},
    phone:{type:String},
    })

const constactmodel = model("contactslist", contactSchema)

module.exports = constactmodel;