const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'User name is required!'],
        trim: true,
        minLength: [2,'User name must be greater than 2 characters!'],
        maxLength: [31,'User name must be less than 31 characters!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (v) => {
               return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        trim: true,
        minLength: [6,'password must be greater than 6 characters!'],
        set: (v)=>bcrypt.hashSync(v,bcrypt.genSaltSync(10))
    },
    image: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "guest"
    },
    isBanned: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      delete returnedObject.__v;
      delete returnedObject.updatedAt;
      delete returnedObject.createdAt;
      //do not reveal passwordHash
      delete returnedObject.password;
    },
  });


module.exports=mongoose.model("Users",userSchema)