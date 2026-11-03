
const User = require('../models/userModels.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId, res) => {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

// Register Controller
const userRegister = async (req, res) => {
    try {
        const { fullname, username, email, password, number } = req.body;

        if (!fullname || !username || !email || !password || !number) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Username or Email already exists"
            });
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            number
        });

        await newUser.save();

        generateToken(newUser._id, res);

        return res.status(201).json({
            success: true,
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilepic: newUser.profilepic,
            email: newUser.email,
            number: newUser.number,
            message: "User registered successfully"
        });

    } catch (error) {
        console.log("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

// Login Controller
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email does not exist. Please register."
            });
        }

        const comparePass = await bcryptjs.compare(
            password,
            user.password
        );

        if (!comparePass) {
            return res.status(400).json({
                success: false,
                message: "Email and Password do not match"
            });
        }

        generateToken(user._id, res);

        return res.status(200).json({
            success: true,
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            number: user.number,
            email: user.email,
            message: "Successfully logged in"
        });

    } catch (error) {
        console.log("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

module.exports = {userRegister,userLogin};
