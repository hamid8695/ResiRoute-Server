const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema({
    resident_name: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    location: {
        type: {
            type: String,
            // enum: ['Point'],
            default: 'Point'
            
        },
        coordinates: {
            type: [Number],
            default: [0,0]
        }
    },
    img1:{
        type: String,
        default: null
    },
    img2:{
        type: String,
        default: null
    },
    img3:{
        type: String,
        default: null
    },
    img4:{
        type: String,
        default: null
    },
    price: {
        type: Number,
        default: 0
    },
    price_type:{
        type: String,
        default: null
    },
    resident_type:{
        type: String,
        default: null
    },
    host_info:{
        type: String,
        default: null
    },
    host_name:{
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    contact_number: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    is_active: {
       type: Boolean,
       default: false
    },
    is_banned: {
       type: Boolean,
       default: false
    },

},{timestamps: true})

ResidentSchema.index({ location: '2dsphere' });




module.exports=mongoose.model("Resident",ResidentSchema)