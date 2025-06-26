const Product = require("../../models/Product");

function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

const getFilteredProducts = async (req, res) => {
    try {
        const {
            category = "",
            brand = "",
            sortBy = "price-lowtohigh",
        } = req.query;

        let filters = {};

        if (category.length) {
            filters.category = { $in: category.split(",") };
        }
        if (brand.length) {
            filters.brand = { $in: brand.split(",") };
        }
        let sort = {};

        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1;
                break;
            case "price-hightolow":
                sort.price = -1;
                break;
            case "title-atoz":
                sort.title = 1;
                break;
            case "title-ztoa":
                sort.title = -1;
                break;
            default:
                sort.price = 1;
                break;
        }

        const productsList = await Product.find(filters).sort(sort);
        let products;

        // Shuffle only if no filters and default sortBy is used
        if (Object.keys(filters).length === 0 && sortBy === "price-lowtohigh") {
            products = shuffleArray(productsList);
        } else {
            products = productsList;
        }

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

const getProductsDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message:
                "Error get product details in shopping product controller ",
        });
    }
};

module.exports = { getFilteredProducts, getProductsDetails };
