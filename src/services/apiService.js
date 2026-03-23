// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api' 
  : 'https://van-international-backend.onrender.com/api';

// API Service
const apiService = {
  // Configuration des headers
  getHeaders: (includeAuth = true) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (includeAuth) {
      const token = localStorage.getItem('vanAuthToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    return headers;
  },

  // Requête générique
  request: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: apiService.getHeaders(options.includeAuth !== false),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Méthodes HTTP
  get: (endpoint, options = {}) => {
    return apiService.request(endpoint, { method: 'GET', ...options });
  },

  post: (endpoint, data, options = {}) => {
    return apiService.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  },

  put: (endpoint, data, options = {}) => {
    return apiService.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  },

  delete: (endpoint, options = {}) => {
    return apiService.request(endpoint, { method: 'DELETE', ...options });
  },

  // Authentification
  login: async (email, password) => {
    return apiService.post('/auth/login', { email, password }, { includeAuth: false });
  },

  getProfile: async () => {
    return apiService.get('/auth/profile');
  },

  // Vérifier si le token est valide
  verifyToken: async () => {
    try {
      const response = await apiService.get('/auth/profile');
      return response.success;
    } catch (error) {
      return false;
    }
  },
};

export default apiService;
