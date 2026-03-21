import React, { useEffect, useRef, useState } from "react";

export function VanPetroleumPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState({});
  const [counts, setCounts] = useState({ 18: 0, 24: 0, 120: 0, 99: 0 });
  const revealRefs = useRef([]);
  const counterRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = entry.target.dataset.index;
          setRevealed((prev) => ({ ...prev, [index]: true }));
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => el && revealObserver.observe(el));

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = Number(entry.target.dataset.target);
          const duration = 1600;
          const start = performance.now();

          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts((prev) => ({ ...prev, [target]: Math.floor(target * eased) }));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts((prev) => ({ ...prev, [target]: target }));
            }
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    Object.values(counterRefs.current).forEach((el) => el && counterObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  const addRevealRef = (el, index) => {
    if (el) {
      el.dataset.index = index;
      revealRefs.current[index] = el;
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulaire de démonstration. Il faut maintenant le relier à un backend ou à un service d’email.");
  };

  const services = [
    {
      title: "Distribution carburants",
      text: "Approvisionnement fiable en carburants et produits pétroliers pour particuliers, entreprises et institutions.",
    },
    {
      title: "Stations-service modernes",
      text: "Des points de service conçus pour offrir fluidité, sécurité, proximité et qualité d’accueil.",
    },
    {
      title: "Services associés",
      text: "Des prestations complémentaires autour de l’exploitation, de l’assistance et du service client sur site.",
    },
  ];

  const metrics = [
    { value: 18, label: "Stations visées / exploitées" },
    { value: 24, label: "Disponibilité opérationnelle" , suffix: "/7"},
    { value: 120, label: "Capacité de service terrain" },
    { value: 99, label: "Exigence qualité & sécurité", suffix: "%" },
  ];

  return (
    <div className="petroleum-app">
      <style>{`
        :root {
          --petro-red: #DC242F;
          --petro-blue: #1D456A;
          --petro-dark: #0B1017;
          --petro-surface: #111927;
          --petro-muted: #677489;
          --petro-light: #F6F8FB;
          --petro-white: #FFFFFF;
          --petro-border: #DEE6EF;
          --petro-shadow: 0 18px 50px rgba(10, 16, 24, 0.12);
          --petro-shadow-strong: 0 28px 70px rgba(10, 16, 24, 0.2);
          --petro-radius: 24px;
          --petro-container: 1200px;
          --petro-transition: .35s cubic-bezier(.22,.61,.36,1);
        }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #182230; background: var(--petro-white); }
        a { text-decoration: none; color: inherit; }
        .container { width: min(92%, var(--petro-container)); margin: 0 auto; }
        .section { padding: 100px 0; }
        .section-title { font-size: clamp(2rem, 4vw, 3.3rem); line-height: 1.02; margin-bottom: 16px; color: var(--petro-blue); letter-spacing: -0.03em; }
        .section-subtitle { max-width: 760px; color: var(--petro-muted); margin-bottom: 42px; font-size: 1.05rem; }

        .topbar { position: fixed; inset: 0 0 auto 0; z-index: 1000; background: rgba(11,16,23,.2); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,.08); transition: var(--petro-transition); }
        .topbar.scrolled { background: rgba(255,255,255,.94); box-shadow: 0 10px 30px rgba(0,0,0,.08); }
        .nav { min-height: 82px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .brand { display: flex; align-items: center; gap: 12px; font-weight: 900; letter-spacing: .4px; color: white; position: relative; z-index: 2; }
        .topbar.scrolled .brand, .topbar.scrolled .nav-links a, .topbar.scrolled .menu-btn { color: var(--petro-blue); }
        .logo-box { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; color: white; font-weight: 900; background: linear-gradient(135deg, var(--petro-red), #99181f); box-shadow: 0 12px 30px rgba(220,36,47,.22); }
        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-links a { font-weight: 700; color: white; cursor: pointer; position: relative; }
        .nav-links a:not(.nav-cta)::after { content: ""; position: absolute; left: 0; bottom: -6px; width: 0; height: 2px; background: var(--petro-red); transition: var(--petro-transition); }
        .nav-links a:not(.nav-cta):hover::after { width: 100%; }
        .nav-cta { padding: 12px 18px; border-radius: 999px; background: linear-gradient(135deg, var(--petro-red), #b61e28); color: white !important; box-shadow: 0 14px 32px rgba(220,36,47,.26); }
        .menu-btn { display: none; background: transparent; border: none; font-size: 1.8rem; color: white; cursor: pointer; position: relative; z-index: 2; }

        .hero { min-height: 100vh; position: relative; color: white; overflow: hidden; display: flex; align-items: center; background: radial-gradient(circle at top right, rgba(220,36,47,.22), transparent 25%), linear-gradient(135deg, #090d13 0%, #111927 42%, #1D456A 100%); }
        .hero::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(11,16,23,.88) 20%, rgba(11,16,23,.62) 55%, rgba(11,16,23,.3) 100%); }
        .hero::after { content: ""; position: absolute; right: -140px; top: 50%; transform: translateY(-50%); width: 520px; height: 520px; border-radius: 50%; background: radial-gradient(circle, rgba(220,36,47,.28), transparent 62%); filter: blur(8px); }
        .hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.05fr .95fr; gap: 36px; align-items: center; width: 100%; padding-top: 92px; }
        .eyebrow { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); backdrop-filter: blur(8px); margin-bottom: 22px; }
        .eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--petro-red); box-shadow: 0 0 0 6px rgba(220,36,47,.14); }
        .hero h1 { font-size: clamp(2.8rem, 6vw, 5.3rem); line-height: .96; margin-bottom: 22px; letter-spacing: -.05em; max-width: 760px; }
        .hero p { font-size: 1.08rem; color: rgba(255,255,255,.9); max-width: 680px; margin-bottom: 30px; }
        .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 34px; }
        .btn { border: none; border-radius: 999px; padding: 15px 24px; font-weight: 800; cursor: pointer; transition: var(--petro-transition); }
        .btn-primary { background: linear-gradient(135deg, var(--petro-red), #b41d27); color: white; box-shadow: 0 18px 40px rgba(220,36,47,.25); }
        .btn-primary:hover { transform: translateY(-3px); }
        .btn-secondary { background: rgba(255,255,255,.08); color: white; border: 1px solid rgba(255,255,255,.18); }
        .btn-secondary:hover { background: rgba(255,255,255,.14); transform: translateY(-3px); }
        .hero-stats { display: flex; flex-wrap: wrap; gap: 18px; }
        .stat-pill { padding: 16px 18px; border-radius: 18px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); min-width: 160px; backdrop-filter: blur(10px); }
        .stat-pill strong { display: block; font-size: 1.35rem; margin-bottom: 4px; }

        .hero-card { position: relative; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12); border-radius: 30px; padding: 26px; backdrop-filter: blur(14px); box-shadow: var(--petro-shadow-strong); overflow: hidden; }
        .hero-card::before { content: ""; position: absolute; inset: auto -20% 0 -20%; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.7), transparent); animation: petroleumSweep 4s linear infinite; }
        .hero-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .hero-card-tag { padding: 9px 14px; border-radius: 999px; background: rgba(220,36,47,.14); color: #fff; font-weight: 800; border: 1px solid rgba(220,36,47,.18); }
        .hero-card-grid { display: grid; gap: 14px; }
        .mini-panel { border-radius: 18px; padding: 18px; background: rgba(255,255,255,.06); border-left: 4px solid var(--petro-red); }
        .mini-panel h3 { margin: 0 0 6px; font-size: 1.03rem; }
        .mini-panel p { margin: 0; color: rgba(255,255,255,.82); font-size: .95rem; }

        .feature-grid, .service-grid, .metric-grid, .coverage-grid, .quality-grid, .contact-grid { display: grid; gap: 24px; }
        .feature-grid { grid-template-columns: repeat(3, 1fr); }
        .service-grid { grid-template-columns: repeat(3, 1fr); }
        .metric-grid { grid-template-columns: repeat(4, 1fr); }
        .coverage-grid { grid-template-columns: 1.1fr .9fr; align-items: center; }
        .quality-grid { grid-template-columns: repeat(3, 1fr); }
        .contact-grid { grid-template-columns: .9fr 1.1fr; align-items: start; }

        .card, .metric-card, .contact-box, .map-box { background: var(--petro-white); border: 1px solid var(--petro-border); border-radius: var(--petro-radius); box-shadow: var(--petro-shadow); }
        .feature-card, .service-card, .quality-card { background: var(--petro-white); border: 1px solid var(--petro-border); border-radius: var(--petro-radius); padding: 28px; box-shadow: var(--petro-shadow); transition: var(--petro-transition); }
        .feature-card:hover, .service-card:hover, .quality-card:hover, .metric-card:hover, .contact-box:hover, .map-box:hover { transform: translateY(-8px); }
        .feature-icon, .quality-icon { width: 58px; height: 58px; border-radius: 18px; display: grid; place-items: center; margin-bottom: 18px; color: white; font-weight: 900; background: linear-gradient(135deg, var(--petro-red), var(--petro-blue)); box-shadow: 0 14px 34px rgba(29,69,106,.18); }
        .feature-card h3, .service-card h3, .quality-card h3, .contact-box h3 { color: var(--petro-blue); margin-bottom: 10px; }
        .feature-card p, .service-card p, .quality-card p, .contact-box p { color: var(--petro-muted); }

        .metric-section { background: linear-gradient(180deg, var(--petro-dark), #101826); color: white; position: relative; overflow: hidden; }
        .metric-section::before { content: ""; position: absolute; left: -140px; bottom: -140px; width: 360px; height: 360px; border-radius: 50%; background: radial-gradient(circle, rgba(220,36,47,.2), transparent 60%); }
        .metric-section .section-title { color: white; }
        .metric-section .section-subtitle { color: rgba(255,255,255,.74); }
        .metric-card { background: rgba(255,255,255,.05); border-color: rgba(255,255,255,.08); padding: 30px 22px; text-align: center; backdrop-filter: blur(6px); }
        .metric-card h3 { font-size: clamp(2rem, 4vw, 3rem); margin: 0 0 10px; color: var(--petro-red); }
        .metric-card p { margin: 0; color: rgba(255,255,255,.78); }

        .coverage { background: var(--petro-light); }
        .map-box { min-height: 420px; position: relative; overflow: hidden; background: linear-gradient(135deg, #102030, #1D456A); }
        .map-box::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 30% 40%, rgba(255,255,255,.1), transparent 20%), radial-gradient(circle at 70% 25%, rgba(255,255,255,.08), transparent 18%), radial-gradient(circle at 60% 75%, rgba(255,255,255,.08), transparent 20%); }
        .map-lines { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px); background-size: 42px 42px; opacity: .45; }
        .map-content { position: absolute; inset: 0; padding: 28px; color: white; display: flex; flex-direction: column; justify-content: flex-end; }
        .map-badge { display: inline-flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.14); width: fit-content; margin-bottom: 14px; }
        .map-badge::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--petro-red); }
        .coverage-points { display: grid; gap: 16px; }
        .coverage-item { background: white; border: 1px solid var(--petro-border); border-radius: 20px; padding: 20px; box-shadow: var(--petro-shadow); }
        .coverage-item h3 { margin: 0 0 8px; color: var(--petro-blue); }
        .coverage-item p { margin: 0; color: var(--petro-muted); }

        .contact-box { background: var(--petro-light); padding: 28px; }
        .info-block { margin-bottom: 18px; }
        .info-block strong { display: block; margin-bottom: 6px; }
        form { display: grid; gap: 16px; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        input, textarea { width: 100%; padding: 15px 16px; border: 1px solid #CFD9E4; border-radius: 14px; font: inherit; outline: none; }
        input:focus, textarea:focus { border-color: var(--petro-blue); box-shadow: 0 0 0 4px rgba(29,69,106,.1); }
        textarea { min-height: 150px; resize: vertical; }

        footer { background: var(--petro-dark); color: rgba(255,255,255,.8); padding: 30px 0; }
        .footer-wrap { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 18px; align-items: center; }
        .footer-links { display: flex; gap: 18px; flex-wrap: wrap; }

        .reveal { opacity: 0; transform: translateY(38px) scale(.985); transition: opacity .85s cubic-bezier(.22,.61,.36,1), transform .85s cubic-bezier(.22,.61,.36,1); }
        .reveal.left { transform: translateX(-40px) scale(.985); }
        .reveal.right { transform: translateX(40px) scale(.985); }
        .reveal.visible { opacity: 1; transform: translate(0,0) scale(1); }

        @keyframes petroleumSweep { 0% { transform: translateX(-60%);} 100% { transform: translateX(160%);} }

        @media (max-width: 1100px) {
          .hero-grid, .feature-grid, .service-grid, .metric-grid, .coverage-grid, .quality-grid, .contact-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 840px) {
          .menu-btn { display: block; }
          .nav-links { position: fixed; top: 0; right: ${menuOpen ? "0" : "-100%"}; width: min(88vw, 360px); height: 100vh; background: rgba(255,255,255,.98); padding: 110px 24px 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 18px; box-shadow: -12px 0 30px rgba(0,0,0,.12); transition: .35s ease; z-index: 1; }
          .nav-links a { color: var(--petro-blue); }
          .hero-grid, .feature-grid, .service-grid, .metric-grid, .coverage-grid, .quality-grid, .contact-grid, .field-row { grid-template-columns: 1fr; }
          .hero { min-height: auto; padding: 120px 0 88px; }
          .section { padding: 80px 0; }
        }
      `}</style>

      <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav">
          <a href="#petroleum-home" className="brand">
            <span className="logo-box">VP</span>
            <span>VAN Petroleum</span>
          </a>
          <nav className="nav-links">
            <a onClick={() => scrollToSection("petroleum-about")}>À propos</a>
            <a onClick={() => scrollToSection("petroleum-services")}>Services</a>
            <a onClick={() => scrollToSection("petroleum-coverage")}>Réseau</a>
            <a onClick={() => scrollToSection("petroleum-quality")}>Qualité</a>
            <a onClick={() => scrollToSection("petroleum-contact")}>Contact</a>
            <a className="nav-cta" onClick={() => scrollToSection("petroleum-contact")}>Nous joindre</a>
          </nav>
          <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Ouvrir le menu">{menuOpen ? "✕" : "☰"}</button>
        </div>
      </header>

      <section className="hero" id="petroleum-home">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Énergie • Distribution • Service • Performance</span>
            <h1>VAN Petroleum, une énergie fiable au service de la mobilité et des opérations.</h1>
            <p>
              VAN Petroleum développe un réseau moderne de distribution de carburants et de services associés, avec une exigence forte en matière de disponibilité, de sécurité, de qualité et d’expérience client.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollToSection("petroleum-services")}>Découvrir nos services</button>
              <button className="btn btn-secondary" onClick={() => scrollToSection("petroleum-contact")}>Contacter VAN Petroleum</button>
            </div>
            <div className="hero-stats">
              <div className="stat-pill"><strong>Distribution</strong><span>fiable et continue</span></div>
              <div className="stat-pill"><strong>Sécurité</strong><span>au cœur des opérations</span></div>
              <div className="stat-pill"><strong>Service</strong><span>proximité et efficacité</span></div>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-top">
              <h2 style={{ margin: 0 }}>Expertise métier</h2>
              <span className="hero-card-tag">VAN Petroleum</span>
            </div>
            <div className="hero-card-grid">
              <div className="mini-panel"><h3>Approvisionnement maîtrisé</h3><p>Organisation logistique pensée pour soutenir la continuité des points de distribution.</p></div>
              <div className="mini-panel"><h3>Stations-service modernes</h3><p>Des espaces conçus pour l’accueil, la fluidité, la conformité et la qualité de service.</p></div>
              <div className="mini-panel"><h3>Normes & contrôle</h3><p>Un pilotage orienté sécurité, traçabilité et performance des opérations terrain.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="petroleum-about">
        <div className="container">
          <div ref={(el) => addRevealRef(el, 0)} className={`reveal ${revealed[0] ? "visible" : ""}`}>
            <h2 className="section-title">Une filiale pensée pour la confiance et la continuité</h2>
            <p className="section-subtitle">VAN Petroleum s’inscrit dans une logique d’excellence opérationnelle pour répondre aux besoins en carburants, en services de proximité et en fiabilité d’exploitation.</p>
          </div>
          <div className="feature-grid">
            {[
              ["01", "Fiabilité opérationnelle", "Des procédures et une organisation qui soutiennent la continuité des activités au quotidien."],
              ["02", "Proximité client", "Une approche orientée service, accueil et qualité d’expérience sur chaque point de contact."],
              ["03", "Pilotage rigoureux", "Une gestion structurée des flux, des équipements et des exigences de conformité."],
            ].map(([n, title, text], i) => (
              <div key={title} ref={(el) => addRevealRef(el, 1 + i)} className={`feature-card reveal ${revealed[1 + i] ? "visible" : ""}`}>
                <div className="feature-icon">{n}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="petroleum-services" style={{ background: "var(--petro-light)" }}>
        <div className="container">
          <div ref={(el) => addRevealRef(el, 4)} className={`reveal ${revealed[4] ? "visible" : ""}`}>
            <h2 className="section-title">Nos services</h2>
            <p className="section-subtitle">Une offre claire, structurée et alignée sur les attentes du marché et des usagers.</p>
          </div>
          <div className="service-grid">
            {services.map((service, i) => (
              <div key={service.title} ref={(el) => addRevealRef(el, 5 + i)} className={`service-card reveal ${revealed[5 + i] ? "visible" : ""}`}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section metric-section">
        <div className="container">
          <div ref={(el) => addRevealRef(el, 8)} className={`reveal ${revealed[8] ? "visible" : ""}`}>
            <h2 className="section-title">Des indicateurs qui rassurent</h2>
            <p className="section-subtitle">Ces chiffres sont des placeholders à remplacer par les données réelles de VAN Petroleum.</p>
          </div>
          <div className="metric-grid">
            {metrics.map((metric, i) => (
              <div key={metric.value} ref={(el) => { addRevealRef(el, 9 + i); counterRefs.current[metric.value] = el; }} data-target={metric.value} className={`metric-card reveal ${revealed[9 + i] ? "visible" : ""}`}>
                <h3>{counts[metric.value]}{metric.suffix || "+"}</h3>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section coverage" id="petroleum-coverage">
        <div className="container coverage-grid">
          <div ref={(el) => addRevealRef(el, 13)} className={`map-box reveal left ${revealed[13] ? "visible" : ""}`}>
            <div className="map-lines"></div>
            <div className="map-content">
              <span className="map-badge">Réseau en expansion</span>
              <h2 style={{ margin: 0, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.02 }}>Une couverture pensée pour la proximité et l’efficacité.</h2>
            </div>
          </div>
          <div className="coverage-points">
            {[
              ["Implantation stratégique", "Des sites positionnés pour répondre aux flux de mobilité et aux besoins d’approvisionnement."],
              ["Service homogène", "Une expérience cohérente portée par des standards d’exploitation et de relation client."],
              ["Capacité d’évolution", "Une base conçue pour soutenir l’extension progressive du réseau VAN Petroleum."],
            ].map(([title, text], i) => (
              <div key={title} ref={(el) => addRevealRef(el, 14 + i)} className={`coverage-item reveal right ${revealed[14 + i] ? "visible" : ""}`}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="petroleum-quality">
        <div className="container">
          <div ref={(el) => addRevealRef(el, 17)} className={`reveal ${revealed[17] ? "visible" : ""}`}>
            <h2 className="section-title">Qualité, sécurité et confiance</h2>
            <p className="section-subtitle">Des principes non négociables pour une activité à forte exigence opérationnelle.</p>
          </div>
          <div className="quality-grid">
            {[
              ["Q1", "Sécurité d’exploitation", "Des pratiques organisées pour réduire les risques et protéger les personnes, les équipements et les sites."],
              ["Q2", "Exigence qualité", "Un suivi rigoureux des standards de service, de contrôle et de satisfaction client."],
              ["Q3", "Image de marque", "Une présentation propre, cohérente et professionnelle sur l’ensemble des points de contact."],
            ].map(([n, title, text], i) => (
              <div key={title} ref={(el) => addRevealRef(el, 18 + i)} className={`quality-card reveal ${revealed[18 + i] ? "visible" : ""}`}>
                <div className="quality-icon">{n}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="petroleum-contact" style={{ background: "var(--petro-light)" }}>
        <div className="container contact-grid">
          <div ref={(el) => addRevealRef(el, 21)} className={`contact-box reveal left ${revealed[21] ? "visible" : ""}`}>
            <h3>Contacter VAN Petroleum</h3>
            <div className="info-block"><strong>Filiale</strong><span>VAN Petroleum</span></div>
            <div className="info-block"><strong>Email</strong><span>petroleum@van-group.com</span></div>
            <div className="info-block"><strong>Téléphone</strong><span>+237 6 XX XX XX XX</span></div>
            <div className="info-block"><strong>Adresse</strong><span>Yaoundé, Cameroun</span></div>
            <div className="info-block"><strong>Objet</strong><span>Distribution • Partenariats • Réseau • Exploitation</span></div>
          </div>
          <div ref={(el) => addRevealRef(el, 22)} className={`contact-box reveal right ${revealed[22] ? "visible" : ""}`}>
            <h3>Écrire à l’équipe</h3>
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

      <footer>
        <div className="container footer-wrap">
          <p>© 2026 VAN Petroleum. Tous droits réservés.</p>
          <div className="footer-links">
            <a href="#petroleum-about">À propos</a>
            <a href="#petroleum-services">Services</a>
            <a href="#petroleum-coverage">Réseau</a>
            <a href="#petroleum-contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function VanHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState({});
  const [counts, setCounts] = useState({ 3: 0, 25: 0, 12: 0, 150: 0 });
  const heroContentRef = useRef(null);
  const heroPanelRef = useRef(null);
  const revealRefs = useRef([]);
  const counterRefs = useRef({});

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = entry.target.dataset.index;
          setRevealed((prev) => ({ ...prev, [index]: true }));
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    revealRefs.current.forEach((el) => el && revealObserver.observe(el));

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = Number(entry.target.dataset.target);
          const duration = 1600;
          const start = performance.now();

          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts((prev) => ({ ...prev, [target]: Math.floor(target * eased) }));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts((prev) => ({ ...prev, [target]: target }));
            }
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    Object.values(counterRefs.current).forEach((el) => el && counterObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  const addRevealRef = (el, index) => {
    if (el) {
      el.dataset.index = index;
      revealRefs.current[index] = el;
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulaire de démonstration. Il faut maintenant le relier à un backend ou à un service d’email.");
  };

  const services = [
    {
      title: "VAN Petroleum",
      className: "petroleum",
      text: "Un pôle orienté distribution et services pétroliers, pensé pour garantir disponibilité, proximité et qualité.",
      items: [
        "Stations-service et distribution",
        "Services associés aux points d’exploitation",
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

  const metrics = [
    { value: 3, label: "Pôles d’activité intégrés" },
    { value: 25, label: "Projets accompagnés" },
    { value: 12, label: "Sites / points d’opération" },
    { value: 150, label: "Collaborateurs mobilisés" },
  ];

  const values = [
    {
      n: "01",
      title: "Fiabilité",
      text: "Nous tenons nos engagements avec constance dans l’exécution et le service.",
    },
    {
      n: "02",
      title: "Sécurité",
      text: "Chaque activité est menée avec une attention forte portée aux normes et à la prévention.",
    },
    {
      n: "03",
      title: "Performance",
      text: "Nous cherchons l’efficacité opérationnelle, la qualité et la maîtrise des délais.",
    },
    {
      n: "04",
      title: "Innovation",
      text: "Nous améliorons en continu nos méthodes pour répondre aux exigences du terrain.",
    },
  ];

  return (
    <div className="van-app">
      <style>{`
        :root {
          --van-blue: #1D456A;
          --van-red: #DC242F;
          --van-gold: #F2B705;
          --dark: #08111b;
          --text: #1d2835;
          --muted: #6b7788;
          --light: #f5f7fb;
          --white: #ffffff;
          --border: #d9e3ee;
          --shadow: 0 18px 50px rgba(8, 18, 30, 0.12);
          --shadow-strong: 0 30px 70px rgba(8, 18, 30, 0.2);
          --radius: 22px;
          --container: 1200px;
          --transition: 0.35s cubic-bezier(.22,.61,.36,1);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: var(--white); color: var(--text); }
        a { color: inherit; text-decoration: none; }
        .container { width: min(92%, var(--container)); margin: 0 auto; }
        .section { padding: 100px 0; position: relative; }
        .section-title { font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.06; margin-bottom: 18px; color: var(--van-blue); letter-spacing: -0.02em; }
        .section-subtitle { max-width: 760px; color: var(--muted); font-size: 1.05rem; margin-bottom: 48px; }

        .topbar { position: fixed; inset: 0 0 auto 0; z-index: 1000; transition: var(--transition); background: rgba(8, 17, 27, 0.16); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .topbar.scrolled { background: rgba(255,255,255,0.93); box-shadow: 0 10px 30px rgba(0,0,0,0.08); border-bottom: 1px solid rgba(10,20,40,0.05); }
        .nav { display: flex; align-items: center; justify-content: space-between; min-height: 82px; gap: 20px; }
        .brand { display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 1.15rem; color: var(--white); letter-spacing: 0.4px; position: relative; z-index: 3; }
        .topbar.scrolled .brand, .topbar.scrolled .nav-links a, .topbar.scrolled .menu-btn { color: var(--van-blue); }
        .logo-box { width: 44px; height: 44px; border-radius: 14px; background: linear-gradient(135deg, var(--van-blue), var(--van-red)); display: grid; place-items: center; color: var(--white); font-weight: 900; box-shadow: 0 12px 30px rgba(220, 36, 47, 0.18); }
        .nav-links { display: flex; align-items: center; gap: 28px; }
        .nav-links a { color: var(--white); font-weight: 700; transition: var(--transition); position: relative; cursor: pointer; }
        .nav-links a:not(.nav-cta)::after { content: ""; position: absolute; left: 0; bottom: -6px; width: 0; height: 2px; background: var(--van-red); transition: var(--transition); }
        .nav-links a:not(.nav-cta):hover::after { width: 100%; }
        .nav-links a:hover { color: var(--van-red); }
        .nav-cta { padding: 12px 18px; border-radius: 999px; background: linear-gradient(135deg, var(--van-red), #b91923); color: var(--white) !important; font-weight: 800; box-shadow: 0 12px 28px rgba(220, 36, 47, 0.24); }
        .menu-btn { display: none; background: transparent; border: none; color: var(--white); font-size: 1.8rem; cursor: pointer; position: relative; z-index: 3; }

        .hero { position: relative; min-height: 100vh; display: flex; align-items: center; color: var(--white); overflow: hidden; background: #08111b; }
        .hero-video-wrap { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
        .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.08); animation: slowZoom 18s ease-in-out infinite alternate; filter: saturate(1.05) contrast(1.02); }
        .hero-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(110deg, rgba(8,17,27,0.88) 18%, rgba(8,17,27,0.72) 45%, rgba(29,69,106,0.46) 100%), radial-gradient(circle at top right, rgba(220,36,47,0.25), transparent 28%), radial-gradient(circle at bottom left, rgba(29,69,106,0.3), transparent 30%); }
        .hero-grid { position: relative; z-index: 2; display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 40px; align-items: center; width: 100%; padding-top: 92px; }
        .hero-content { will-change: transform; }
        .eyebrow { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border: 1px solid rgba(255,255,255,0.14); border-radius: 999px; background: rgba(255,255,255,0.08); font-size: 0.9rem; margin-bottom: 22px; backdrop-filter: blur(8px); animation: floatSoft 5s ease-in-out infinite; }
        .eyebrow::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--van-red); box-shadow: 0 0 0 6px rgba(220, 36, 47, 0.14); }
        .hero h1 { font-size: clamp(2.8rem, 6vw, 5.4rem); line-height: 0.98; margin-bottom: 22px; max-width: 780px; letter-spacing: -0.04em; text-shadow: 0 10px 30px rgba(0,0,0,0.24); }
        .hero p { font-size: 1.1rem; max-width: 700px; color: rgba(255,255,255,0.9); margin-bottom: 30px; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 34px; }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 15px 24px; border-radius: 999px; font-weight: 800; transition: var(--transition); border: 1px solid transparent; position: relative; overflow: hidden; cursor: pointer; }
        .btn::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent); transform: translateX(-120%); transition: 0.8s ease; }
        .btn:hover::before { transform: translateX(120%); }
        .btn-primary { background: linear-gradient(135deg, var(--van-red), #b81822); color: var(--white); box-shadow: 0 18px 35px rgba(220, 36, 47, 0.22); }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 24px 45px rgba(220, 36, 47, 0.3); }
        .btn-secondary { background: rgba(255,255,255,0.06); color: var(--white); border-color: rgba(255,255,255,0.22); backdrop-filter: blur(8px); }
        .btn-secondary:hover { background: rgba(255,255,255,0.12); transform: translateY(-3px); }
        .hero-stats { display: flex; flex-wrap: wrap; gap: 18px; }
        .stat-pill { padding: 15px 18px; border-radius: 18px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); min-width: 150px; backdrop-filter: blur(8px); transition: var(--transition); }
        .stat-pill:hover { transform: translateY(-6px); background: rgba(255,255,255,0.12); }
        .stat-pill strong { display: block; font-size: 1.3rem; margin-bottom: 4px; }
        .hero-panel { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 28px; padding: 24px; backdrop-filter: blur(12px); box-shadow: var(--shadow-strong); position: relative; overflow: hidden; will-change: transform; }
        .hero-panel::before { content: ""; position: absolute; inset: auto -20% 0 -20%; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent); animation: sweep 4s linear infinite; }
        .panel-title { font-size: 1.2rem; margin-bottom: 20px; position: relative; z-index: 1; }
        .activity-list { display: grid; gap: 14px; position: relative; z-index: 1; }
        .activity-card { border-radius: 18px; padding: 18px; background: rgba(255,255,255,0.06); border-left: 5px solid var(--white); transition: var(--transition); }
        .activity-card:hover { transform: translateX(8px) scale(1.01); background: rgba(255,255,255,0.1); }
        .activity-card.red { border-left-color: var(--van-red); }
        .activity-card.blue { border-left-color: #69a5de; }
        .activity-card.gold { border-left-color: var(--van-gold); }
        .activity-card h3 { font-size: 1.05rem; margin-bottom: 6px; }
        .activity-card p { font-size: 0.95rem; color: rgba(255,255,255,0.84); margin: 0; }
        .scroll-indicator { position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px; color: rgba(255,255,255,0.8); font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase; animation: fadeUpLoop 2.4s ease-in-out infinite; cursor: pointer; }
        .mouse { width: 28px; height: 46px; border: 2px solid rgba(255,255,255,0.65); border-radius: 20px; position: relative; }
        .mouse::before { content: ""; position: absolute; left: 50%; top: 8px; transform: translateX(-50%); width: 5px; height: 9px; border-radius: 999px; background: var(--white); animation: mouseWheel 1.8s infinite; }

        .about-grid, .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 42px; align-items: center; }
        .about-card, .contact-info, .contact-form, .service-card, .project-card, .value-card, .metric-box { transition: var(--transition); }
        .about-card { background: var(--light); border: 1px solid var(--border); border-radius: var(--radius); padding: 32px; box-shadow: var(--shadow); }
        .about-card:hover, .contact-info:hover, .contact-form:hover, .service-card:hover, .project-card:hover, .value-card:hover, .metric-box:hover { transform: translateY(-8px); }
        .about-card p { color: var(--muted); margin-bottom: 20px; }
        .bullet-list { display: grid; gap: 14px; margin-top: 10px; }
        .bullet-item { display: flex; align-items: flex-start; gap: 12px; }
        .bullet-dot { width: 14px; height: 14px; border-radius: 50%; margin-top: 7px; background: linear-gradient(135deg, var(--van-blue), var(--van-red)); flex-shrink: 0; box-shadow: 0 0 0 8px rgba(29,69,106,0.06); }

        .business, .values { background: var(--light); }
        .cards-grid, .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .metrics-grid, .values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
        .service-card, .project-card, .value-card, .metric-box, .contact-info, .contact-form { background: var(--white); border-radius: 24px; border: 1px solid var(--border); box-shadow: var(--shadow); overflow: hidden; }
        .service-top { height: 200px; padding: 24px; color: var(--white); display: flex; align-items: flex-end; font-size: 1.6rem; font-weight: 900; letter-spacing: 0.2px; }
        .petroleum { background: linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.42)), linear-gradient(135deg, #88131c, var(--van-red)); }
        .btp { background: linear-gradient(rgba(0,0,0,0.22), rgba(0,0,0,0.36)), linear-gradient(135deg, #8e6b06, #f1b63a); }
        .logistique { background: linear-gradient(rgba(0,0,0,0.22), rgba(0,0,0,0.38)), linear-gradient(135deg, #0d2f50, var(--van-blue)); }
        .service-body, .project-body { padding: 26px; }
        .service-body p, .project-body p, .value-card p { color: var(--muted); }
        .service-body ul { list-style: none; display: grid; gap: 10px; margin-bottom: 22px; padding: 0; }
        .service-body li::before { content: "— "; color: var(--van-red); font-weight: bold; }
        .card-link { color: var(--van-blue); font-weight: 800; }
        .metrics { background: linear-gradient(180deg, var(--dark), #0b1723); color: var(--white); }
        .metrics .section-title { color: var(--white); }
        .metrics .section-subtitle { color: rgba(255,255,255,0.7); }
        .metric-box { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); padding: 30px 22px; text-align: center; backdrop-filter: blur(6px); }
        .metric-box h3 { font-size: clamp(2rem, 4vw, 3rem); color: var(--van-red); margin-bottom: 10px; }
        .metric-box p { color: rgba(255,255,255,0.78); }
        .project-image { height: 220px; position: relative; background: linear-gradient(135deg, rgba(29,69,106,0.95), rgba(220,36,47,0.7)); }
        .project-label { position: absolute; left: 18px; top: 18px; padding: 9px 14px; background: rgba(255,255,255,0.15); backdrop-filter: blur(6px); border-radius: 999px; color: var(--white); font-weight: 800; font-size: 0.9rem; }
        .project-body h3, .value-card h3, .contact-info h3, .contact-form h3 { color: var(--van-blue); margin-bottom: 10px; }
        .value-card { padding: 28px 22px; }
        .value-icon { width: 58px; height: 58px; border-radius: 18px; background: linear-gradient(135deg, var(--van-blue), var(--van-red)); display: grid; place-items: center; color: var(--white); font-weight: 900; font-size: 1.1rem; margin-bottom: 18px; }
        .contact-grid { align-items: start; gap: 30px; }
        .contact-info, .contact-form { background: var(--light); padding: 28px; }
        .info-block { margin-bottom: 18px; }
        .info-block strong { display: block; margin-bottom: 6px; }
        .contact-form form { display: grid; gap: 16px; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        input, textarea { width: 100%; padding: 15px 16px; border-radius: 14px; border: 1px solid #cfd9e4; font: inherit; outline: none; background: var(--white); color: var(--text); transition: var(--transition); }
        input:focus, textarea:focus { border-color: var(--van-blue); box-shadow: 0 0 0 4px rgba(29, 69, 106, 0.10); }
        textarea { min-height: 150px; resize: vertical; }
        footer { background: var(--dark); color: rgba(255,255,255,0.8); padding: 30px 0; }
        .footer-wrap { display: flex; justify-content: space-between; gap: 18px; align-items: center; flex-wrap: wrap; }
        .footer-links { display: flex; gap: 18px; flex-wrap: wrap; }

        .reveal { opacity: 0; transform: translateY(38px) scale(0.985); transition: opacity 0.85s cubic-bezier(.22,.61,.36,1), transform 0.85s cubic-bezier(.22,.61,.36,1); }
        .reveal.left { transform: translateX(-40px) scale(0.985); }
        .reveal.right { transform: translateX(40px) scale(0.985); }
        .reveal.visible { opacity: 1; transform: translate(0,0) scale(1); }

        @keyframes slowZoom { from { transform: scale(1.06); } to { transform: scale(1.15); } }
        @keyframes sweep { 0% { transform: translateX(-60%); } 100% { transform: translateX(160%); } }
        @keyframes mouseWheel { 0% { opacity: 0; transform: translate(-50%, 0); } 30% { opacity: 1; } 100% { opacity: 0; transform: translate(-50%, 14px); } }
        @keyframes fadeUpLoop { 0%,100% { transform: translate(-50%, 0); opacity: .8; } 50% { transform: translate(-50%, -6px); opacity: 1; } }
        @keyframes floatSoft { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }

        @media (max-width: 1100px) {
          .hero-grid, .about-grid, .contact-grid, .cards-grid, .metrics-grid, .projects-grid, .values-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 840px) {
          .menu-btn { display: block; }
          .nav-links { position: fixed; top: 0; right: ${menuOpen ? "0" : "-100%"}; width: min(88vw, 360px); height: 100vh; background: rgba(255,255,255,0.98); padding: 110px 24px 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 18px; box-shadow: -12px 0 30px rgba(0,0,0,0.12); transition: .35s ease; z-index: 2; }
          .nav-links a { color: var(--van-blue); }
          .hero-grid, .about-grid, .cards-grid, .metrics-grid, .projects-grid, .values-grid, .contact-grid, .field-row { grid-template-columns: 1fr; }
          .hero { min-height: auto; padding: 120px 0 88px; }
          .scroll-indicator { display: none; }
          .section { padding: 80px 0; }
        }
        @media (max-width: 560px) {
          .hero h1 { font-size: clamp(2.2rem, 10vw, 3.2rem); }
          .hero-actions { flex-direction: column; align-items: stretch; }
          .btn { width: 100%; }
          .section-title { font-size: 2rem; }
        }
      `}</style>

      <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav">
          <a href="#home" className="brand">
            <span className="logo-box">V</span>
            <span>VAN International</span>
          </a>

          <nav className="nav-links">
            <a onClick={() => scrollToSection("about")}>Le Groupe</a>
            <a onClick={() => scrollToSection("activities")}>Nos Activités</a>
            <a onClick={() => scrollToSection("projects")}>Projets</a>
            <a onClick={() => scrollToSection("values")}>Valeurs</a>
            <a onClick={() => scrollToSection("contact")}>Contact</a>
            <a className="nav-cta" onClick={() => scrollToSection("contact")}>Demander un devis</a>
          </nav>

          <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Ouvrir le menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-video-wrap">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1600&auto=format&fit=crop"
          >
            <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-a-highway-1560088827401?download=1080p" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay" />

        <div className="container hero-grid">
          <div ref={heroContentRef} className={`hero-content reveal left ${revealed[0] ? "visible" : ""}`}>
            <h1>VAN construit, alimente et connecte l'avenir.</h1>
            <p>
              VAN International Group réunit des expertises complémentaires à travers VAN Petroleum, VAN BTP et VAN Logistique & Transport pour offrir des solutions fiables, structurées et adaptées aux besoins des entreprises, des institutions et des territoires.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollToSection("activities")}>Découvrir nos activités</button>
              <button className="btn btn-secondary" onClick={() => scrollToSection("contact")}>Nous contacter</button>
            </div>
            <div className="hero-stats">
              <div className="stat-pill"><strong>3 pôles</strong><span>des métiers complémentaires</span></div>
              <div className="stat-pill"><strong>+100%</strong><span>engagement qualité & sécurité</span></div>
              <div className="stat-pill"><strong>24/7</strong><span>réactivité opérationnelle</span></div>
            </div>
          </div>

          <div ref={heroPanelRef} className={`hero-panel reveal right ${revealed[1] ? "visible" : ""}`}>
            <h2 className="panel-title">Nos expertises clés</h2>
            <div className="activity-list">
              <div className="activity-card red"><h3>VAN Petroleum</h3><p>Stations-service, distribution de produits pétroliers et services associés.</p></div>
              <div className="activity-card gold"><h3>VAN BTP</h3><p>Construction, génie civil, travaux et réalisation d’infrastructures durables.</p></div>
              <div className="activity-card blue"><h3>VAN Logistique & Transport</h3><p>Solutions de transport et logistique interne/externe pour chaînes d’approvisionnement performantes.</p></div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator" onClick={() => scrollToSection("about")}>
          <span className="mouse"></span>
          <span>Scroll</span>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="container about-grid">
          <div ref={(el) => addRevealRef(el, 2)} className={`reveal left ${revealed[2] ? "visible" : ""}`}>
            <h2 className="section-title">Le Groupe VAN</h2>
            <p className="section-subtitle">VAN International est un groupe structuré autour d’une vision claire : développer des services essentiels avec exigence, performance et responsabilité.</p>
            <div className="bullet-list">
              <div className="bullet-item"><span className="bullet-dot"></span><div><strong>Vision</strong><p>Être un acteur de référence dans l’énergie, la construction et la logistique.</p></div></div>
              <div className="bullet-item"><span className="bullet-dot"></span><div><strong>Mission</strong><p>Fournir des solutions concrètes, fiables et durables qui soutiennent le développement économique.</p></div></div>
              <div className="bullet-item"><span className="bullet-dot"></span><div><strong>Engagement</strong><p>Mettre la sécurité, la qualité de service et la satisfaction client au centre de chaque opération.</p></div></div>
            </div>
          </div>

          <div ref={(el) => addRevealRef(el, 3)} className={`about-card reveal right ${revealed[3] ? "visible" : ""}`}>
            <p>Grâce à la complémentarité de ses activités, VAN apporte une réponse globale aux besoins d’approvisionnement, d’exécution de projets et de mobilité logistique.</p>
            <p>Cette synergie permet au groupe d’intervenir avec cohérence, efficacité et maîtrise, aussi bien sur des besoins ponctuels que sur des opérations de grande ampleur.</p>
            <button className="btn btn-primary" onClick={() => scrollToSection("activities")}>Explorer les filiales</button>
          </div>
        </div>
      </section>

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

      <section className="section metrics">
        <div className="container">
          <div ref={(el) => addRevealRef(el, 8)} className={`reveal ${revealed[8] ? "visible" : ""}`}>
            <h2 className="section-title">Des capacités au service de vos ambitions</h2>
            <p className="section-subtitle">Remplace ces données par les chiffres réels du groupe pour renforcer la crédibilité du site.</p>
          </div>

          <div className="metrics-grid">
            {metrics.map((metric, i) => (
              <div key={metric.value} ref={(el) => { addRevealRef(el, 9 + i); counterRefs.current[metric.value] = el; }} data-target={metric.value} className={`metric-box reveal ${revealed[9 + i] ? "visible" : ""}`}>
                <h3>{counts[metric.value]}+</h3>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <div ref={(el) => addRevealRef(el, 13)} className={`reveal ${revealed[13] ? "visible" : ""}`}>
            <h2 className="section-title">Réalisations et projets</h2>
            <p className="section-subtitle">Mets ici de vrais projets du groupe avec photo, lieu, date et description courte.</p>
          </div>

          <div className="projects-grid">
            {[
              ["Petroleum", "Déploiement d’un point de service", "Mise en place d’une station-service moderne avec standards d’accueil, d’approvisionnement et de sécurité."],
              ["BTP", "Construction d’infrastructure", "Réalisation d’un ouvrage avec suivi technique, coordination chantier et respect des contraintes de délai."],
              ["Logistique", "Optimisation d’une chaîne logistique", "Structuration des flux de transport et amélioration de la circulation des marchandises entre plusieurs points d’activité."],
            ].map(([label, title, text], i) => (
              <article key={title} ref={(el) => addRevealRef(el, 14 + i)} className={`project-card reveal ${revealed[14 + i] ? "visible" : ""}`}>
                <div className="project-image"><span className="project-label">{label}</span></div>
                <div className="project-body">
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a className="card-link" href="#contact">Voir le projet →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section values" id="values">
        <div className="container">
          <div ref={(el) => addRevealRef(el, 17)} className={`reveal ${revealed[17] ? "visible" : ""}`}>
            <h2 className="section-title">Nos valeurs</h2>
            <p className="section-subtitle">Une culture d’entreprise fondée sur l’exigence, la responsabilité et la constance.</p>
          </div>
          <div className="values-grid">
            {values.map((item, i) => (
              <div key={item.title} ref={(el) => addRevealRef(el, 18 + i)} className={`value-card reveal ${revealed[18 + i] ? "visible" : ""}`}>
                <div className="value-icon">{item.n}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="container contact-grid">
          <div ref={(el) => addRevealRef(el, 22)} className={`contact-info reveal left ${revealed[22] ? "visible" : ""}`}>
            <h3>Parlons de votre projet</h3>
            <div className="info-block"><strong>Groupe</strong><span>VAN International Group</span></div>
            <div className="info-block"><strong>Email</strong><span>contact@van-group.com</span></div>
            <div className="info-block"><strong>Téléphone</strong><span>+237 6 XX XX XX XX</span></div>
            <div className="info-block"><strong>Adresse</strong><span>Yaoundé, Cameroun</span></div>
            <div className="info-block"><strong>Domaines</strong><span>Énergie • BTP • Logistique & Transport</span></div>
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

      <footer>
        <div className="container footer-wrap">
          <p>© 2026 VAN International Group. Tous droits réservés.</p>
          <div className="footer-links">
            <a href="#about">Le Groupe</a>
            <a href="#activities">Activités</a>
            <a href="#projects">Projets</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
