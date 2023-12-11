const jwt = require('jsonwebtoken');
const {promisify}=require('util')

module.exports= async (req,res,next)=>{
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        !token && res.status(401).json({
            message: "You are not logged in"
        })

        const decoded = await promisify(jwt.verify)(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid Token"
        })
    }
}