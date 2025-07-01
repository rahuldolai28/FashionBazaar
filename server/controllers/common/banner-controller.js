const Banner = require("../../models/Banner");

const addBannerImage = async (req, res) => {
    try {
        const { image } = req.body;
        const banner = new Banner({ image });
        await banner.save();
        res.status(201).json({
            success: true,
            message: "Banner added successfully",
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add banner",
            error: error.message,
        });
    }
};

const getBannerImage = async (req, res) => {
    try {
        const banner = await Banner.find({});
        res.status(200).json({
            success: true,
            message: "Banner retrieved successfully",
            data: banner,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get banner",
            error: error.message,
        });
    }
};

module.exports = {
    addBannerImage,
    getBannerImage,
};
