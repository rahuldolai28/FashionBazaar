const express = require("express");

const {
    addBannerImage,
    getBannerImage,
} = require("../../controllers/common/banner-controller.js");

const router = express.Router();

router.post("/add", addBannerImage);
router.get("/get", getBannerImage);

module.exports = router;
