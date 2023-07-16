/* all functions to deal with vectors */
const createFeatureVectors = (items, vocabulary) => {
    return items.map((item, index) => {
        console.log(`${index} - creating feature vectors...`);
        const featureVector = new Array(vocabulary.length).fill(0);

        item.keywords.forEach((keyword) => {
            const index = vocabulary.indexOf(keyword);
            if (index !== -1) {
                featureVector[index] += 1; // Increment based on term frequency or presence
            }
        });

        return { id: item.id, features: featureVector };
    });
};

const createFeatureVectorsForKeyword = (keywords, vocabulary) => {
    console.log(`creating feature vectors...`);
    const featureVector = new Array(vocabulary.length).fill(0);

    keywords.forEach((keyword) => {
        const index = vocabulary.indexOf(keyword);
        if (index !== -1) {
            featureVector[index] += 1; // Increment based on term frequency or presence
        }
    });

    return featureVector;
};

const calculateCosineSimilarity = (vector1, vector2) => {
    if (vector1.length !== vector2.length) {
        throw new Error("Vector dimensions must match");
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < vector1.length; i++) {
        dotProduct += vector1[i] * vector2[i];
        norm1 += vector1[i] * vector1[i];
        norm2 += vector2[i] * vector2[i];
    }

    const similarity = dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    return similarity;
};

module.exports = {
    createFeatureVectors,
    calculateCosineSimilarity,
    createFeatureVectorsForKeyword,
};
