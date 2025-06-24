const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
require("dotenv").config();

//register
const registerUser = async (req, res) => {
    // Handle user registration logic here
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate input, check user credentials, generate token, etc.
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist with this email",
            });
        }
        const isPasswordValid = await bcrypt.compare(
            password,
            checkUser.password
        );
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password! Please try again.",
            });
        }
        // Generate JWT token
        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                username: checkUser.username,
            },
            process.env.JWT_SECRET,
            // "your-secret-key",
            { expiresIn: "1h" }
        );
        // Set token in cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            // secure: process.env.NODE_ENV === "production", // Set to true in production
            sameSite: "Lax",
        })
            .status(200)
            .json({
                success: true,
                message: "User logged in successfully",
                user: {
                    id: checkUser._id,
                    username: checkUser.username,
                    email: checkUser.email,
                    role: checkUser.role,
                },
                token: token,
            });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//logout
const logoutUser = (req, res) => {
    // Handle user logout logic here
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // Set to true in production
        sameSite: "None",
    })
        .status(200)
        .json({
            success: true,
            message: "User logged out successfully",
        });
};

//auth-middleware
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired",
                expiredAt: error.expiredAt, // optional for debugging
            });
        }
        return res.status(403).json({
            success: false,
            message: "Invalid token",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware,
};
