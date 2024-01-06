const mongoose = require("mongoose");

const GuestReviewsSchema = new mongoose.Schema({
    guest_name: {
        type: String,
        default: null
    },
    feedback: {
        type: String,
        default: null
    },
    rating: {
        type: String,
        default: null
    },
    hotel_id: {
        type: String,
        default: null
    }

},{timestamps: true})

module.exports=mongoose.model("GuestReviews",GuestReviewsSchema)




module.exports=mongoose.model("GuestReviews",GuestReviewsSchema)