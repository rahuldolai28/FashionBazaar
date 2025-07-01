const mongoose = require("mongoose");

const BannerShema = new mongoose.Schema(
    {
        image: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Banner", BannerShema);
