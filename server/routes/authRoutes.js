const express = require('express');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
const JWT_SECRET = process.env.JWT_SECRET;
const cookieParser = require('cookie-parser');
const router = express.Router();
const User = require ('../models/user');
const saltRounds = 10;

router.post("/register", async (req, res)  =>{

    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({success: false, message: "badboy"});

    }

    const userExists = await User.findOne({$or:[{username},{email}]});

    if (userExists){
        return res.status(401).json({success: false , message: "user exists"});
    }
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    const newUser = new User({username, email, password: hashedPassword});
    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

        // Send Token as HTTP-only Cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevents client-side access (more secure)
            secure: process.env.DEV !== "true", // Secure in production (HTTPS only)
            sameSite: "Strict", // Helps with CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
    return res.status(200).json({success: true, message:"got the info"});

});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

        // Send Token as HTTP-only Cookie
        res.cookie("token", token, {
            httpOnly: true,  // Prevents client-side access (more secure)
            secure: process.env.DEV !== "true", // Secure in production (HTTPS only)
            sameSite: "Strict", // Helps with CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({ success: true, message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});


router.post("/logout" , async (req, res )=>{

    res.clearCookie('token', { path: '/' }); // Clear the cookie named 'token'
    res.status(200).json({ success: true , message: 'Logged out successfully' });

});


router.get('/profile', verifyToken, async (req, res) => {
    const token = req.cookies.token;
    decoded = jwt.decode(token,JWT_SECRET);
    const user = await User.findOne({_id: decoded.id}).select("username email");
    res.json({ success: true, user :{ cusername: user.username, email: user.email}});
});

module.exports = router;