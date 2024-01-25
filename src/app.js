const express = require("express");
const morgan = require('morgan')
const createError = require('http-errors')
const bodyParser = require('body-parser')
const app = express();
const helmet = require("helmet");
const cors = require("cors");


const userRouter = require('./routers/user.Route');
const adminRouter = require('./routers/admin.Route');
const residentRouter = require('./routers/resident.Route');
const houseRouter = require('./routers/house.Route');
const reviewRouter = require('./routers/review.Route');
const bookingRouter = require('./routers/booking.Route');



app.use(cors({
    origin: 'http://localhost:5173'
}));


//  middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



app.use('/api/house',houseRouter)
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)
app.use('/api/resident',residentRouter)
app.use('/api/review',reviewRouter)
app.use('/api/booking',bookingRouter)
app.get('/',(req,res)=>{
    res.send("ResiRoute Server is running")
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