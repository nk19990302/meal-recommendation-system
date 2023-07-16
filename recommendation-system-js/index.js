/* lets magic happen */
const {
    writeFileAsync,
    readCSVFileAsync,
    readFileAsync,
    readLargeFileAsync,
} = require("./libs/file");
const {
    extractKeywords,
    stringifyLargeText,
    stringifyLargeTextJson,
} = require("./libs/process");
const {
    recommendItems,
    recommendItemsForKeywords,
} = require("./libs/recommend");
const { createFeatureVectors } = require("./libs/vectors");
const {
    summarizeInteractions,
    findInteractionsOfRecipe,
} = require("./utils/gen.util");

// read data from raw data file
const RAW_INTERACTION_FILE_PATH = "./data/RAW_interactions.csv";
const RAW_RECIPES_FILE_PATH = "./data/RAW_recipes.csv";

// write in file
const PROCESSED_DATA_FILE_PATH = "./data/cleaned_data.json";
const FEATURE_VECTOR_FILE_PATH = "./data/model.txt";
const VOCABULARY_FILE_PATH = "./data/model.json";

/* join all data together - remove unwanted data */
const dataProcessing = async () => {
    /* executions */
    console.log("reading interactions...");
    const interactions = await readCSVFileAsync(RAW_INTERACTION_FILE_PATH);
    console.log("reading recipes...");
    const recipes = await readCSVFileAsync(RAW_RECIPES_FILE_PATH);
    console.log("sorting recipes...");
    const sortedRecipes = recipes.data.sort((a, b) => a.id - b.id);
    console.log("combining recipes and interactions...");
    /* Note: Here we are only taking 5000 recipes in considerations */
    const top5000 = sortedRecipes.slice(0, 5000);
    const recipeWithInteractions = top5000.map((it, index) => {
        console.log(`${index} - merging recipe and interactions`);
        const _interactions = findInteractionsOfRecipe(
            interactions.data,
            it.id,
            index
        );
        return { ...it, interactions: _interactions };
    });

    console.log("data cleaning...");
    const cleanedData = recipeWithInteractions.map((it, index) => {
        console.log(`${index} - trimming recipe`);
        const interactionsSummary = summarizeInteractions(it.interactions);

        const mergedText =
            it.tags +
            " " +
            // it.description +
            // " " +
            it.ingredients +
            " " +
            // it.steps +
            // " " +
            interactionsSummary.review;

        return {
            id: it.id,
            rating: interactionsSummary.rating,
            name: it.name,
            keywords: extractKeywords(mergedText),
        };
    });

    console.log("writing recipes to file...");
    const outputResult = await writeFileAsync(
        PROCESSED_DATA_FILE_PATH,
        JSON.stringify(cleanedData)
    );

    console.log("writing file to ./data/cleaned_data.json", outputResult);
};

/* extracting feature vectors */
const extractFeatureVectors = async () => {
    console.log("reading processed data...");
    const raw = await readFileAsync(PROCESSED_DATA_FILE_PATH);
    const data = JSON.parse(raw.data);
    console.log("creating vocabulary...");
    let vocabulary = Array.from(new Set(data.flatMap((item) => item.keywords)));
    /* Note: Here we are only taking 5000 features/keywords in considerations */
    vocabulary = vocabulary.slice(0, 5000);

    const vocabularyOutput = await writeFileAsync(
        VOCABULARY_FILE_PATH,
        stringifyLargeTextJson(vocabulary)
    );
    console.log("writing vocabulary to file", vocabularyOutput);

    console.log("removing rating and name from items...");
    const items = data.map((it) => {
        return { id: it.id, keywords: it.keywords };
    });
    console.log("creating feature vectors...");
    const vectors = createFeatureVectors(items, vocabulary);
    console.log("writing model to file...");
    const outputResult = await writeFileAsync(
        FEATURE_VECTOR_FILE_PATH,
        stringifyLargeText(vectors)
    );
    console.log("writing file to ", outputResult);
};

/* perform recommendation */
const recommendNow = async (keywords) => {
    console.log(`reading processed data...`);
    const raw = await readFileAsync(PROCESSED_DATA_FILE_PATH);
    const data = JSON.parse(raw.data);

    const targetItem = data[0];

    console.log(`reading model...`);
    const vectors = await readLargeFileAsync(FEATURE_VECTOR_FILE_PATH);

    console.log(`finding similar items...`);
    const recommendedItems = recommendItems(targetItem, data, vectors, 5);

    const _items = [];

    recommendedItems.forEach((it, index) => {
        const item = data.find((_it) => it == _it.id);
        _items.push(item);
        console.log(index, { name: item.name, rating: item.rating });
    });

    return _items;
};

/* perform recommendation based on keywords */
const recommendBasedOnKeywords = async (
    keywords,
    vocabulary,
    items,
    vectors,
    n = 5
) => {
    console.log(`finding similar items...`);
    const recommendedItems = recommendItemsForKeywords(
        keywords,
        vocabulary,
        items,
        vectors,
        n
    );

    const _items = [];

    recommendedItems.forEach((it) => {
        const item = items.find((_it) => it == _it.id);
        _items.push(item);
    });

    return _items;
};

// dataProcessing(); // reprocess data
extractFeatureVectors(); // training

module.exports = {
    recommendNow,
    recommendBasedOnKeywords,
    VOCABULARY_FILE_PATH,
    FEATURE_VECTOR_FILE_PATH,
    PROCESSED_DATA_FILE_PATH,
};
