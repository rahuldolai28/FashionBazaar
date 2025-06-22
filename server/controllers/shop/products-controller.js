const Product = require("../../models/Product");

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

const getFilteredProducts = async (req, res) => {
    try {
        const productsList = await Product.find({});
        const products = shuffleArray(productsList); // Shuffle order

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error fetching products in shopping product controller ",
        });
    }
};

module.exports = { getFilteredProducts };
