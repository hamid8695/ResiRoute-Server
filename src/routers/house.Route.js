const router = require('express').Router();
const residentController = require('../controllers/resident.Controller')

router.post("/create",residentController.createResident)

module.exports = router;
