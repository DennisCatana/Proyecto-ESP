// URL del backend - usa proxy de Vite en desarrollo
const API_URL = "/api";

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
        const data = JSON.stringify(body);
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        };

        try {
            const fullUrl = `${API_URL}${endpoint}`;
            console.log('POST Request to:', fullUrl);
            console.log('Request data:', data);

            const response = await fetch(fullUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ msg: 'Network error', status: response.status }));
                console.error('POST Error response:', error);
                throw new Error(error.msg || `Error ${response.status}`);
            }

            const result = await response.json();
            console.log('POST Response:', result);
            return result;
        } catch (error) {
            console.error('API POST Error:', error);
            // Proporcionar mensaje más claro
            if (error.message === 'Failed to fetch') {
                throw new Error('No se puede conectar al servidor. Verifica que el backend esté corriendo y el frontend se esté ejecutando correctamente');
            }
            throw error;
        }
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
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'DELETE',
                headers
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ msg: 'Network error' }));
                throw new Error(error.msg || `Error ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API DELETE Error:', error);
            throw error;
        }
    },

    // Clear cache when needed
    clearCache: () => {
        cache.clear();
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

