const createHttpError = require("http-errors");
const User = require("../models/user.Modal");
const { updateUser, userBulkUpdate, userDeleteByIdService, userBulkDeleteServies } = require("../services/user.service");
const mongoose = require("mongoose");
const { tokenGenerate } = require("../helper/jsonwebtoken");
const bcrypt = require('bcrypt')

module.exports.createAuser = async (req, res,next) => {
    try {
        console.log('reqqqqqqqqq',req.body)
         const newUser = new User(req.body);
         const user = await newUser.save();
         console.log('hlww',user)
        res.status(200).json({
            message: "success",
            result: user
        })
    } catch (error) {
       next(error)
    }
}

module.exports.loginAuser = async (req,res,next)=>{
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
                    // const token = tokenGenerate(user);
                    res.status(200).json({
                        message: "user logged in successfully",
                        data: user
                        // data: {
                        //     token: token
                        // }
                    })
                }
            }
        }
   } catch (error) {
       next(error) 
    }
}

module.exports.getAllUser = async (req, res,next) => {
    try {
        const ObjQuery ={ ...req.query};
        const excludedField = ['sort','limit','page'];
        excludedField.forEach(field => delete ObjQuery[field]);
        console.log('1',ObjQuery);
        console.log('2',req.query)
        const users = await User.find(ObjQuery).limit(3);
        res.status(200).json({
            data: users
        })
        // const search = req.query.search || "";
        // const page = Number(req.query.page) || 1;
        // const limit = Number(req.query.limit) || 5;

        // const searchRegExp = new RegExp('.*'+search +".*", 'i');
        // const filter = {
        //     isAdmin: {$ne: true},
        //     $or:[
        //         {name: {$regex: searchRegExp}},
        //         {email: {$regex: searchRegExp}}
        //     ]
        // }
        
        // const users = await User.find(filter).limit(limit).skip((page-1)*limit)
        // const count =await User.find(filter).countDocuments();
        // if(!users) throw createHttpError(404, 'no users found');

        // res.status(200).json({
        //     message: "success",
        //     result: users,
        //     pagination: {
        //         totalPages: Math.ceil(count/limit),
        //         currentPage: page,
        //         previousPage: page-1>0 ? page-1 : null,
        //         nextPage: page+1 <=Math.ceil(count/limit)? page+1 : null
        //     }   
        // })
    } catch (error) {
       next(error)
    }
}

module.exports.getAUser= async(req,res,next)=>{
    try {
        const {id}=req.params;
        // const options = {password: 0}
        const user = await User.findById(id);
        res.status(200).json({
            message: "success",
            result: user
        })
    } catch (error) {
        if(error instanceof mongoose.Error){
            next(createHttpError(400,"Invalid user id"))
            return;
        }
        next(error)
    }
}

module.exports.updateAuser = async (req, res,next) => {
    try {
        const {id}=req.params;
        const result =await updateUser(id,req.body)
        res.status(200).json({
            message: "success",
            result: result
        })
    } catch (error) {
       next(error)
    }
}


module.exports.userBulkUpdate = async (req, res,next) => {
    try {
        const result =await userBulkUpdate(req.body)
        res.status(200).json({
            message: "success",
            result: result
        })
    } catch (error) {
       next(error)
    }
}

module.exports.userDeleteById = async (req, res,next) => {
    try {
        const {id}=req.params;
        const result =await userDeleteByIdService(id)
        res.status(200).json({
            message: "success",
            result: result
        })
    } catch (error) {
       next(error)
    }
}
module.exports.userBulkDelete = async (req, res,next) => {
    try {
        const result =await userBulkDeleteServies(req.body.ids)
        res.status(200).json({
            message: "success",
            result: result
        })
    } catch (error) {
       next(error)
    }
}


// const queryObj = {...req.query}
// excludedFields = ["limit","sort","page"];
// excludedFields.foreach(field=> delete queryObj[fields])