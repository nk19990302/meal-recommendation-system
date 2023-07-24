export const getRecommendations = async (keywords = "", count) => {
    const response = await fetch(
        "http://localhost:8080/recommendations?keywords=" +
            keywords +
            "&length=" +
            count
    );
    const data = response.json();
    return data;
};
