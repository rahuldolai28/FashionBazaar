const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtil(url);
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            result,
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({
            success: false,
            message: "Image upload failed",
        });
    }
};
//add a new product
const addProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;

        // Validate required fields
        // if (!title || !price || !category) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Title, price, and category are required",
        //     });
        // }

        // Create a new product object
        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price: parseFloat(price),
            salePrice: salePrice ? parseFloat(salePrice) : null,
            totalStock,
        });
        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: newlyCreatedProduct,
        });
    } catch (error) {
        console.error("Error during adding product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add product",
        });
    }
};

// fetch all products
const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: listOfProducts,
        });
    } catch (error) {
        console.error("Error during fetching product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
        });
    }
};

// edit a product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;
        let findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === "" ? 0 : price || findProduct.price;
        findProduct.salePrice =
            salePrice === "" ? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock
            ? parseInt(totalStock)
            : findProduct.totalStock;
        findProduct.image = image || findProduct.image;

        await findProduct.save();

        res.status(200).json({
            success: true,
            message: "Product edited successfully",
            data: findProduct,
        });
    } catch (error) {
        console.error("Error during editing product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to edit product",
        });
    }
};

// delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.error("Error during deleting product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
        });
    }
};

module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
};
