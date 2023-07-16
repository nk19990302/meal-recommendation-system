const BASE_URL_BACKEND = process.env.REACT_APP_BACKEND_BASE_URL;

export const getProfile = async (userId) => {
    const response = await fetch(BASE_URL_BACKEND + "/user-profile/" + userId);
    const data = response.json();
    return data;
};

export const addProfile = async (userId, preferences) => {
    const response = await fetch(BASE_URL_BACKEND + "/user-profile", {
        method: "POST",
        body: JSON.stringify({ userId, preferences }),
        headers: {
          "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data;
};

export const updateProfile = async (id, preferences) => {
    const response = await fetch(BASE_URL_BACKEND + "/user-profile", {
        method: "PUT",
        body: JSON.stringify({ id, preferences }),
        headers: {
          "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data;
};
