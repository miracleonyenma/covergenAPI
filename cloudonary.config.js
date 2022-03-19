const dotenv = require("dotenv");

dotenv.config({
	path: "./.env",
});

module.exports = {
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
};