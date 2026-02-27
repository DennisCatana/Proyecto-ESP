const API_URL = "http://localhost:3000/api";

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${API_URL}${endpoint}`);
        return response.json();
    },

    post: async (endpoint, data) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
};