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
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sIjoiQWRtaW5pc3RyYWRvciIsImlhdCI6MTc3MjM4NjQwMywiZXhwIjoxNzcyMzkwMDAzfQ.4FIwodn0LNciCQk2Qj831-lSHLO6dU0TLTCNZF6Q7SI`

            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Error backend:", result);
            throw new Error(result.error || "Error en la petición");
        }

        return result;
    }
};