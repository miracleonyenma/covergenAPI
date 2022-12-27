const fs = require("fs")

// create a promise that resolves when the file is read
const readFilePromise = new Promise((resolve, reject) => {
    fs.readFile(process.cwd() + "/data/miracleio/covers.json", "utf-8", (err, jsonData) => {
        if (err) {
            console.log({ err });
            reject(err);
        }
        // console.log({ fileData: jsonData });

        // parse json
        try {
            const covers = JSON.parse(jsonData);
            // console.log({ covers });
            resolve(covers);
        } catch (error) {
            console.log({ error });
            resolve([]);
        }
    })
})

module.exports = async () => {
    console.log("readJSON");
    // read json file
    const covers = await readFilePromise;
    return covers;
}