const Resident = require("../models/resident.Modal");
module.exports.createResident = async (req, res, next) => {
    try {
        const newResident = new Resident(req.body);
        await newResident.save();
        res.status(200).json({
            message: 'success'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports.getAllResident = async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await Resident.find(req.body);
        res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getResidentBySearch = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        // const limit = Number(req.query.limit) || 5;

        const searchRegExp = new RegExp('.*' + search + ".*", 'i');
        const filter = {
            is_active: { $ne: false },
            $or: [
                { resident_name: { $regex: searchRegExp } },
                { address: { $regex: searchRegExp } },
                { resident_type: { $regex: searchRegExp } },
            ]
        }

        console.log(filter,search)
        const residents = await Resident.find(filter).limit(20);
        res.status(200).json({
            message: 'success',
            data: residents
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getAResident = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Resident.findOne({ _id: id });
        res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}


module.exports.getAllResidentCreatedByHost = async (req, res, next) => {
    try {
        const host_id = req.body.host_info;
        const result = await Resident.find({ host_info: host_id })
        res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}


module.exports.updateResidentPriceByHost = async(req,res,next)=>{
    try {
        
        const resident_id = req.body.resident_id;
        const price = req.body.price;
        await Resident.updateOne({
            _id: resident_id
        },{
            $set: {
                price: price
            }
        })
        res.json({
            message: "Price Updated Successfully!"
        })
    } catch (error) {
        next(error);
    }
}

module.exports.deleteHotelInfo = async(req,res,next)=>{
    try {
        await Resident.deleteOne({
            _id: req.params.id
        })
        res.send("ok")
    } catch (error) {
        next(error);
    }
}


module.exports.changeHotelStatus = async(req,res,next)=>{
    try {
      await Resident.updateOne({
        _id: req.params.id
      }, {
        $set: req.body
      })  
      res.send("ok")
    } catch (error) {
        next(error);
    }
}
