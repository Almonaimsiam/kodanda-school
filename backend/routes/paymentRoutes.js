// 🟦 [TEMPLATE: SSLCOMMERZ_PAYMENT_INIT]
// Standard template to initialize a payment gateway request with SSLCommerz.

const express = require('express');
const SSLCommerzPayment = require('sslcommerz-lts');
const router = express.Router();
const Student = require('../models/Student'); // To update fee status later

// Get credentials from .env
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = process.env.IS_LIVE === 'true'; // true for live, false for sandbox

// 🟢 ROUTE: INITIALIZE PAYMENT (POST /api/payment/init)
router.post('/init', async (req, res) => {
    try {
        const { studentId, name, amount } = req.body;
        
        // 1. Generate a unique transaction ID (using current time)
        const tran_id = `REF_${Date.now()}`;

        // 2. Prepare the data SSLCommerz requires
        const data = {
            total_amount: amount,
            currency: 'BDT',
            tran_id: tran_id, // Unique Transaction ID
            success_url: `http://localhost:5000/api/payment/success/${tran_id}`,
            fail_url: `http://localhost:5000/api/payment/fail/${tran_id}`,
            cancel_url: `http://localhost:5000/api/payment/cancel`,
            ipn_url: `http://localhost:5000/api/payment/ipn`,
            shipping_method: 'No',
            product_name: 'Monthly Tuition Fee',
            product_category: 'Education',
            product_profile: 'non-physical-goods',
            cus_name: name,
            cus_email: 'student@kodandaschool.com', // Placeholder email
            cus_add1: 'Kodanda',
            cus_city: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01700000000',
            // We pass the studentId here so we remember who is paying!
            value_a: studentId 
        };

        // 3. Initialize Payment
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to the payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL;
            res.status(200).json({ paymentUrl: GatewayPageURL });
        }).catch(err => {
            console.error(err);
            res.status(500).json({ message: "SSLCommerz Initialization Failed" });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during payment init" });
    }
});
// 🟢 ROUTE: PAYMENT SUCCESS (SSLCommerz sends a POST request here)
router.post('/success/:tran_id', async (req, res) => {
    try {
        // req.body contains all the transaction details from SSLCommerz
        // Remember in the /init route, we saved the studentId in "value_a"
        const studentId = req.body.value_a;

        // 1. Find the student and update their fee status to TRUE
        await Student.findOneAndUpdate(
            { studentId: studentId }, 
            { tuitionFeePaid: true }
        );

        // 2. Redirect the user back to the React Frontend Success Page
        res.redirect(`http://localhost:5173/payment-success/${req.params.tran_id}`);
    } catch (error) {
        console.error("Payment Success Error:", error);
        res.redirect(`http://localhost:5173/payment-fail`);
    }
});

// 🔴 ROUTE: PAYMENT FAIL
router.post('/fail/:tran_id', async (req, res) => {
    // Redirect to React Frontend Fail Page
    res.redirect(`http://localhost:5173/payment-fail`);
});

// 🟡 ROUTE: PAYMENT CANCEL
router.post('/cancel', async (req, res) => {
    // Redirect to React Frontend Fail Page
    res.redirect(`http://localhost:5173/payment-fail`);
});

module.exports = router;