const API_URL = "http://localhost:3000/api";

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get auth token from localStorage
const getToken = () => localStorage.getItem('token');

// API service with improved error handling, caching, and auth support
export const api = {
    get: async (endpoint, useCache = false) => {
        // Check cache first
        if (useCache) {
            const cached = cache.get(endpoint);
            if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
                return cached.data;
            }
        }

        try {
            const token = getToken();
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'GET',
                headers
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ msg: 'Network error' }));
                throw new Error(error.msg || `Error ${response.status}`);
            }

            const data = await response.json();

            // Cache successful GET requests
            if (useCache && response.ok) {
                cache.set(endpoint, { data, timestamp: Date.now() });
            }

            return data;
        } catch (error) {
            console.error('API GET Error:', error);
            throw error;
        }
    },

    post: async (endpoint, data) => {
        try {
            const token = getToken();
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ msg: 'Network error' }));
                throw new Error(error.msg || `Error ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    },

    put: async (endpoint, data) => {
        try {
            const token = getToken();
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ msg: 'Network error' }));
                throw new Error(error.msg || `Error ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API PUT Error:', error);
            throw error;
        }
    },

    delete: async (endpoint) => {
        try {
            const token = getToken();
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

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
    }
};
