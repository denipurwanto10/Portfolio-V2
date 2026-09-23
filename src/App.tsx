import { useEffect, useState, type FC } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Header from './components/Header';
import ClickSpark from './components/ClickSpark';
import { ArrowUp } from 'lucide-react';

/* ── Scroll To Top ── Hazard Theme */
const ScrollToTop: FC = () => {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const check = () => {
      const modals = document.querySelectorAll('.fixed.inset-0');
      setModalOpen(
        Array.from(modals).some(m => {
          const s = window.getComputedStyle(m);
          return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0';
        })
      );
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
    return () => observer.disconnect();
  }, []);

  if (!visible || modalOpen) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="hz-scroll-top"
      style={{
        position: 'fixed',
        right: '1.25rem',
        bottom: '6rem', // Default untuk mobile
        zIndex: 40,
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        background: 'var(--surface-2)',
        color: 'var(--accent)',
        border: '1.5px solid var(--accent)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(200, 241, 53, 0.1)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
      }}
      onMouseEnter={e => {
        const btn = e.currentTarget;
        btn.style.transform = 'scale(1.08) translateY(-2px)';
        btn.style.boxShadow = '0 8px 24px rgba(200, 241, 53, 0.25), 0 0 0 2px rgba(200, 241, 53, 0.3)';
        btn.style.borderColor = '#C8F135';
      }}
      onMouseLeave={e => {
        const btn = e.currentTarget;
        btn.style.transform = 'scale(1) translateY(0)';
        btn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(200, 241, 53, 0.1)';
        btn.style.borderColor = 'var(--accent)';
      }}
    >
      {/* Top hazard stripe */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'repeating-linear-gradient(90deg, #C8F135 0px, #C8F135 6px, #0a0a08 6px, #0a0a08 12px)',
        opacity: 0.8,
        pointerEvents: 'none',
      }} />
      
      {/* Bottom hazard stripe */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'repeating-linear-gradient(90deg, #C8F135 0px, #C8F135 6px, #0a0a08 6px, #0a0a08 12px)',
        opacity: 0.8,
        pointerEvents: 'none',
      }} />
      
      {/* Corner hazard badge - top right */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '18px',
        height: '18px',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(-45deg, #C8F135 0px, #C8F135 3px, #0a0a08 3px, #0a0a08 6px)',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          opacity: 0.7,
        }} />
      </div>
      
      {/* Corner hazard badge - bottom left */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '18px',
        height: '18px',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(135deg, #C8F135 0px, #C8F135 3px, #0a0a08 3px, #0a0a08 6px)',
          clipPath: 'polygon(0 100%, 100% 100%, 0 0)',
          opacity: 0.7,
        }} />
      </div>
      
      {/* Arrow with slight glow effect */}
      <ArrowUp 
        size={18} 
        strokeWidth={2.5}
        style={{
          position: 'relative',
          zIndex: 2,
          transition: 'transform 0.2s ease',
        }}
      />
      
      {/* Hover scanline effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(200, 241, 53, 0.08) 50%, transparent 100%)',
        transform: 'translateY(-100%)',
        transition: 'transform 0.4s ease',
        pointerEvents: 'none',
        zIndex: 1,
      }} 
      className="hz-scanline"
      onMouseEnter={e => {
        const scanline = e.currentTarget;
        scanline.style.transform = 'translateY(0)';
      }}
      onMouseLeave={e => {
        const scanline = e.currentTarget;
        scanline.style.transform = 'translateY(-100%)';
      }} />
      
      {/* Add subtle CRT flicker animation and desktop-specific positioning */}
      <style>{`
        .hz-scroll-top {
          animation: hz-flicker 3s infinite;
        }
        
        @keyframes hz-flicker {
          0%, 100% { opacity: 1; }
          95% { opacity: 1; }
          96% { opacity: 0.8; }
          97% { opacity: 1; }
          98% { opacity: 0.9; }
          99% { opacity: 1; }
        }
        
        .hz-scroll-top:hover .hz-scanline {
          transform: translateY(0);
        }
        
        /* DESKTOP MODE (min-width: 1024px) - posisi lebih kebawah */
        @media (min-width: 1024px) {
          .hz-scroll-top {
            bottom: 2rem !important;
          }
        }
        
        /* Mobile mode tetap di posisi awal */
        @media (max-width: 1023px) {
          .hz-scroll-top {
            bottom: 6rem !important;
          }
        }
        
        /* Tablet landscape */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hz-scroll-top {
            bottom: 5rem !important;
          }
        }
      `}</style>
    </button>
  );
};

/* ── App ── */
const App: FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  /* Force dark mode (design is dark-only) */
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
    
    // Prevent scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Reset scroll to top
    setTimeout(() => {
      window.scrollTo(0, 0);
      setIsLoaded(true);
    }, 100);
  }, []);

  /* Disable right-click */
  useEffect(() => {
    const prevent = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', prevent);
    return () => document.removeEventListener('contextmenu', prevent);
  }, []);

  return (
    <div
      className="relative"
      style={{
        minHeight: '100vh',
        background: 'var(--surface-0)',
        color: 'var(--ink-2)',
        overflowX: 'hidden',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <ClickSpark
        sparkSize={7}
        sparkRadius={14}
        sparkCount={6}
        duration={380}
        easing="ease-out"
        extraScale={1.0}
      >
        <Header />

        <main>
          <Hero />
          <About />
          <Resume />
          <Projects />
          <Certificates />
          <Skills />
        </main>

        <Footer />
      </ClickSpark>

      <ScrollToTop />
    </div>
  );
};

export default App;