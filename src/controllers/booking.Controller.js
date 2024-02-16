const BookingModel = require("../models/booking.Model");
const SSLCommerzPayment = require('sslcommerz-lts')
const { ObjectId } = require('mongodb');
const Resident = require("../models/resident.Modal");

const store_id = 'resir65901b469fdd2'
const store_passwd = 'resir65901b469fdd2@ssl'
const is_live = false //true for live, false for sandbox


const tran_id = new ObjectId().toString();

module.exports.hotelBookingPayment = async (req, res, next) => {
    try {

        const newBooking = new BookingModel({ ...req.body, tranjectionId: tran_id });
        const result = await newBooking.save();
        if (result) {
            const data = {
                total_amount: req.body.price,
                currency: 'BDT',
                tran_id: tran_id, // use unique tran_id for each api call
                success_url: `https://resi-route-server.vercel.app/api/booking/payment/success/${tran_id}`,
                fail_url: 'http://localhost:3030/fail',
                cancel_url: 'http://localhost:3030/cancel',
                ipn_url: 'http://localhost:3030/ipn',
                shipping_method: 'Courier',
                product_name: 'Hotel Booking.',
                product_category: 'Hotel',
                product_profile: 'general',
                cus_name: req?.body?.guest_name,
                cus_email: req?.body?.email,
                cus_add1: 'Dhaka',
                cus_add2: 'Dhaka',
                cus_city: 'Dhaka',
                cus_state: 'Dhaka',
                cus_postcode: '1000',
                cus_country: 'Bangladesh',
                cus_phone: req?.body?.contact,
                cus_fax: '01711111111',
                ship_name: 'Customer Name',
                ship_add1: 'Dhaka',
                ship_add2: 'Dhaka',
                ship_city: 'Dhaka',
                ship_state: 'Dhaka',
                ship_postcode: 1000,
                ship_country: 'Bangladesh',
            };
            console.log('store', store_id, store_passwd, is_live)
            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
            sslcz.init(data).then(apiResponse => {

                // Redirect the user to payment gateway
                let GatewayPageURL = apiResponse.GatewayPageURL
                console.log('Redirecting to: ', GatewayPageURL)
                res.send({ url: GatewayPageURL })
            });
        }
    } catch (error) {
        next(error)
    }
}

module.exports.PaymentSuccess = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await BookingModel.updateOne({ tranjectionId: id }, {
            $set: {
                payment_status: true
            }
        })
        if (result?.modifiedCount > 0) {
            res.redirect(`http://localhost:5173/payment-success/${id}`)
        }
    } catch (error) {
        next(error);
    }
}
module.exports.createGuestBooking = async (req, res, next) => {
    try {
        console.log(req.body)
        const newBooking = new BookingModel(req.body);
        const result = await newBooking.save();
        res.status(200).json({
            message: 'Your booking request is sent to Host. Please wait for confirmation!',
            data: result
        })
    } catch (error) {
        next(error)
    }
}
module.exports.bookingListByHost = async (req, res, next) => {
    try {
        console.log('reqqqqqqqq', req.body)
        const hotel_id = req.body.hotel_id;
        const result = await BookingModel.find({
            hotel_id: hotel_id
        })


        console.log('result is', result)
        res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        next(error)
    }
}


module.exports.bookingInfoByCustomer = async (req, res, next) => {
    try {
        const guest_id = req.body.guest_id;

        const result = await BookingModel.find({
            guest_id: guest_id
        }).populate('hotel_id','resident_name')
        
        console.log(result)
        res.status(200).json({
            message: 'success',
            data: result
        })
    } catch (error) {
        console.log(error)
        next(error);
    }
}