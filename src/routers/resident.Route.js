const router = require('express').Router();
const residentController = require('../controllers/resident.Controller')

router.post("/create",residentController.createResident)
router.get("/all",residentController.getAllResident)
router.get("/single/:id",residentController.getAResident)
router.post("/get-resident-by-host",residentController.getAllResidentCreatedByHost)
router.get("/get-resident-by-search",residentController.getResidentBySearch)

module.exports = router;
