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
import './styles/VanHomepage.css';

const VanHomepage = () => {
  const scrolled = useScroll();
  const { menuOpen, setMenuOpen } = useMenu();
  const { revealed, addRevealRef } = useIntersectionObserver();
  const { counts, setCounts, addCounterRef } = useCounter({ 3: 0, 25: 0, 12: 0, 150: 0 });
  const heroContentRef = useRef(null);
  const heroPanelRef = useRef(null);

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
      />
      <Services 
        revealed={revealed}
        addRevealRef={addRevealRef}
      />
      <Metrics 
        revealed={revealed}
        addRevealRef={addRevealRef}
        counts={counts}
        addCounterRef={addCounterRef}
      />
      <Projects 
        revealed={revealed}
        addRevealRef={addRevealRef}
      />
      <Values 
        revealed={revealed}
        addRevealRef={addRevealRef}
      />
      <Contact 
        revealed={revealed}
        addRevealRef={addRevealRef}
      />
      <Footer />
    </div>
  );
};

export default VanHomepage;
