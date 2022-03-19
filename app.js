const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config({
	path: "./.env",
});

app.get("/", (req, res) => {
	res.send("Hello World!");
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
