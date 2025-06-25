const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://fashionbazaar-client.vercel.app",
            "https://fashion-bazaar.vercel.app/",
        ],
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
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);

//api/auth/register - authRouter
//api/auth/login - loginRouter
//api/auth/logout - logoutRouter

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
