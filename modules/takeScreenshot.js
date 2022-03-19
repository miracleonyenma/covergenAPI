const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

module.exports = async (targetURL, document) => {
	// launch browser
	const browser = await puppeteer.launch({
		args: chromium.args,
		// get path to browser
		executablePath: process.env.EXCECUTABLE_PATH || (await chromium.executablePath),
		headless: true,
	});

	return browser;
};
