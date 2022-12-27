const fs = require("fs");

// create a promise that resolves when the file is written to
const writeFilePromise = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                console.log({ err });
                reject(err);
            }
            resolve();
        })
    })
}

module.exports = async (data) => {
    console.log("writeJSON");
    // write json file
    await writeFilePromise(process.cwd() + "/data/miracleio/covers.json", data);
}