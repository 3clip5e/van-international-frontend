import React from 'react';

const Footer = () => {
  const footerLinks = [
    { text: 'Le Groupe', href: '#about' },
    { text: 'Activités', href: '#activities' },
    { text: 'Projets', href: '#projects' },
    { text: 'Contact', href: '#contact' }
  ];

  return (
    <footer>
      <div className="container footer-wrap">
        <p>© 2026 VAN International Group. Tous droits réservés.</p>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <a key={link.text} href={link.href}>{link.text}</a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
