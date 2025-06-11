const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;

mongoose
    .connect(
        "mongodb+srv://johnclaude2024:l5talMdW5otzNzet@cluster0.1f7efjd.mongodb.net/"
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use(
    cors({
        origin: "http://localhost:5173/",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
