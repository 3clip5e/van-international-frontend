import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VanHomepage from './VanHomepage';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import './styles/fonts.css';
import './styles/VanHomepage.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('vanAdminToken');
    setIsAuthenticated(token === 'authenticated');
  }, []);

  return (
    <Router>
      <Routes>
        {/* Route publique - site normal */}
        <Route 
          path="/" 
          element={<VanHomepage />} 
        />
        
        {/* Route de connexion admin */}
        <Route 
          path="/admin-login" 
          element={
            isAuthenticated ? 
            <Navigate to="/admin" replace /> : 
            <AdminLogin />
          } 
        />
        
        {/* Route protégée - panneau d'administration */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? 
            <AdminPanel /> : 
            <Navigate to="/admin-login" replace />
          } 
        />
        
        {/* Redirection par défaut */}
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
