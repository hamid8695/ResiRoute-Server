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
        const result = await Resident.find({});
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