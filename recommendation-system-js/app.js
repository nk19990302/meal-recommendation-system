const express = require("express");
const { corsOptions } = require("./cors.config");
const app = express();
const cors = require("cors");
const {
    FEATURE_VECTOR_FILE_PATH,
    PROCESSED_DATA_FILE_PATH,
    VOCABULARY_FILE_PATH,
    recommendBasedOnKeywords,
} = require(".");
const { readLargeFileAsync, readFileAsync } = require("./libs/file");
require("dotenv").config();
const port = process.env.PORT;

let vectors;
let items;
let vocabulary;

// apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// attach main routes
app.get("/recommendations", async (req, res) => {
    const keywords = req.query.keywords.split(",");
    const recommendations = await recommendBasedOnKeywords(
        keywords,
        vocabulary,
        items,
        vectors,
        5
    );
    res.json(recommendations);
});

app.listen(port, async () => {
    console.log("loading model....");
    vectors = await readLargeFileAsync(FEATURE_VECTOR_FILE_PATH);

    console.log("loading items...");
    const rawItems = await readFileAsync(PROCESSED_DATA_FILE_PATH);
    items = JSON.parse(rawItems.data);

    console.log("loading vocabulary...");
    const vocabularyResponse = await readFileAsync(VOCABULARY_FILE_PATH);
    vocabulary = JSON.parse(vocabularyResponse.data);

    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
