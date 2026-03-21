import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const Metrics = ({ revealed, addRevealRef, counts, addCounterRef }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [newMetric, setNewMetric] = useState({
    title: '',
    value: '',
    description: '',
    order: 0
  });

  useEffect(() => {
    loadMetrics();
    checkAdminStatus();
  }, []);

  const loadMetrics = async () => {
    try {
      const response = await apiService.get('/metrics');
      if (response.success && response.data.metrics) {
        setMetrics(response.data.metrics);
      }
    } catch (error) {
      console.error('Erreur chargement metrics:', error);
      // Utiliser les données par défaut en cas d'erreur
      setMetrics([
        { id: 1, title: "Années d'expérience", value: "15+", description: "Dans le secteur énergétique et BTP", order: 1 },
        { id: 2, title: "Projets réalisés", value: "500+", description: "À travers nos trois pôles d'activité", order: 2 },
        { id: 3, title: "Collaborateurs", value: "300+", description: "Professionnels qualifiés et engagés", order: 3 },
        { id: 4, title: "Pays d'intervention", value: "5+", description: "En Afrique Centrale et de l'Ouest", order: 4 }
      ]);
    }
  };

  const checkAdminStatus = async () => {
    const token = localStorage.getItem('vanAuthToken');
    const adminMode = localStorage.getItem('vanAdminMode') === 'true';
    
    if (token && adminMode) {
      try {
        // Vérifier si le token est valide avec le backend
        const response = await apiService.get('/auth/profile');
        setIsAdmin(response.success);
      } catch (error) {
        console.error('Erreur vérification token:', error);
        // Token invalide, nettoyer le localStorage
        setIsAdmin(false);
        localStorage.removeItem('vanAuthToken');
        localStorage.removeItem('vanAdminMode');
      }
    } else {
      setIsAdmin(false);
    }
  };

  const handleCreateMetric = async () => {
    try {
      const response = await apiService.post('/metrics', newMetric);
      if (response.success) {
        loadMetrics(); // Recharger la liste
        setNewMetric({ title: '', value: '', description: '', order: 0 });
        console.log('Metric créée avec succès');
      }
    } catch (error) {
      console.error('Erreur création metric:', error);
    }
  };

  const handleUpdateMetric = async (id, updatedMetric) => {
    try {
      const response = await apiService.put(`/metrics/${id}`, updatedMetric);
      if (response.success) {
        loadMetrics(); // Recharger la liste
        console.log('Metric mise à jour avec succès');
      }
    } catch (error) {
      console.error('Erreur mise à jour metric:', error);
    }
  };

  const handleDeleteMetric = async (id) => {
    try {
      const response = await apiService.delete(`/metrics/${id}`);
      if (response.success) {
        loadMetrics(); // Recharger la liste
        console.log('Metric supprimée avec succès');
      }
    } catch (error) {
      console.error('Erreur suppression metric:', error);
    }
  };

  return (
    <section className={`section metrics ${isAdmin ? 'admin-mode' : ''}`} id="metrics">
      <div className="container">
        <div className="section-header">
          <div ref={(el) => addRevealRef(el, 8)} className={`reveal ${revealed[8] ? "visible" : ""}`}>
            <h2 className="section-title">Nos Chiffres Clés</h2>
            <p className="section-subtitle">Remplace ces données par les chiffres réels du groupe pour renforcer la crédibilité du site.</p>
            {isAdmin && !isEditing && (
              <button 
                className="edit-btn" 
                onClick={() => setIsEditing(true)}
                title="Gérer les métriques"
              >
                ✏️
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="metrics-editor">
            <h3>Édition des métriques</h3>
            
            {/* Formulaire d'ajout */}
            <div className="metric-form">
              <h4>📊 Ajouter une métrique</h4>
              
              <div className="form-field-group">
                <label className="form-field-label">Titre de la métrique</label>
                <input
                  type="text"
                  value={newMetric.title}
                  onChange={(e) => setNewMetric({...newMetric, title: e.target.value})}
                  placeholder="Ex: Années d'expérience"
                  className="hero-input"
                />
              </div>
              
              <div className="form-field-group">
                <label className="form-field-label">Valeur</label>
                <input
                  type="text"
                  value={newMetric.value}
                  onChange={(e) => setNewMetric({...newMetric, value: e.target.value})}
                  placeholder="Ex: 15+"
                  className="hero-input"
                />
              </div>
              
              <div className="form-field-group">
                <label className="form-field-label">Description</label>
                <textarea
                  value={newMetric.description}
                  onChange={(e) => setNewMetric({...newMetric, description: e.target.value})}
                  placeholder="Décrivez cette métrique..."
                  className="hero-input hero-textarea"
                  rows={3}
                />
              </div>
              
              <div className="hero-editor-actions">
                <button className="btn btn-primary" onClick={handleCreateMetric}>
                  ➕ Ajouter
                </button>
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  ✅ Terminer
                </button>
              </div>
            </div>

            {/* Liste des métriques existantes */}
            <div className="metrics-list">
              <h4>Métriques existantes</h4>
              {metrics.map((metric) => (
                <div key={metric.id} className="metric-item">
                  <div className="metric-info">
                    <input
                      type="text"
                      value={metric.title}
                      onChange={(e) => {
                        const updated = {...metric, title: e.target.value};
                        handleUpdateMetric(metric.id, updated);
                      }}
                      className="metric-input"
                    />
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => {
                        const updated = {...metric, value: e.target.value};
                        handleUpdateMetric(metric.id, updated);
                      }}
                      className="metric-input"
                    />
                    <textarea
                      value={metric.description}
                      onChange={(e) => {
                        const updated = {...metric, description: e.target.value};
                        handleUpdateMetric(metric.id, updated);
                      }}
                      className="metric-textarea"
                      rows={1}
                    />
                  </div>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteMetric(metric.id)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div 
                key={metric.id} 
                ref={(el) => addRevealRef(el, 9 + index)} 
                className={`metric-box reveal visible`}
                style={{opacity: 1, transform: 'none'}}
              >
                <div className="metric-value">{metric.value}</div>
                <div className="metric-title">{metric.title}</div>
                {metric.description && (
                  <div className="metric-description">{metric.description}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Metrics;
