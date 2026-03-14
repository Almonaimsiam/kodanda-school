const express = require('express');
const SSLCommerzPayment = require('sslcommerz-lts');
const router = express.Router();
const Student = require('../models/Student.cjs');

// 🟢 ROUTE: INITIALIZE PAYMENT
router.post('/init', async (req, res) => {
    try {
        const { studentId, name, amount } = req.body;
        const tran_id = `REF_${Date.now()}`;

        // Fixed: Use the base URL for the API callbacks
        const SITE_URL = process.env.NODE_ENV === 'production' 
            ? "https://kodanda-school-project-v2.vercel.app" 
            : "http://localhost:5000";

        const data = {
            total_amount: amount,
            currency: 'BDT',
            tran_id: tran_id,
            success_url: `${SITE_URL}/api/payment/success`, // SSLCommerz will POST to this
            fail_url: `${SITE_URL}/api/payment/fail`,
            cancel_url: `${SITE_URL}/api/payment/cancel`,
            ipn_url: `${SITE_URL}/api/payment/ipn`,
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

        const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD, process.env.IS_LIVE === 'true');
        sslcz.init(data).then(apiResponse => {
            res.status(200).json({ paymentUrl: apiResponse.GatewayPageURL });
        }).catch(err => {
            res.status(500).json({ message: "SSLCommerz Initialization Failed" });
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during payment init" });
    }
});

// 🟢 ROUTE: PAYMENT SUCCESS
router.post('/success', async (req, res) => {
    // SSLCommerz sends the tran_id in the body
    const { tran_id, value_a } = req.body;
    
    // Update Student Database Logic (uncomment when ready)
    // await Student.updateOne({ studentId: value_a }, { tuitionFeePaid: true });

    const frontendURL = process.env.NODE_ENV === 'production' 
        ? "https://kodanda-school-project-v2.vercel.app" 
        : "http://localhost:5173";

    // Redirect to the React page
    res.redirect(`${frontendURL}/payment-success/${tran_id}`);
});

// 🔴 ROUTE: PAYMENT FAIL & CANCEL
router.post('/fail', async (req, res) => {
    const frontendURL = process.env.NODE_ENV === 'production' 
        ? "https://kodanda-school-project-v2.vercel.app" 
        : "http://localhost:5173";
    res.redirect(`${frontendURL}/payment-fail`);
});

router.post('/cancel', async (req, res) => {
    const frontendURL = process.env.NODE_ENV === 'production' 
        ? "https://kodanda-school-project-v2.vercel.app" 
        : "http://localhost:5173";
    res.redirect(`${frontendURL}/payment-fail`);
});

module.exports = router;