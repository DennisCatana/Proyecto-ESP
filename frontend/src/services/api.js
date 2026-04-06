// URL del backend - usa proxy de Vite en desarrollo
const API_URL = "http://localhost:3000/api";

// Agregar automáticamente el prefijo /api si no está presente
const getFullUrl = (endpoint) => {
    // Si el endpoint ya empieza con /api, no duplicar
    if (endpoint.startsWith('/api')) {
        return `${API_URL.replace('/api', '')}${endpoint}`;
    }
    return `${API_URL}${endpoint}`;
};

const getToken = () => localStorage.getItem("token");

const handleResponse = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        console.error('Backend error:', data);

        // Si es sesión inválida
        if (response.status === 401) {
            localStorage.clear();
            window.location.href = "/";
        }

        throw new Error(data.msg || data.error || "Error en la petición");
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

        const headers = {
            "Content-Type": "application/json"
        };

        const token = getToken();

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            method: "POST",
            headers,
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
    };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { msg: 'Network error' };
            }
            throw new Error(errorData.msg || `HTTP ${response.status}`);
        }

        // DELETE exitoso
        let data = null;
        try { data = await response.json(); } catch { data = null; }
        return { success: true, status: response.status, data };

    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('Request timeout (10s)');
        }
        
        console.error('API DELETE Error:', error);
        throw error;
    }
},

    // Upload file to server
    upload: async (endpoint, file, fieldName = 'evidencia') => {
        try {
            const token = getToken();

            const formData = new FormData();
            formData.append(fieldName, file);

            const headers = {};

            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: formData
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ msg: 'Network error' }));

                if (response.status === 401) {
                    localStorage.clear();
                    window.location.href = '/';
                    return;
                }

                throw new Error(error.msg || error.error || `Error ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API UPLOAD Error:', error);
            if (error.message === 'Failed to fetch') {
                throw new Error('No se puede conectar al servidor. Verifica que el backend esté corriendo');
            }
            throw error;
        }
    }
};

