// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");

// require("dotenv").config();

// console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API key:", process.env.CLOUDINARY_API_KEY);
// console.log("API secret:", process.env.CLOUDINARY_API_SECRET);


// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });




// const storage = multer.memoryStorage();

// async function imageUploadUtil(file) {
//     const result = await cloudinary.uploader.upload(file, {
//         resource_type: "auto",
//     });
//     return result;
// }

// const upload = multer({ storage: storage });

// module.exports = { upload, imageUploadUtil };
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");

require("dotenv").config();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// cloudinary.config({
//     cloud_name: 'dpsub2vjz',
//     api_key: '899415186547952',
//     api_secret: '5EplP-_FRSVHRlujfdH-xz7hyws',
//     });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

module.exports = { upload, imageUploadUtil };
