import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../utils/utils';

const Hero = ({ revealed, heroContentRef, heroPanelRef, addRevealRef, isAdmin, onEditHero }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [heroData, setHeroData] = useState({
    eyebrow: '',
    title: 'VAN construit, alimente et connecte l\'avenir.',
    description: 'VAN International Group réunit des expertises complémentaires à travers VAN Petroleum, VAN BTP et VAN Logistique & Transport pour offrir des solutions fiables, structurées et adaptées aux besoins des entreprises, des institutions et des territoires.',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-aerial-view-of-a-highway-1560088827401?download=1080p',
    posterUrl: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1600&auto=format&fit=crop'
  });

  const stats = [
    { strong: '3 pôles', span: 'des métiers complémentaires' },
    { strong: '+100%', span: 'engagement qualité & sécurité' },
    { strong: '24/7', span: 'réactivité opérationnelle' }
  ];

  const activities = [
    { 
      title: 'VAN Petroleum', 
      text: 'Stations-service, distribution de produits pétroliers et services associés.',
      className: 'red'
    },
    { 
      title: 'VAN BTP', 
      text: 'Construction, génie civil, travaux et réalisation d\'infrastructures durables.',
      className: 'gold'
    },
    { 
      title: 'VAN Logistique & Transport', 
      text: 'Solutions de transport et logistique interne/externe pour chaînes d\'approvisionnement performantes.',
      className: 'blue'
    }
  ];

  const handleSave = () => {
    onEditHero(heroData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <section className="hero" id="home" style={{ 
      backgroundImage: isEditing ? `url(${heroData.posterUrl})` : undefined 
    }}>
      {!isEditing && (
        <>
          <div className="hero-video-wrap">
            <video
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
                <input
                  type="text"
                  value={heroData.title}
                  onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                  placeholder="Titre principal"
                  className="hero-input hero-title-input"
                />
                <textarea
                  value={heroData.description}
                  onChange={(e) => setHeroData({...heroData, description: e.target.value})}
                  placeholder="Description"
                  className="hero-textarea"
                  rows={3}
                />
              <input
                type="url"
                value={heroData.videoUrl}
                onChange={(e) => setHeroData({...heroData, videoUrl: e.target.value})}
                placeholder="URL de la vidéo"
                className="hero-input"
              />
              <input
                type="url"
                value={heroData.posterUrl}
                onChange={(e) => setHeroData({...heroData, posterUrl: e.target.value})}
                placeholder="URL de l'image de fond"
                className="hero-input"
              />
              <div className="hero-editor-actions">
                <button className="btn btn-primary" onClick={handleSave}>Sauvegarder</button>
                <button className="btn btn-secondary" onClick={handleCancel}>Annuler</button>
              </div>
            </div>
          ) : (
            <>
              {/* <span className="eyebrow">{heroData.eyebrow}</span> */}
              <h1>{heroData.title}</h1>
              <p>{heroData.description}</p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => scrollToSection("activities")}>Découvrir nos activités</button>
                <button className="btn btn-secondary" onClick={() => scrollToSection("contact")}>Nous contacter</button>
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

      {!isEditing && (
        <div className="scroll-indicator" onClick={() => scrollToSection("about")}>
          <span className="mouse"></span>
          <span>Scroll</span>
        </div>
      )}
    </section>
  );
};

export default Hero;
