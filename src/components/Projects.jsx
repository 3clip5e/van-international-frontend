import React from 'react';

const Projects = ({ revealed, addRevealRef }) => {
  const projects = [
    [
      "Petroleum", 
      "Déploiement d'un point de service", 
      "Mise en place d'une station-service moderne avec standards d'accueil, d'approvisionnement et de sécurité."
    ],
    [
      "BTP", 
      "Construction d'infrastructure", 
      "Réalisation d'un ouvrage avec suivi technique, coordination chantier et respect des contraintes de délai."
    ],
    [
      "Logistique", 
      "Optimisation d'une chaîne logistique", 
      "Structuration des flux de transport et amélioration de la circulation des marchandises entre plusieurs points d'activité."
    ]
  ];

  return (
    <section className="section" id="projects">
      <div className="container">
        <div ref={(el) => addRevealRef(el, 13)} className={`reveal ${revealed[13] ? "visible" : ""}`}>
          <h2 className="section-title">Réalisations et projets</h2>
          <p className="section-subtitle">Mets ici de vrais projets du groupe avec photo, lieu, date et description courte.</p>
        </div>

        <div className="projects-grid">
          {projects.map(([label, title, text], i) => (
            <article key={title} ref={(el) => addRevealRef(el, 14 + i)} className={`project-card reveal ${revealed[14 + i] ? "visible" : ""}`}>
              <div className="project-image">
                <span className="project-label">{label}</span>
              </div>
              <div className="project-body">
                <h3>{title}</h3>
                <p>{text}</p>
                <a className="card-link" href="#contact">Voir le projet →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
