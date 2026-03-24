import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../utils/utils';
import apiService from '../services/apiService';

const Hero = ({ revealed, heroContentRef, heroPanelRef, addRevealRef }) => {
  const { t } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [heroData, setHeroData] = useState({
    eyebrow: '',
    title: t('hero.title'),
    description: t('hero.description'),
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-in-a-city-1078-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1600&auto=format&fit=crop'
  });

  const stats = [
    { strong: t('hero.stats.poles'), span: t('hero.stats.polesDesc') },
    { strong: t('hero.stats.quality'), span: t('hero.stats.qualityDesc') },
    { strong: t('hero.stats.reactivity'), span: t('hero.stats.reactivityDesc') }
  ];

  const activities = [
    { 
      title: t('hero.activities.petroleum.title'), 
      text: t('hero.activities.petroleum.text'),
      className: 'red'
    },
    { 
      title: t('hero.activities.btp.title'), 
      text: t('hero.activities.btp.text'),
      className: 'blue'
    },
    { 
      title: t('hero.activities.logistics.title'), 
      text: t('hero.activities.logistics.text'),
      className: 'gold'
    }
  ];

  useEffect(() => {
    // Vérifier l'authentification au chargement
    checkAuthStatus();
    
    // Charger les données du Hero depuis le backend
    loadHeroData();
  }, []);

  const loadHeroData = async () => {
    try {
      const response = await apiService.get('/hero');
      console.log('Réponse API Hero:', response); // Debug
      if (response.success && response.data && response.data.hero) {
        setHeroData(response.data.hero);
      } else if (response.success && response.data) {
        // Alternative: si les données sont directement dans response.data
        setHeroData(response.data);
      }
    } catch (error) {
      console.error('Erreur chargement données Hero:', error);
      // En cas d'erreur, utiliser les données par défaut
      const defaultData = {
        eyebrow: '',
        title: t('hero.title'),
        description: t('hero.description'),
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-in-a-city-1078-large.mp4',
        posterUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1600&auto=format&fit=crop'
      };
      setHeroData(defaultData);
    }
  };

  const checkAuthStatus = async () => {
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
        handleLogout();
      }
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('vanAuthToken');
    localStorage.removeItem('vanAdminMode');
  };

  const handleSaveHero = async () => {
    try {
      const response = await apiService.put('/hero', heroData);
      if (response.success) {
        // Sauvegarder aussi en localStorage comme backup
        localStorage.setItem('vanHeroData', JSON.stringify(heroData));
        setIsEditing(false);
        console.log('Données Hero sauvegardées avec succès');
      }
    } catch (error) {
      console.error('Erreur sauvegarde Hero:', error);
      // En cas d'erreur, sauvegarder en localStorage
      localStorage.setItem('vanHeroData', JSON.stringify(heroData));
      setIsEditing(false);
    }
  };

  const handleDevisClick = () => {
    scrollToSection("contact");
  };

  return (
    <>
      <section className={`hero ${isAdmin ? 'admin-mode' : ''}`} id="home">
        {!isEditing && (
          <>
            <div className="hero-video-wrap">
              <video
                crossOrigin="anonymous"
                className="hero-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={heroData.posterUrl}
              >
                <source src={heroData.videoUrl} type="video/mp4" />
              </video>
            </div>
            <div className="hero-overlay" />
          </>
        )}

        <div className="container hero-grid">
          <div ref={heroContentRef} className={`hero-content reveal left ${revealed['hero-content'] ? "visible" : ""}`}>
            {isAdmin && !isEditing && (
              <button 
                className="edit-btn" 
                onClick={() => setIsEditing(true)}
                title="Modifier le Hero"
              >
                ✏️
              </button>
            )}
            
            {isEditing ? (
              <div className="hero-editor">
                <div className="form-field-group">
                  <label className="form-field-label">Titre principal</label>
                  <input
                    type="text"
                    value={heroData.title}
                    onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                    placeholder="VAN construit, alimente et connecte l'avenir."
                    className="hero-input hero-title-input"
                  />
                </div>
                
                <div className="form-field-group">
                  <label className="form-field-label">Description</label>
                  <textarea
                    value={heroData.description}
                    onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                    placeholder="Décrivez votre entreprise et sa mission..."
                    className="hero-input hero-textarea"
                    rows={4}
                  />
                </div>
                
                <div className="form-field-group">
                  <label className="form-field-label">URL de la vidéo</label>
                  <input
                    type="url"
                    value={heroData.videoUrl}
                    onChange={(e) => setHeroData({...heroData, videoUrl: e.target.value})}
                    placeholder="https://example.com/video.mp4"
                    className="hero-input"
                  />
                </div>
                
                <div className="form-field-group">
                  <label className="form-field-label">URL de l'image de fond</label>
                  <input
                    type="url"
                    value={heroData.posterUrl}
                    onChange={(e) => setHeroData({...heroData, posterUrl: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    className="hero-input"
                  />
                </div>
                
                <div className="hero-editor-actions">
                  <button className="btn btn-primary" onClick={handleSaveHero}>
                    💾 Sauvegarder
                  </button>
                  <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                    ❌ Annuler
                  </button>
                </div>
              </div>
            ) : (
              <>
                {heroData.eyebrow && <span className="eyebrow">{heroData.eyebrow}</span>}
                <h1>{heroData.title}</h1>
                <p>{heroData.description}</p>
                <div className="hero-actions">
                  <button className="btn btn-primary" onClick={() => scrollToSection("activities")}>Découvrir nos activités</button>
                  <button className="btn btn-secondary" onClick={handleDevisClick}>Demander un devis</button>
                </div>
                <div className="hero-stats">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-pill">
                      <strong>{stat.strong}</strong>
                      <span>{stat.span}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div ref={heroPanelRef} className={`hero-panel reveal right ${revealed['hero-panel'] ? "visible" : ""}`}>
            <h2 className="panel-title">Nos expertises clés</h2>
            <div className="activity-list">
              {activities.map((activity, index) => (
                <div key={activity.title} className={`activity-card ${activity.className}`}>
                  <h3>{activity.title}</h3>
                  <p>{activity.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="admin-indicator">
            Mode Administration
            <button className="logout-btn" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        )}

        {!isEditing && (
          <div className="scroll-indicator" onClick={() => scrollToSection("about")}>
            <span className="mouse"></span>
            <span>Scroll</span>
          </div>
        )}
      </section>
    </>
  );
};

export default Hero;
