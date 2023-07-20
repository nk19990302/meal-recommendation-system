/* all functions to deal with processing of data */
const natural = require("natural");
const stemmer = natural.PorterStemmer;

const stringifiedArrayToArray = (str) => {
    return str.replaceAll(/[\[\]"']/g, "").split(", ");
};

const stringifyLargeText = (stringArray) => {
    return stringArray.reduce((acc, cur, index) => {
        console.log(`${index} - stratifying ...`);
        return acc + JSON.stringify(cur) + "\n";
    }, "");
};

const stringifyLargeTextJson = (stringArray) => {
    let out = "[";
    for (let indx = 0; indx < stringArray.length - 1; indx++) {
        out += JSON.stringify(stringArray[indx], null, 4) + ",";
    }
    out += JSON.stringify(stringArray[stringArray.length - 1], null, 4) + "]";
    return out;
};

const extractKeywords = (sentences) => {
    // Step 1: Tokenization
    const words = sentences.split(" ");

    // Step 2: Preprocessing
    const cleanedWords = words.map((word) => word.replace(/[^a-zA-Z0-9]/g, ""));

    // Step 3: Case normalization
    const lowercasedWords = cleanedWords.map((word) => word.toLowerCase());

    // Step 4: Remove stop words (optional)
    const filteredWords = lowercasedWords.filter(
        (word) => !stopWords.includes(word)
    );

    // Step 5: Deduplication
    const uniqueWords = [...new Set(filteredWords)];

    // Step 6: Stemming
    const stemmed = uniqueWords.map((word) => stemmer.stem(word));

    // Step 7: Keywords extraction
    const keywords = stemmed;

    return keywords;
};

const stopWords = [
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "has",
    "he",
    "in",
    "into",
    "is",
    "it",
    "its",
    "of",
    "on",
    "that",
    "the",
    "to",
    "was",
    "were",
    "will",
    "with",
    "but",
    "until",
];

module.exports = {
    stringifiedArrayToArray,
    stringifyLargeText,
    stringifyLargeTextJson,
    extractKeywords,
};
