import React, { useState } from 'react';
import apiService from '../services/apiService';

const LoginForm = ({ onLogin, onClose }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Appel à l'API backend pour l'authentification
      const response = await apiService.login(credentials.email, credentials.password);
      
      if (response.success) {
        // Sauvegarder le token et les infos utilisateur
        localStorage.setItem('vanAuthToken', response.data.token);
        localStorage.setItem('vanAdminMode', 'true');
        localStorage.setItem('vanUserInfo', JSON.stringify(response.data.user));
        
        onLogin(true);
      } else {
        setError(response.message || 'Erreur de connexion');
      }
    } catch (err) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-box">V</span>
            <span>VAN Admin</span>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="admin@van.com"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="•••••••••"
              required
              className="form-input"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Identifiants de test :<br />
            Email: <strong>admin@van.com</strong><br />
            Mot de passe: <strong>admin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
