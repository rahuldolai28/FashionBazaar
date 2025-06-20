const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: String,
    title: {
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    category: String,
    brand: String,
    salePrice: Number,
    totalStock: Number,
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;

