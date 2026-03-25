import React from 'react';
import { useTranslation } from 'react-i18next';
import { scrollToSection } from '../utils/utils';
import vanLogo from '../assets/van-logo.svg';
import LanguageSelector from './LanguageSelector';

const Header = ({ scrolled, menuOpen, setMenuOpen }) => {
  const { t } = useTranslation();
  
  const navItems = [
    { text: t('about'), id: 'about' },
    { text: t('activities'), id: 'activities' },
    { text: t('projects'), id: 'projects' },
    { text: t('values'), id: 'values' },
    { text: t('contact'), id: 'contact' }
  ];

  return (
    <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav">
        <a href="#home" className="brand">
          <img src={vanLogo} alt={t('brand')} className="brand-logo" />
          <span>{t('brand')}</span>
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
            {t('header.nav.quote')}
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
