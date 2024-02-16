const ReviewModel = require("../models/review.Model");
module.exports.createReview =async(req,res,next)=>{
    try {
         const newReview= new ReviewModel(req.body);
         const result= await newReview.save();
         console.log(result)
        res.status(200).json({
            message: 'Thank you so much for feedback'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports.getReviewsByHotel = async(req,res,next)=>{
    try {
       const hostId = req.body.hostId;
    //    console.log('hotel id',hostId)
       const result = await ReviewModel.find({
        hotel_id: hostId
       }) 
       console.log('result is',result)
       res.status(200).json({
        message: 'success',
        data: result
    })
    } catch (error) {
        next(error)
    }
}