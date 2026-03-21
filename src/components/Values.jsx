import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const Values = ({ revealed, addRevealRef }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState([]);
  const [newValue, setNewValue] = useState({
    title: '',
    description: '',
    icon: '',
    order: 0
  });

  useEffect(() => {
    loadValues();
    checkAdminStatus();
  }, []);

  const loadValues = async () => {
    try {
      const response = await apiService.get('/values');
      
      if (response.success && response.data.values) {
        setValues(response.data.values);
      } else {
        setValues([
          { id: 1, title: "Intégrité", description: "Nos engagements sont tenus avec honnêteté et transparence dans toutes nos relations.", icon: "01", order: 1 },
          { id: 2, title: "Excellence", description: "Nous visons les plus hauts standards de qualité dans la réalisation de nos projets.", icon: "02", order: 2 },
          { id: 3, title: "Innovation", description: "Nous intégrons les meilleures technologies et pratiques pour anticiper les besoins.", icon: "03", order: 3 },
          { id: 4, title: "Responsabilité", description: "Nous agissons de manière durable envers nos collaborateurs, nos clients et l'environnement.", icon: "04", order: 4 }
        ]);
      }
    } catch (error) {
      console.error('Erreur chargement values:', error);
      setValues([
        { id: 1, title: "Intégrité", description: "Nos engagements sont tenus avec honnêteté et transparence dans toutes nos relations.", icon: "01", order: 1 },
        { id: 2, title: "Excellence", description: "Nous visons les plus hauts standards de qualité dans la réalisation de nos projets.", icon: "02", order: 2 },
        { id: 3, title: "Innovation", description: "Nous intégrons les meilleures technologies et pratiques pour anticiper les besoins.", icon: "03", order: 3 },
        { id: 4, title: "Responsabilité", description: "Nous agissons de manière durable envers nos collaborateurs, nos clients et l'environnement.", icon: "04", order: 4 }
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

  const handleCreateValue = async () => {
    try {
      const response = await apiService.post('/values', newValue);
      if (response.success) {
        loadValues(); // Recharger la liste
        setNewValue({ title: '', description: '', icon: '', order: 0 });
        console.log('Value créée avec succès');
      }
    } catch (error) {
      console.error('Erreur création value:', error);
    }
  };

  const handleUpdateValue = async (id, updatedValue) => {
    try {
      const response = await apiService.put(`/values/${id}`, updatedValue);
      if (response.success) {
        loadValues(); // Recharger la liste
        console.log('Value mise à jour avec succès');
      }
    } catch (error) {
      console.error('Erreur mise à jour value:', error);
    }
  };

  const handleDeleteValue = async (id) => {
    try {
      const response = await apiService.delete(`/values/${id}`);
      if (response.success) {
        loadValues(); // Recharger la liste
        console.log('Value supprimée avec succès');
      }
    } catch (error) {
      console.error('Erreur suppression value:', error);
    }
  };

  return (
    <section className={`section values ${isAdmin ? 'admin-mode' : ''}`} id="values">
      <div className="container">
        <div className="section-header">
          <div ref={(el) => addRevealRef(el, 17)} className={`reveal ${revealed[17] ? "visible" : ""}`}>
            <h2 className="section-title">Nos Valeurs</h2>
            <p className="section-subtitle">Une culture d'entreprise fondée sur l'exigence, la responsabilité et la constance.</p>
            {isAdmin && !isEditing && (
              <button 
                className="edit-btn" 
                onClick={() => setIsEditing(true)}
                title="Gérer les valeurs"
              >
                ✏️
              </button>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="values-editor">
            <h3>Édition des valeurs</h3>
            
            {/* Formulaire d'ajout */}
            <div className="value-form">
              <h4>💎 Ajouter une valeur</h4>
              
              <div className="form-field-group">
                <label className="form-field-label">Titre de la valeur</label>
                <input
                  type="text"
                  value={newValue.title}
                  onChange={(e) => setNewValue({...newValue, title: e.target.value})}
                  placeholder="Ex: Intégrité"
                  className="hero-input"
                />
              </div>
              
              <div className="form-field-group">
                <label className="form-field-label">Numéro (01-99)</label>
                <input
                  type="text"
                  value={newValue.icon}
                  onChange={(e) => setNewValue({...newValue, icon: e.target.value})}
                  placeholder="Ex: 01"
                  className="hero-input"
                  maxLength="2"
                />
              </div>
              
              <div className="form-field-group">
                <label className="form-field-label">Description</label>
                <textarea
                  value={newValue.description}
                  onChange={(e) => setNewValue({...newValue, description: e.target.value})}
                  placeholder="Décrivez cette valeur..."
                  className="hero-input hero-textarea"
                  rows={3}
                />
              </div>
              
              <div className="hero-editor-actions">
                <button className="btn btn-primary" onClick={handleCreateValue}>
                  ➕ Ajouter
                </button>
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  ✅ Terminer
                </button>
              </div>
            </div>

            {/* Liste des valeurs existantes */}
            <div className="values-list">
              <h4>Valeurs existantes</h4>
              {values.map((value) => (
                <div key={value.id} className="value-item">
                  <div className="value-info">
                    <input
                      type="text"
                      value={value.title}
                      onChange={(e) => {
                        const updated = {...value, title: e.target.value};
                        handleUpdateValue(value.id, updated);
                      }}
                      className="value-input"
                    />
                    <input
                      type="text"
                      value={value.icon}
                      onChange={(e) => {
                        const updated = {...value, icon: e.target.value};
                        handleUpdateValue(value.id, updated);
                      }}
                      className="value-input"
                      placeholder="Icône"
                    />
                    <textarea
                      value={value.description}
                      onChange={(e) => {
                        const updated = {...value, description: e.target.value};
                        handleUpdateValue(value.id, updated);
                      }}
                      className="value-textarea"
                      rows={2}
                    />
                  </div>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeleteValue(value.id)}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="values-grid">
            {values.map((value, index) => (
              <div 
                key={value.id} 
                ref={(el) => addRevealRef(el, 18 + index)} 
                className={`value-card reveal visible`}
                style={{opacity: 1, transform: 'none'}}
              >
                {value.icon && <div className="value-icon">{value.icon}</div>}
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Values;
