export const getRecommendations = async (keywords = []) => {
    const response = await fetch(
        "http://localhost:8080/recommendations?keywords=" +
            keywords.join(",").toLowerCase()
    );
    const data = response.json();
    return data;
};
