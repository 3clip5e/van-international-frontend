import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useMenu, useIntersectionObserver, useCounter } from './hooks/useHooks';
import Header from './components/Header';
import EditableComponents from './components/EditableComponents';
import LoginModal from './components/LoginModal';
import './styles/fonts.css';
import './styles/VanHomepage.css';
import './styles/admin.css';

const VanHomepage = () => {
  const scrolled = useScroll();
  const { menuOpen, setMenuOpen } = useMenu();
  const { revealed, addRevealRef } = useIntersectionObserver();
  const { counts, setCounts, addCounterRef } = useCounter({ 3: 0, 25: 0, 12: 0, 150: 0 });
  const heroContentRef = useRef(null);
  const heroPanelRef = useRef(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        if (heroContentRef.current) {
          heroContentRef.current.style.transform = `translateY(${y * 0.12}px)`;
        }
        if (heroPanelRef.current) {
          heroPanelRef.current.style.transform = `translateY(${y * 0.08}px)`;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initialiser les refs pour les animations
  useEffect(() => {
    if (heroContentRef.current) addRevealRef(heroContentRef.current, 'hero-content');
    if (heroPanelRef.current) addRevealRef(heroPanelRef.current, 'hero-panel');
  }, [addRevealRef]);

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const savedAuth = localStorage.getItem('vanAuth');
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(authData.isAuthenticated);
      setUser(authData.user);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('vanAuth', JSON.stringify({
      isAuthenticated: true,
      user: userData
    }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('vanAuth');
  };

  // Intercepter le clic sur "Se connecter"
  useEffect(() => {
    const handleConnectClick = (e) => {
      if (e.target.classList.contains('btn-secondary') && e.target.textContent.includes('Se connecter')) {
        e.preventDefault();
        if (!isAuthenticated) {
          setShowLoginModal(true);
        }
      }
    };

    document.addEventListener('click', handleConnectClick);
    return () => document.removeEventListener('click', handleConnectClick);
  }, [isAuthenticated]);

  return (
    <div className="van-app">
      <Header 
        scrolled={scrolled} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />
      
      <EditableComponents 
        revealed={revealed}
        heroContentRef={heroContentRef}
        heroPanelRef={heroPanelRef}
        addRevealRef={addRevealRef}
        counts={counts}
        addCounterRef={addCounterRef}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default VanHomepage;
