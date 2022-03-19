const cloudinary = require("cloudinary").v2;

cloudinary.config(require("../cloudonary.config"));

console.log(cloudinary.config());

module.exports = (options, screenshot) => {
	return new Promise((resolve, reject) => {
		options = options || {
			folder: "screenshots",
			public_id: `screenshot-${new Date().getTime()}`,
		};

		console.log("OPTIONS ==->", options);
		console.log("screenshot ==->", screenshot);

		cloudinary.uploader
			.upload_stream(options, (error, result) => {
				if (error) reject(error);
				else resolve(result);
			})
			.end(screenshot);
	});
};
