import React from 'react';
import { handleSubmit } from '../utils/utils';

const Contact = ({ revealed, addRevealRef }) => {
  const contactInfo = [
    { strong: 'Groupe', span: 'VAN International Group' },
    { strong: 'Email', span: 'contact@van-group.com' },
    { strong: 'Téléphone', span: '+237 6 XX XX XX XX' },
    { strong: 'Adresse', span: 'Yaoundé, Cameroun' },
    { strong: 'Domaines', span: 'Énergie • BTP • Logistique & Transport' }
  ];

  return (
    <section className="section contact" id="contact">
      <div className="container contact-grid">
        <div ref={(el) => addRevealRef(el, 22)} className={`contact-info reveal left ${revealed[22] ? "visible" : ""}`}>
          <h3>Parlons de votre projet</h3>
          {contactInfo.map((info, index) => (
            <div key={info.strong} className="info-block">
              <strong>{info.strong}</strong>
              <span>{info.span}</span>
            </div>
          ))}
        </div>

        <div ref={(el) => addRevealRef(el, 23)} className={`contact-form reveal right ${revealed[23] ? "visible" : ""}`}>
          <h3>Envoyer un message</h3>
          <form onSubmit={handleSubmit}>
            <div className="field-row">
              <input type="text" placeholder="Nom complet" required />
              <input type="email" placeholder="Adresse email" required />
            </div>
            <div className="field-row">
              <input type="text" placeholder="Entreprise" />
              <input type="text" placeholder="Téléphone" />
            </div>
            <input type="text" placeholder="Sujet" required />
            <textarea placeholder="Décrivez votre besoin..."></textarea>
            <button type="submit" className="btn btn-primary">Envoyer la demande</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
