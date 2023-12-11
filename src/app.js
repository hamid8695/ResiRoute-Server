const express = require("express");
const morgan = require('morgan')
const createError = require('http-errors')
const bodyParser = require('body-parser')
const app = express();
const userRouter = require('./routers/user.Route');
const residentRouter = require('./routers/resident.Route');
const houseRouter = require('./routers/house.Route');
const helmet = require("helmet");
const cors = require("cors");

app.use(cors({
    origin: 'http://localhost:5173'
}));
// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/house',houseRouter)
app.use('/api/user',userRouter)
app.use('/api/resident',residentRouter)
app.get('/test',(req,res)=>{
    res.send("Server is running")
})

// client error handling
app.use((req,res,next)=>{
    next(createError(404,"Route Not Found"))
})
// server error handling
app.use((err,req,res,next)=>{
    return res.status(err.status || 500).json({
        success: false,
        message: err.message
    })
})
module.exports=app