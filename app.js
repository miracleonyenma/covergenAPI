const express = require("express");
const app = express();
const dotenv = require("dotenv");

const takeScreenshot = require("./modules/takeScreenshot");
const uploadScreenshot = require("./modules/uploadScreenshot");

dotenv.config({
	path: "./.env",
});

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.static("templates")); //Serve static files from the templates directory

app.get("/", (req, res) => {
	res.send(require("./templates/index.html"));
});

app.post("/screenshot/miracleio.me", async (req, res) => {
	// console.log(req.body);
	const targetURL = req.body.targetURL;
	const document = req.body.document;

	try {
		let screenshot = await takeScreenshot(targetURL, document);
		screenshot = await uploadScreenshot(
			{
				folder: `miracleio.me/covers/${document.slug}`,
				public_id: "cover",
			},
			screenshot
		);
		console.log(screenshot);

		res.status(200).json(screenshot);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
