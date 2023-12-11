const router = require('express').Router();
const residentController = require('../controllers/resident.Controller')

router.post("/create",residentController.createResident)
router.get("/all",residentController.getAllResident)
router.get("/single/:id",residentController.getAResident)

module.exports = router;
