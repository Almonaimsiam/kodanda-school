// 🟦 [TEMPLATE: AUTHENTICATION_ROUTES]
// Use this for User Registration and Login logic.

const express = require('express');
const bcrypt = require('bcryptjs'); // For hiding passwords
const jwt = require('jsonwebtoken'); // For login sessions
const Student = require('../models/Student.cjs'); // Import our Database Model

const router = express.Router();

// 🟢 ROUTE 1: REGISTER A NEW STUDENT (POST /api/auth/register)
router.post('/register', async (req, res) => {
    try {
        const { studentId, password, name, studentClass } = req.body;

        // 1. Check if student already exists
        const existingStudent = await Student.findOne({ studentId });
        if (existingStudent) {
            return res.status(400).json({ message: "Student ID already exists!" });
        }

        // 2. Hash (Encrypt) the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Save new student to database
        const newStudent = new Student({
            studentId,
            password: hashedPassword,
            name,
            class: studentClass
        });

        await newStudent.save();
        res.status(201).json({ message: "Student registered successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error during registration" });
    }
});

// 🔵 ROUTE 2: STUDENT LOGIN (POST /api/auth/login)
router.post('/login', async (req, res) => {
    try {
        const { studentId, password } = req.body;

        // 1. Find the student in database
        const student = await Student.findOne({ studentId });
        if (!student) {
            return res.status(400).json({ message: "Invalid Student ID or Password" });
        }

        // 2. Check if password is correct
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Student ID or Password" });
        }

        // 3. Create a Login Token (JWT)
        const token = jwt.sign(
            { id: student._id, studentId: student.studentId }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1d" } // Token expires in 1 day
        );

        res.json({
            message: "Login Successful",
            token,
            student: {
                studentId: student.studentId,
                name: student.name,
                class: student.class,
                tuitionFeePaid: student.tuitionFeePaid
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error during login" });
    }
});

module.exports = router;