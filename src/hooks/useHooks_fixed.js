import { useState, useEffect, useRef } from 'react';

export const useScroll = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
};

export const useMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return { menuOpen, setMenuOpen };
};

export const useIntersectionObserver = (threshold = 0.15) => {
  const [revealed, setRevealed] = useState({});
  const revealRefs = useRef([]);

  const addRevealRef = (el, index) => {
    if (el) {
      el.dataset.index = index;
      revealRefs.current[index] = el;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = entry.target.dataset.index;
          setRevealed((prev) => ({ ...prev, [index]: true }));
          observer.unobserve(entry.target);
        });
      },
      { threshold }
    );

    Object.values(revealRefs.current).forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return { revealed, addRevealRef };
};

export const useCounter = (initialCounts = {}) => {
  const [counts, setCounts] = useState(initialCounts);
  const counterRefs = useRef({});

  const addCounterRef = (el, target) => {
    if (el) {
      el.dataset.target = target;
      counterRefs.current[target] = el;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
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
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    Object.values(counterRefs.current).forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return { counts, setCounts, addCounterRef };
};
