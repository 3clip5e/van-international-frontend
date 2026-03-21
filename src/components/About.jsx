import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../utils/utils';
import apiService from '../services/apiService';

const About = ({ revealed, addRevealRef }) => {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutData, setAboutData] = useState({
    title: t('about.title'),
    subtitle: t('about.subtitle'),
    vision: t('about.vision'),
    mission: t('about.mission'),
    engagement: t('about.engagement')
  });

  const bulletPoints = [
    {
      title: 'Vision',
      text: aboutData.vision
    },
    {
      title: 'Mission',
      text: aboutData.mission
    },
    {
      title: 'Engagement',
      text: aboutData.engagement
    }
  ];

  useEffect(() => {
    loadAboutData();
    checkAdminStatus();
  }, []);

  const loadAboutData = async () => {
    try {
      const response = await apiService.get('/about');
      if (response.success && response.data.about) {
        setAboutData(response.data.about);
      }
    } catch (error) {
      console.error('Erreur chargement données About:', error);
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

  const handleSaveAbout = async () => {
    try {
      const response = await apiService.put('/about', aboutData);
      if (response.success) {
        setIsEditing(false);
        console.log('Données About sauvegardées avec succès');
      }
    } catch (error) {
      console.error('Erreur sauvegarde About:', error);
    }
  };

  return (
    <section className={`section about ${isAdmin ? 'admin-mode' : ''}`} id="about">
      <div className="container about-grid">
        <div ref={(el) => addRevealRef(el, 2)} className={`reveal left ${revealed[2] ? "visible" : ""}`}>
          {isAdmin && !isEditing && (
            <button 
              className="edit-btn" 
              onClick={() => setIsEditing(true)}
              title="Modifier la section About"
            >
              ✏️
            </button>
          )}
          
          {isEditing ? (
            <div className="about-editor">
              <input
                type="text"
                value={aboutData.title}
                onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
                placeholder="Titre"
                className="about-input"
              />
              <textarea
                value={aboutData.subtitle}
                onChange={(e) => setAboutData({...aboutData, subtitle: e.target.value})}
                placeholder="Sous-titre"
                className="about-textarea"
                rows={2}
              />
              <input
                type="text"
                value={aboutData.vision}
                onChange={(e) => setAboutData({...aboutData, vision: e.target.value})}
                placeholder="Vision"
                className="about-input"
              />
              <textarea
                value={aboutData.mission}
                onChange={(e) => setAboutData({...aboutData, mission: e.target.value})}
                placeholder="Mission"
                className="about-textarea"
                rows={2}
              />
              <textarea
                value={aboutData.engagement}
                onChange={(e) => setAboutData({...aboutData, engagement: e.target.value})}
                placeholder="Engagement"
                className="about-textarea"
                rows={2}
              />
              <div className="about-editor-actions">
                <button className="btn btn-primary" onClick={handleSaveAbout}>Sauvegarder</button>
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Annuler</button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="section-title">{aboutData.title}</h2>
              <p className="section-subtitle">{aboutData.subtitle}</p>
              <div className="bullet-list">
                {bulletPoints.map((point, index) => (
                  <div key={point.title} className="bullet-item">
                    <span className="bullet-dot"></span>
                    <div>
                      <strong>{point.title}</strong>
                      <p>{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div ref={(el) => addRevealRef(el, 3)} className={`about-card reveal right ${revealed[3] ? "visible" : ""}`}>
          <p>Grâce à la complémentarité de ses activités, VAN apporte une réponse globale aux besoins d\'approvisionnement, d\'exécution de projets et de mobilité logistique.</p>
          <p>Cette synergie permet au groupe d\'intervenir avec cohérence, efficacité et maîtrise, aussi bien sur des besoins ponctuels que sur des opérations de grande ampleur.</p>
          <button className="btn btn-primary" onClick={() => scrollToSection("activities")}>Explorer les filiales</button>
        </div>
      </div>
    </section>
  );
};

export default About;
