const Resident = require("../models/resident.Modal");
module.exports.createResident =async(req,res,next)=>{
    try {
        console.log(req.body)
         const newResident = new Resident(req.body);
         const result= await newResident.save();
         console.log(result)
        res.status(200).json({
            message: 'success'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports.getAllResident = async(req,res,next)=>{
    try {
        const result = await Resident.find({});
        res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getAResident = async(req,res,next)=>{
    try {
        const {id}=req.params;
        const result =await Resident.findOne({_id: id});
        console.log(result);
        res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}