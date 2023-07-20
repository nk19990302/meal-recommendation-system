const { readFileAsync, writeFileAsync } = require("./../utils/file");
const {
    stringifyLargeText,
    stringifyLargeTextJson,
} = require("./../utils/process");
require("dotenv").config();

const { createFeatureVectors } = require("./../libs/vectors");

const TRAINING_JSON_FILE_PATH = process.env.TRAINING_JSON_FILE_PATH;
const FEATURE_VECTORS_FILE_PATH = process.env.FEATURE_VECTORS_FILE_PATH;
const FEATURES_FILE_PATH = process.env.FEATURES_FILE_PATH;
const FEATURE_LENGTH = process.env.FEATURE_LENGTH;

/* takes input from folder input/data.json and save the result in output */
const trainModel = async () => {
    try {
        console.log("reading training data...");
        const raw = await readFileAsync(TRAINING_JSON_FILE_PATH);
        const data = JSON.parse(raw.data);

        console.log("creating features...");
        let vocabulary = Array.from(
            new Set(data.flatMap((item) => item.keywords))
        );
        vocabulary = vocabulary.slice(0, FEATURE_LENGTH);

        console.log("writing features to file...");
        const vocabularyOutput = await writeFileAsync(
            FEATURES_FILE_PATH,
            stringifyLargeTextJson(vocabulary)
        );
        console.log("features - ", vocabularyOutput);

        console.log("creating feature vectors...");
        let vectors = createFeatureVectors(data, vocabulary);
        console.log("writing vectors to file...");
        const outputResult = await writeFileAsync(
            FEATURE_VECTORS_FILE_PATH,
            stringifyLargeText(vectors)
        );
        console.log("model - ", outputResult);
    } catch (error) {
        console.log(error);
    }
};

// npm run train
trainModel();
