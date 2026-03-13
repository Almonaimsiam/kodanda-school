const express = require('express');
const SSLCommerzPayment = require('sslcommerz-lts');
const router = express.Router();
const Student = require('../models/Student');

// Credentials from Render Environment Variables
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = process.env.IS_LIVE === 'true'; 

// URLs - Change these if your URLs ever change
const BACKEND_URL = "https://kodanda-backend.onrender.com";
const FRONTEND_URL = "https://kodanda-school-project-v2.vercel.app";

// 🟢 ROUTE: INITIALIZE PAYMENT
router.post('/init', async (req, res) => {
    try {
        const { studentId, name, amount } = req.body;
        const tran_id = `REF_${Date.now()}`;

        const data = {
            total_amount: amount,
            currency: 'BDT',
            tran_id: tran_id,
            // SSLCommerz needs to hit your BACKEND to process the data
            success_url: `${BACKEND_URL}/api/payment/success/${tran_id}`,
            fail_url: `${BACKEND_URL}/api/payment/fail/${tran_id}`,
            cancel_url: `${BACKEND_URL}/api/payment/cancel`,
            ipn_url: `${BACKEND_URL}/api/payment/ipn`,
            shipping_method: 'No',
            product_name: 'Monthly Tuition Fee',
            product_category: 'Education',
            product_profile: 'non-physical-goods',
            cus_name: name,
            cus_email: 'student@kodandaschool.com',
            cus_add1: 'Kodanda',
            cus_city: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01700000000',
            value_a: studentId 
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then(apiResponse => {
            let GatewayPageURL = apiResponse.GatewayPageURL;
            res.status(200).json({ paymentUrl: GatewayPageURL });
        }).catch(err => {
            console.error("SSL Init Error:", err);
            res.status(500).json({ message: "SSLCommerz Initialization Failed" });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during payment init" });
    }
});

// 🟢 ROUTE: PAYMENT SUCCESS (SSLCommerz hits this, then we send user to Vercel)
router.post('/success/:tran_id', async (req, res) => {
    try {
        const studentId = req.body.value_a;

        // Update database
        await Student.findOneAndUpdate(
            { studentId: studentId }, 
            { tuitionFeePaid: true }
        );

        // Redirect user to the FRONTEND (Vercel) success page
        res.redirect(`${FRONTEND_URL}/payment-success`);
    } catch (error) {
        console.error("Payment Success Error:", error);
        res.redirect(`${FRONTEND_URL}/payment-fail`);
    }
});

// 🔴 ROUTE: PAYMENT FAIL
router.post('/fail/:tran_id', async (req, res) => {
    res.redirect(`${FRONTEND_URL}/payment-fail`);
});

// 🟡 ROUTE: PAYMENT CANCEL
router.post('/cancel', async (req, res) => {
    res.redirect(`${FRONTEND_URL}/payment-fail`);
});

module.exports = router;