const mongoose = require('mongoose')


const Schema = mongoose.Schema


const bloodBankSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    isApproved:{
        type: Boolean,
        required: true,
        value: false
    },
    user_id: {
        type: String,
    }
},{timestamps: true})

module.exports = mongoose.model('BloodBank', bloodBankSchema)