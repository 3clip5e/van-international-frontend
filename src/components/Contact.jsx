import React, { useState, useEffect } from 'react';
import { handleSubmit } from '../utils/utils';
import apiService from '../services/apiService';

const Contact = ({ revealed, addRevealRef }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contactTitle, setContactTitle] = useState('Parlons de votre projet');
  const [contactInfo, setContactInfo] = useState([
    { strong: 'Groupe', span: 'VAN International Group' },
    { strong: 'Email', span: 'contact@van-group.com' },
    { strong: 'Téléphone', span: '+237 6 XX XX XX XX' },
    { strong: 'Adresse', span: 'Yaoundé, Cameroun' },
    { strong: 'Domaines', span: 'Énergie • BTP • Logistique & Transport' }
  ]);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const token = localStorage.getItem('vanAuthToken');
    const adminMode = localStorage.getItem('vanAdminMode') === 'true';
    
    if (token && adminMode) {
      try {
        const response = await apiService.get('/auth/profile');
        setIsAdmin(response.success);
      } catch (error) {
        console.error('Erreur vérification token:', error);
        setIsAdmin(false);
        localStorage.removeItem('vanAuthToken');
        localStorage.removeItem('vanAdminMode');
      }
    } else {
      setIsAdmin(false);
    }
  };

  const handleSaveContact = () => {
    // Pour l'instant, on sauvegarde en localStorage
    // Plus tard, on pourra ajouter une API pour sauvegarder les infos de contact
    localStorage.setItem('vanContactData', JSON.stringify({
      title: contactTitle,
      info: contactInfo
    }));
    setIsEditing(false);
    console.log('Données de contact sauvegardées');
  };

  const handleInfoChange = (index, field, value) => {
    const updatedInfo = [...contactInfo];
    updatedInfo[index][field] = value;
    setContactInfo(updatedInfo);
  };

  return (
    <section className={`section contact ${isAdmin ? 'admin-mode' : ''}`} id="contact">
      <div className="container contact-grid">
        <div ref={(el) => addRevealRef(el, 22)} className={`contact-info reveal left ${revealed[22] ? "visible" : ""}`}>
          {isAdmin && !isEditing && (
            <button 
              className="edit-btn" 
              onClick={() => setIsEditing(true)}
              title="Modifier les informations de contact"
            >
              ✏️
            </button>
          )}
          
          {isEditing ? (
            <div className="contact-editor">
              <input
                type="text"
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                placeholder="Titre de la section"
                className="contact-input"
              />
              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <div key={index} className="contact-info-item">
                    <input
                      type="text"
                      value={info.strong}
                      onChange={(e) => handleInfoChange(index, 'strong', e.target.value)}
                      placeholder="Libellé"
                      className="contact-input-small"
                    />
                    <input
                      type="text"
                      value={info.span}
                      onChange={(e) => handleInfoChange(index, 'span', e.target.value)}
                      placeholder="Valeur"
                      className="contact-input-small"
                    />
                  </div>
                ))}
              </div>
              <div className="contact-editor-actions">
                <button className="btn btn-primary" onClick={handleSaveContact}>Sauvegarder</button>
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Annuler</button>
              </div>
            </div>
          ) : (
            <>
              <h3>{contactTitle}</h3>
              {contactInfo.map((info, index) => (
                <div key={info.strong} className="info-block">
                  <strong>{info.strong}</strong>
                  <span>{info.span}</span>
                </div>
              ))}
            </>
          )}
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
