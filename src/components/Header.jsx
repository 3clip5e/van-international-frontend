import React from 'react';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../utils/utils';
import vanLogo from '../assets/van-logo.svg';
import LanguageSelector from './LanguageSelector';

const Header = ({ scrolled, menuOpen, setMenuOpen }) => {
  const { t, ready } = useTranslation();
  
  const navItems = [
    { text: ready ? t('header.nav.about') : 'Le Groupe', id: 'about' },
    { text: ready ? t('header.nav.activities') : 'Nos Activités', id: 'activities' },
    { text: ready ? t('header.nav.projects') : 'Projets', id: 'projects' },
    { text: ready ? t('header.nav.values') : 'Valeurs', id: 'values' },
    { text: ready ? t('header.nav.contact') : 'Contact', id: 'contact' }
  ];

  return (
    <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav">
        <a href="#home" className="brand">
          <img src={vanLogo} alt={ready ? t('header.brand') : 'VAN International'} className="brand-logo" />
          <span>{ready ? t('header.brand') : 'VAN International'}</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a 
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setMenuOpen(false);
              }}
            >
              {item.text}
            </a>
          ))}
          <a 
            className="nav-cta" 
            onClick={() => {
              scrollToSection("contact");
              setMenuOpen(false);
            }}
          >
            {ready ? t('header.nav.quote') : 'Demander un devis'}
          </a>
        </nav>

        <LanguageSelector />

        <button 
          className="menu-btn" 
          onClick={() => setMenuOpen((v) => !v)} 
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
};

export default Header;
