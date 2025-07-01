const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return result;
}

const upload = multer({ storage: storage });

module.exports = { upload, imageUploadUtil };
// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// require("dotenv").config();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// function imageUploadUtil(fileBuffer) {
//     return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//             { resource_type: "auto" },
//             (error, result) => {
//                 if (error) reject(error);
//                 else resolve(result);
//             }
//         );
//         stream.end(fileBuffer);
//     });
// }

// module.exports = { upload, imageUploadUtil };
