// 🟦 [TEMPLATE: MONGOOSE_MODEL]
// Use this template to create any database table (Users, Products, Students, etc.)

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true // No two students can have the same ID
    },
    password: {
        type: String,
        required: true // We will encrypt this later!
    },
    name: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    tuitionFeePaid: {
        type: Boolean,
        default: false // By default, fees are unpaid until SSLCommerz says otherwise
    }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' dates

module.exports = mongoose.model('Student', studentSchema);