const router = require('express').Router();
const Controller = require('../controllers/review.Controller')

router.post("/create",Controller.createReview)
router.post("/get-review-by-hotel",Controller.getReviewsByHotel)

module.exports = router;
