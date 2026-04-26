const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

// Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;

    const result = await cloudinary.uploader.upload(filepath, {
      folder: "E-Cart",
    });

    // delete local file
    fs.unlinkSync(filepath);

    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    console.log("Cloudinary Error:", error);
    return null;
  }
};

module.exports = uploadCloudinary;