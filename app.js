const express = require("express");
const app = express();
const dotenv = require("dotenv");

const takeScreenshot = require("./modules/takeScreenshot");

dotenv.config({
	path: "./.env",
});

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/screenshot/miracleio.me", async (req, res) => {
	// console.log(req.body);
	const targetURL = req.body.targetURL;
	const document = req.body.document;

	try {
		console.log(await takeScreenshot(targetURL, document));
	} catch (error) {
		console.log(error);
	}
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
