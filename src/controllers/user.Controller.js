const createHttpError = require("http-errors");
const User = require("../models/user.Modal");
const { updateUser, userBulkUpdate, userDeleteByIdService, userBulkDeleteServies } = require("../services/user.service");
const mongoose = require("mongoose");
const { tokenGenerate } = require("../helper/jsonwebtoken");
const bcrypt = require('bcrypt')

module.exports.createAuser = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json({
            message: "Successfully Account Created!",
            result: user
        })
    } catch (error) {
        console.log("error",error)
        next(error)
    }
}

module.exports.loginAuser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).send({
                message: "No user Found!"
            });
        } else {
            if (!req.body.email || !req.body.password) {
                res.send({ message: "Email and Password must be required!" })
            } else {
                const validPassword = await bcrypt.compare(req.body.password, user.password);
                if (!validPassword) {
                    res.status(403).send({ message: "Wrong Password!" });
                } else {
                    console.log('hi')
                    const token = tokenGenerate(user);
                    res.status(200).json({
                        message: "user logged in successfully",
                        data: user,
                        token: token

                    })
                }
            }
        }
    } catch (error) {
        console.log("err",err)
        next(error)
    }
}

module.exports.getAllUser = async (req, res, next) => {
    try {
        const data = await User.find({ role: 'guest' })
        res.status(200).json({
            message: "success",
            result: data
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getAllHost = async (req, res, next) => {
    try {
        const data = await User.find({ role: 'Host' })
        res.status(200).json({
            message: "success",
            result: data
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getAUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        // const options = {password: 0}
        const user = await User.findById(id);
        res.status(200).json({
            message: "success",
            result: user
        })
    } catch (error) {
        if (error instanceof mongoose.Error) {
            next(createHttpError(400, "Invalid user id"))
            return;
        }
        next(error)
    }
}

module.exports.updateAuser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateUser(id, req.body)
        res.status(200).json({
            message: "success",
            result: result
        })
    } catch (error) {
        next(error)
    }
}


module.exports.userBulkUpdate = async (req, res, next) => {
    try {
        const result = await userBulkUpdate(req.body)
        res.status(200).json({
            message: "success",
            result: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports.userDeleteById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await userDeleteByIdService(id)
        res.status(200).json({
            message: "success",
            result: result
        })
    } catch (error) {
        next(error)
    }
}
module.exports.userBulkDelete = async (req, res, next) => {
    try {
        const result = await userBulkDeleteServies(req.body.ids)
        res.status(200).json({
            message: "success",
            result: result
        })
    } catch (error) {
        next(error)
    }
}


module.exports.deleteGuestUser = async(req,res,next)=>{
    try {
        await User.deleteOne({
            _id: req.params.id
        })
        res.send("ok")
    } catch (error) {
        next(error);
    }
}

module.exports.deleteHost = async(req,res,next)=>{
    try {
        await User.deleteOne({
            _id: req.params.id
        })
        res.send("ok")
    } catch (error) {
        next(error);
    }
}


// const queryObj = {...req.query}
// excludedFields = ["limit","sort","page"];
// excludedFields.foreach(field=> delete queryObj[fields])