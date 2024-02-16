const mongoose = require("mongoose");

const HotelBookingSchema = new mongoose.Schema({
    hotel_id: {
        type: mongoose.Types.ObjectId,
        ref: "Resident",
        default: '00000000000000'
    },
    price: {
        type: String,
        default: '0'
    },
    payment_status: {
        type: Boolean,
        default: false
    },
    tranjectionId: {
        type: String,
        default: '00000000000000'
    },
    number_of_member: {
        type: String,
        default: '0'
    },
    guest_name: {
        type: String,
        default: null
    },
    guest_id: {
        type: String,
        default: '00000000000000'
    },
    contact: {
        type: String,
        default: '+8801'
    },
    email: {
        type: String,
        default: null
    },
    date_of_booking: {
        type: String,
        default: 'DD-MM-YYYY'
    },
    date_of_checkout: {
        type: String,
        default: 'DD-MM-YYYY' 
    }

}, { timestamps: true })

module.exports = mongoose.model("HotelBooking", HotelBookingSchema)



