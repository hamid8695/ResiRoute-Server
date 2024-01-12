const router = require('express').Router();
const adminController = require('../controllers/admin.Controller')


router.post("/login",adminController.loginAnAdmin)


module.exports = router;
