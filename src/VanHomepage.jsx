import React, { useRef, useEffect } from 'react';
import { useScroll, useMenu, useIntersectionObserver, useCounter } from './hooks/useHooks';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Metrics from './components/Metrics';
import Projects from './components/Projects';
import Values from './components/Values';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import './styles/fonts.css';
import './styles/VanHomepage.css';
import './styles/admin.css';
import './styles/admin-route.css';
import './styles/enhanced-forms.css';
import './styles/language-selector.css';

const VanHomepage = () => {
  const scrolled = useScroll();
  const { menuOpen, setMenuOpen } = useMenu();
  const { revealed, addRevealRef } = useIntersectionObserver();
  const { counts, setCounts, addCounterRef } = useCounter({ 3: 0, 25: 0, 12: 0, 150: 0 });
  const heroContentRef = useRef(null);
  const heroPanelRef = useRef(null);
  const aboutLeftRef = useRef(null);
  const aboutRightRef = useRef(null);
  const servicesRef = useRef(null);
  const metricsRef = useRef(null);
  const projectsRef = useRef(null);
  const valuesRef = useRef(null);
  const contactLeftRef = useRef(null);
  const contactRightRef = useRef(null);

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
    if (aboutLeftRef.current) addRevealRef(aboutLeftRef.current, 'about-left');
    if (aboutRightRef.current) addRevealRef(aboutRightRef.current, 'about-right');
    if (servicesRef.current) addRevealRef(servicesRef.current, 'services');
    if (metricsRef.current) addRevealRef(metricsRef.current, 'metrics');
    if (projectsRef.current) addRevealRef(projectsRef.current, 'projects');
    if (valuesRef.current) addRevealRef(valuesRef.current, 'values');
    if (contactLeftRef.current) addRevealRef(contactLeftRef.current, 'contact-left');
    if (contactRightRef.current) addRevealRef(contactRightRef.current, 'contact-right');
  }, [addRevealRef]);

  return (
    <div className="van-app">
      <Header 
        scrolled={scrolled} 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
      />
      <Hero 
        revealed={revealed}
        heroContentRef={heroContentRef}
        heroPanelRef={heroPanelRef}
        addRevealRef={addRevealRef}
      />
      <About 
        revealed={revealed}
        addRevealRef={addRevealRef}
        aboutLeftRef={aboutLeftRef}
        aboutRightRef={aboutRightRef}
      />
      <Services 
        revealed={revealed}
        addRevealRef={addRevealRef}
        servicesRef={servicesRef}
      />
      <Metrics 
        revealed={revealed}
        addRevealRef={addRevealRef}
        counts={counts}
        addCounterRef={addCounterRef}
        metricsRef={metricsRef}
      />
      <Projects 
        revealed={revealed}
        addRevealRef={addRevealRef}
        projectsRef={projectsRef}
      />
      <Values 
        revealed={revealed}
        addRevealRef={addRevealRef}
        valuesRef={valuesRef}
      />
      <Contact 
        revealed={revealed}
        addRevealRef={addRevealRef}
        contactLeftRef={contactLeftRef}
        contactRightRef={contactRightRef}
      />
      <Footer />
      <AdminRoute />
    </div>
  );
};

export default VanHomepage;
