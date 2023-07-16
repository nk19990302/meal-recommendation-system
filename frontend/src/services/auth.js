const BASE_URL_BACKEND = process.env.REACT_APP_BACKEND_BASE_URL;
export const login = async (email, password) => {
    const response = await fetch(BASE_URL_BACKEND + "/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = response.json();
    return data;
};

export const signup = async (name, email, password) => {
    const response = await fetch(BASE_URL_BACKEND + "/user/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = response.json();
    return data;
};
