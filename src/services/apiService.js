// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' 
    : 'https://van-international-backend.onrender.com/api');

// Fallback temporaire pour les données statiques si le backend est down
const FALLBACK_DATA = {
  hero: {
    id: 1,
    eyebrow: '',
    title: 'VAN construit, alimente et connecte l\'avenir.',
    description: 'VAN International Group réunit des expertises complémentaires à travers VAN Petroleum, VAN BTP et VAN Logistique & Transport pour offrir des solutions fiables, structurées et adaptées aux besoins des entreprises, des institutions et des territoires.'
  },
  about: {
    title: 'Un groupe multisectoriel au service de l\'Afrique',
    description: 'Fondé en 2008, VAN International Group s\'est imposé comme un acteur majeur dans les secteurs de l\'énergie, de la construction et de la logistique en Afrique Centrale.'
  }
};

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

  // Requête générique avec fallback
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
      
      // Fallback vers les données statiques si le backend est inaccessible
      if (endpoint === '/hero' && error.message.includes('fetch')) {
        console.log('Backend inaccessible - utilisation des données fallback');
        return { success: true, data: FALLBACK_DATA.hero };
      }
      if (endpoint === '/about' && error.message.includes('fetch')) {
        console.log('Backend inaccessible - utilisation des données fallback');
        return { success: true, data: FALLBACK_DATA.about };
      }
      
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
