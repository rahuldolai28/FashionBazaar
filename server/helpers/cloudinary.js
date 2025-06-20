const cloudinary = require('cloudinary').v2;
const multer = require('multer');


cloudinary.config({
    cloud_name: 'dpsub2vjz',
    api_key: '899415186547952',
    api_secret: '5EplP-_FRSVHRlujfdH-xz7hyws',
    });

const storage = multer.memoryStorage();


async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    })
    return result;
}

const upload = multer({ storage: storage });

module.exports = {upload, imageUploadUtil};

