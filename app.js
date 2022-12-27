const express = require("express");
const app = express();
const dotenv = require("dotenv");

const takeScreenshot = require("./modules/takeScreenshot");
const uploadScreenshot = require("./modules/uploadScreenshot");
const readJSON = require("./modules/readJSON");
const writeJSON = require("./modules/writeJSON");

dotenv.config({
	path: "./.env",
});

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.static("templates")); //Serve static files from the templates directory

app.get("/", async (req, res) => {
	res.send(require("./templates/index.html"));
});

app.get("/ahh", async (req, res) => {
	await readJSON()
	res.send({
		success: true
	})
})

app.post("/screenshot/miracleio.me", async (req, res) => {
	const targetURL = req.body.targetURL;
	const document = req.body.document;

	const covers = await readJSON()
	console.log({ covers });

	// check in covers array for item that matches the slug and updatedAt
	const existingCover = covers.find((cover) => {
		console.log(`${cover.slug} === ${document.slug}`);
		if (cover.slug === document.slug && cover.updatedAt === document.updatedAt) {
			console.log("match");
			return true;
		}
	});

	console.log({ existingCover });

	if (!existingCover) {
		console.log("no match");

		try {
			let screenshot = await takeScreenshot(targetURL, document);
			screenshot = await uploadScreenshot(
				{
					folder: `miracleio.me/covers/${document.slug}`,
					public_id: "cover",
				},
				screenshot
			);
			
			// add document to screenshot object
			screenshot = { ...screenshot, ...document };
			console.log(screenshot);

			// add screenshot to covers array
			covers.push(screenshot);

			// write json file
			await writeJSON(JSON.stringify(covers, null, 2));

			res.status(200).json(screenshot);
		} catch (error) {
			console.log(error);
			res.status(400).json(error);
		}
	}

	res.status(200).json(existingCover)
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
