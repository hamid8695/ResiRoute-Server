const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');

module.exports.connectDb = async(options={})=>{
    try {
        await mongoose.connect(mongodbURL,options);
        console.log("Connected to ResiRoute Database");
        mongoose.connection.on('error',(error)=>{
            console.error('Database Connection Error',error)
        })
    } catch (error) {
        console.error('Could not connect to Db',error.toString())
    }
}