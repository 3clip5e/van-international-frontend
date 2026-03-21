import React from 'react';
import { scrollToSection } from '../utils/utils';

const About = ({ revealed, addRevealRef }) => {
  const bulletPoints = [
    {
      title: 'Vision',
      text: 'Être un acteur de référence dans l\'énergie, la construction et la logistique.'
    },
    {
      title: 'Mission',
      text: 'Fournir des solutions concrètes, fiables et durables qui soutiennent le développement économique.'
    },
    {
      title: 'Engagement',
      text: 'Mettre la sécurité, la qualité de service et la satisfaction client au centre de chaque opération.'
    }
  ];

  return (
    <section className="section about" id="about">
      <div className="container about-grid">
        <div ref={(el) => addRevealRef(el, 2)} className={`reveal left ${revealed[2] ? "visible" : ""}`}>
          <h2 className="section-title">Le Groupe VAN</h2>
          <p className="section-subtitle">VAN International est un groupe structuré autour d\'une vision claire : développer des services essentiels avec exigence, performance et responsabilité.</p>
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
