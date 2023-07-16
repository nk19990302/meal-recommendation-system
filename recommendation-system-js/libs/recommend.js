/* all functions to recommend similar items */

const {
    calculateCosineSimilarity,
    createFeatureVectorsForKeyword,
} = require("./vectors");

const recommendItems = (targetItem, items, featureVectors, n) => {
    const targetVector = featureVectors.find(
        (vector) => vector.id === targetItem.id
    ).features;

    const similarities = items.map((item) => {
        const itemVector = featureVectors.find(
            (vector) => vector.id === item.id
        ).features;
        const similarity = calculateCosineSimilarity(targetVector, itemVector);
        return { id: item.id, similarity };
    });

    similarities.sort((a, b) => b.similarity - a.similarity);
    const recommendedItems = similarities
        .slice(1, n + 1)
        .map((similarity) => similarity.id);

    return recommendedItems;
};

const recommendItemsForKeywords = (
    keywords,
    vocabulary,
    items,
    featureVectors,
    n
) => {
    const targetVector = createFeatureVectorsForKeyword(keywords, vocabulary);

    const similarities = items.map((item) => {
        const itemVector = featureVectors.find(
            (vector) => vector.id === item.id
        );
        if (!itemVector) return;
        const similarity = calculateCosineSimilarity(
            targetVector,
            itemVector.features
        );
        return { id: item.id, similarity };
    });

    similarities.sort((a, b) => b.similarity - a.similarity);
    const recommendedItems = similarities
        .slice(1, n + 1)
        .map((similarity) => similarity.id);

    return recommendedItems;
};

module.exports = {
    recommendItems,
    recommendItemsForKeywords,
};
