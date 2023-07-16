/* all functions read & write data to files */
const fs = require("fs");
const csv = require("csv-parser");
const readline = require("readline");

const readCSVFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        let data = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", function (row) {
                data.push(row);
            })
            .on("end", function () {
                resolve({ data });
            })
            .on("error", (err) => {
                reject({ error: err });
            });
    });
};

const readFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        let data = [];
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject({ error: err });
            } else {
                resolve({ data });
            }
        });
    });
};

const writeFileAsync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, "utf8", (err) => {
            if (err) {
                reject({ error: err });
            } else {
                resolve({ message: "file written successfully" });
            }
        });
    });
};

const readLargeFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        let vectors = [];

        const readStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: readStream,
            crlfDelay: Infinity,
        });

        rl.on("line", (line) => {
            // console.log("reading line ...");
            try {
                vectors.push(JSON.parse(line));
            } catch (error) {}
        });

        rl.on("close", () => {
            console.log(`${vectors.length} line read`);
            resolve(vectors);
        });

        rl.on("error", () => {
            reject("Something went wrong!");
        });
    });
};

module.exports = {
    readFileAsync,
    writeFileAsync,
    readCSVFileAsync,
    readLargeFileAsync,
};
