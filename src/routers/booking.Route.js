const router = require('express').Router();
const Controller = require('../controllers/booking.Controller')

router.post("/create",Controller.createGuestBooking)
router.post("/list-by-host",Controller.bookingListByHost)
router.post("/payment",Controller.hotelBookingPayment)
router.post("/payment/success/:id",Controller.PaymentSuccess)

module.exports = router;
