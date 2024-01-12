const User = require("../models/user.Modal");
const { tokenGenerate } = require("../helper/jsonwebtoken");
const bcrypt = require('bcrypt')
module.exports.loginAnAdmin = async (req, res, next) => {
    try {
        const admin = await User.findOne({ email: req.body.email, role: "Admin" })
        if (!admin) {
            res.status(404).send({
                message: "No Admin Found!"
            });
        } else {
            if (!req.body.email || !req.body.password) {
                res.send({ message: "Email and Password must be required!" })
            } else {
                const validPassword = await bcrypt.compare(req.body.password, admin.password);
                if (!validPassword) {
                    res.status(403).send({ message: "Wrong Password!" });
                } else {
                    console.log('aaaaaaaaaaaaa', admin)
                    const token = tokenGenerate(admin);
                    res.status(200).json({
                        message: "Admin logged in successfully",
                        data: {
                            role: "Admin",
                            token: token
                        }
                       
                    })
                }
            }
        }
    } catch (error) {
        next(error)
    }
}