import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import apiService from '../services/apiService';

const AdminRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (location.pathname === '/adm') {
      setShowLogin(true);
    } else {
      setShowLogin(false);
    }
  }, [location]);

  const handleCloseLogin = () => {
    setShowLogin(false);
    navigate('/');
  };

  const handleLogin = (authenticated) => {
    if (authenticated) {
      localStorage.setItem('vanAdminMode', 'true');
      setShowLogin(false);
      navigate('/');
      window.location.reload(); // Recharger pour mettre à jour l'état admin
    } else {
      setShowLogin(false);
    }
  };

  if (!showLogin) return null;

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-modal">
        <button className="close-login-btn" onClick={handleCloseLogin}>
          ✕
        </button>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default AdminRoute;
