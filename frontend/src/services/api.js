const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {

        // Si es sesión inválida
        if (response.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
        }

        throw new Error(data.msg || "Error en la petición");
    }

    return data;
};

export const api = {

    get: async (endpoint) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        });

        return handleResponse(response);
    },

    post: async (endpoint, body) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify(body)
        });

        return handleResponse(response);
    },

    put: async (endpoint, body) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body: JSON.stringify(body)
        });

        return handleResponse(response);
    },

    delete: async (endpoint) => {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        });

        return handleResponse(response);
    }
};