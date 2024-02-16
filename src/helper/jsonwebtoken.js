const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.tokenGenerate =(userInfo)=>{
    const payload = {
        email: userInfo.email
    }
    console.log('from token',payload)
    const token = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '7days' })
   console.log('token',token)
    return token;
}


/* 
1.node
2.crypto.randomBytes(64).toString('hex')
*/