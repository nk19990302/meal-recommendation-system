const { readFileAsync, readLargeFileAsync } = require("./../utils/file");
const {
    calculateCosineSimilarity,
    createFeatureVectorsForKeyword,
} = require("./../libs/vectors");
const { processKeywords } = require("../utils/process");
require("dotenv").config();

const FEATURE_VECTORS_FILE_PATH = process.env.FEATURE_VECTORS_FILE_PATH;
const FEATURES_FILE_PATH = process.env.FEATURES_FILE_PATH;

/* takes keywords and return similar items */
const recommendItems = async (keywords, n = 10) => {
    try {
        console.log("reading features...");
        const rawFeatures = await readFileAsync(FEATURES_FILE_PATH);
        const features = JSON.parse(rawFeatures.data);

        console.log("reading feature vectors...");
        featureVectors = await readLargeFileAsync(FEATURE_VECTORS_FILE_PATH);

        console.log("processing keywords...");
        const processedKeywords = processKeywords(keywords);

        console.log("creating target feature vector...");
        const targetVector = createFeatureVectorsForKeyword(
            processedKeywords,
            features
        );

        console.log("calculating similarities...");
        const similarities = featureVectors.map((it) => {
            const similarity = calculateCosineSimilarity(
                targetVector,
                it.features
            );
            return { id: it.id, similarity };
        });
        console.log("sorting similarities...");
        similarities.sort((a, b) => b.similarity - a.similarity);
        const recommendedItems = similarities
            .slice(0, n)
            .map((similarity) => similarity.id);
        console.log(
            "recommended items for keywords",
            recommendedItems,
            keywords
        );
        return recommendedItems;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { recommendItems };

// recommendItems(["banana", "veg"], 3);
