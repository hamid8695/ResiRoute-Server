const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.tokenGenerate =(userInfo)=>{
    const payload = {
        email: userInfo.email
    }
    const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '7days' })
   
    return token;
}


/* 
1.node
2.crypto.randomBytes(64).toString('hex')
*/