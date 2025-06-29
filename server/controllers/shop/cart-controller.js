const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body;

        if (!productId || !userId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Product ID, User ID and quantity are required",
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            const newCart = new Cart({
                userId,
                items: [{ productId, quantity }],
            });
            await newCart.save();
            return res.status(201).json({
                success: true,
                message: "Product added to cart",
                data: newCart,
            });
        }

        const existingItem = cart.items.find(
            (item) => item.productId.toString() === productId
        );
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User ID is required",
            });
        }
        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "title price image salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const validItems = cart.items.filter((item) => item.productId);
        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }
        const populateCartItems = validItems.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
            image: item.productId.image,
            title: item.productId.title,
            salePrice: item.productId.salePrice,
        }));

        return res.status(200).json({
            success: true,
            message: "Cart items fetched",
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User ID is required",
            });
        }
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        const item = cart.items.find(
            (item) => item.productId._id.toString() === productId
        );
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
        item.quantity = quantity;
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "title price image salePrice",
        });

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            quantity: item.quantity,
            price: item.productId ? item.productId.price : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            salePrice: item.productId ? item.productId.salePrice : null,
        }));
        return res.status(200).json({
            success: true,
            message: "Cart item updated",
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(401).json({
                success: false,
                message: "User ID and product ID are required",
            });
        }
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        await cart.populate({
            path: "items.productId",
            select: "title price image salePrice",
        });
        cart.items = cart.items.filter(
            (item) =>
               ( item.productId && item.productId._id.toString() !== productId)
        );
        await cart.save();

        // Reload the cart from DB with populated productId
        await cart.populate({
            path: "items.productId",
            select: "title price image salePrice",
        });

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            quantity: item.quantity,
            price: item.productId ? item.productId.price : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            salePrice: item.productId ? item.productId.salePrice : null,
        }));

        return res.status(200).json({
            success: true,
            message: "Cart item removed",
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    addToCart,
    fetchCartItems,
    updateCartItem,
    deleteCartItem,
};
