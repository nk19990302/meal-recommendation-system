const findInteractionsOfRecipe = (interactions, recipe_id, index) => {
    return interactions.filter((it) => it.recipe_id == recipe_id);
};

const summarizeInteractions = (interactions) => {
    const result = interactions.reduce(
        (acc, cur) => {
            return {
                rating: Number(acc.rating) + Number(cur.rating),
                review: `${acc.review} ${cur.review}`,
            };
        },
        {
            rating: 0,
            review: "",
        }
    );
    return {
        review: result.review.toLowerCase(),
        rating: result.rating / interactions.length,
    };
};

module.exports = {
    findInteractionsOfRecipe,
    summarizeInteractions,
};
