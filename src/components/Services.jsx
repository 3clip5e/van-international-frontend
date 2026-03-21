import React from 'react';

const Services = ({ revealed, addRevealRef }) => {
  const services = [
    {
      title: "VAN Petroleum",
      className: "petroleum",
      text: "Un pôle orienté distribution et services pétroliers, pensé pour garantir disponibilité, proximité et qualité.",
      items: [
        "Stations-service et distribution",
        "Services associés aux points d'exploitation",
        "Approvisionnement et continuité opérationnelle",
      ],
    },
    {
      title: "VAN BTP",
      className: "btp",
      text: "Des solutions de construction et de travaux pour accompagner les projets publics, privés et industriels.",
      items: [
        "Bâtiments et infrastructures",
        "Travaux techniques et génie civil",
        "Gestion rigoureuse des chantiers",
      ],
    },
    {
      title: "VAN Logistique & Transport",
      className: "logistique",
      text: "Une organisation logistique conçue pour fluidifier les flux internes et externes avec maîtrise et rapidité.",
      items: [
        "Transport de marchandises",
        "Organisation logistique interne et externe",
        "Coordination des flux et livraisons",
      ],
    },
  ];

  return (
    <section className="section business" id="activities">
      <div className="container">
        <div ref={(el) => addRevealRef(el, 4)} className={`reveal ${revealed[4] ? "visible" : ""}`}>
          <h2 className="section-title">Nos activités stratégiques</h2>
          <p className="section-subtitle">Trois branches, une même exigence opérationnelle : fiabilité, performance et impact.</p>
        </div>

        <div className="cards-grid">
          {services.map((service, i) => (
            <article key={service.title} ref={(el) => addRevealRef(el, 5 + i)} className={`service-card reveal ${revealed[5 + i] ? "visible" : ""}`}>
              <div className={`service-top ${service.className}`}>{service.title}</div>
              <div className="service-body">
                <p>{service.text}</p>
                <ul>
                  {service.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a className="card-link" href="#contact">En savoir plus →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
