import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, X, ArrowUpRight } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import {
  HazardSectionLabel,
  HazardStripeCorner,
  HazardSectionTopLine,
  HazardBgDecoration,
} from './Warningdecorations';

/* ── Data ── */
const certificates = [
  { src: '/images/certificates/web-basic.webp',       alt: 'Belajar Dasar Pemrograman Javascript',                         link: 'https://www.dicoding.com/certificates/0LZ09E7Y3Z65' },
  { src: '/images/certificates/c-language.webp',      alt: 'Belajar Dasar Pemrograman C',                                  link: 'https://www.dicoding.com/certificates/07Z6V7R7JXQR' },
  { src: '/images/certificates/java-language.webp',   alt: 'Belajar Dasar Pemrograman Java',                               link: 'https://www.dicoding.com/certificates/NVP7ONKNRPR0' },
  { src: '/images/certificates/pemrograman-solid.webp', alt: 'Belajar Prinsip Pemrograman Solid',                          link: 'https://www.dicoding.com/certificates/N9ZO6NE36XG5' },
  { src: '/images/certificates/dasar-software.webp',  alt: 'Belajar Dasar Pemrograman untuk Menjadi Pengembang Software',  link: 'https://www.dicoding.com/certificates/07Z6VM6YWXQR' },
  { src: '/images/certificates/man-proyek.webp',      alt: 'Belajar Dasar Manajemen Proyek',                               link: 'https://www.dicoding.com/certificates/EYX46M595PDL' },
  { src: '/images/certificates/dasar-sql.webp',       alt: 'Belajar Dasar SQL',                                            link: 'https://www.dicoding.com/certificates/81P23MWWQXOY' },
  { src: '/images/certificates/aslab2.webp',          alt: 'Asisten Laboratorium — Pemrograman Web & Framework' },
  { src: '/images/certificates/aslab1.webp',          alt: 'Asisten Laboratorium — Algoritma & Basis Data' },
  { src: '/images/certificates/hartik2.webp',         alt: 'Lomba UI/UX HARTIK 2022' },
  { src: '/images/certificates/piagam.webp',          alt: 'Piagam Penghargaan Mahasiswa Berprestasi' },
];

/* ── Certificates Section ── */
const Certificates = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (window.innerWidth < 640) setVisible(3); }, []);
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => { setVisible(v => v + 3); setLoading(false); }, 400);
  };

  return (
    <section id="certificates" className="relative py-24" style={{ background: 'var(--surface-0)' }}>
      <style>{`
        .hz-cert-card {
          background: var(--surface-2);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          aspect-ratio: 4/3;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .hz-cert-card:hover {
          border-color: rgba(200,241,53,0.4);
          box-shadow: 0 0 0 1px rgba(200,241,53,0.12), 0 6px 28px rgba(0,0,0,0.35);
          transform: translateY(-2px);
        }
        .hz-cert-topbar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 3;
          background: repeating-linear-gradient(
            90deg, #C8F135 0px, #C8F135 8px, #0a0a08 8px, #0a0a08 14px
          );
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .hz-cert-card:hover .hz-cert-topbar { opacity: 1; }

        /* Subtle CRT on image */
        .hz-cert-crt {
          position: absolute; inset: 0; z-index: 2;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px
          );
        }
        /* Cert index badge */
        .hz-cert-badge {
          position: absolute; top: 8px; left: 8px; z-index: 4;
          font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.08em;
          color: var(--accent);
          background: rgba(10,10,8,0.8);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(200,241,53,0.3);
          border-radius: 3px;
          padding: 2px 6px;
          pointer-events: none;
        }
        .hz-stripe-corner-inner { transition: opacity 0.3s ease; }
        
        /* HAZARD THEMED MODAL STYLES - Enhanced Responsive */
        .hz-modal-lightbox {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          cursor: pointer;
        }
        
        .hz-modal-container {
          position: relative;
          background: var(--surface-2);
          border: 1px solid rgba(200, 241, 53, 0.3);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 0 0 1px rgba(200, 241, 53, 0.1), 0 24px 80px rgba(0, 0, 0, 0.6);
          cursor: default;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* HAZARD THEMED CLOSE BUTTON - Desktop */
        .hz-cert-close {
          position: absolute;
          top: -48px;
          right: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #0a0a08;
          border: 1.5px solid #C8F135;
          border-radius: 8px;
          color: #C8F135;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.05em;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
          z-index: 10;
        }
        
        .hz-cert-close::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 8px,
            rgba(200, 241, 53, 0.15) 8px,
            rgba(200, 241, 53, 0.15) 16px
          );
          transition: left 0.3s ease;
          z-index: 0;
          border-radius: 8px;
        }
        
        .hz-cert-close:hover::before {
          left: 0;
        }
        
        .hz-cert-close:hover {
          background: #1a1a18;
          border-color: #C8F135;
          color: #C8F135;
          transform: scale(1.05);
          box-shadow: 0 0 12px rgba(200, 241, 53, 0.3);
        }
        
        .hz-cert-close:active {
          transform: scale(0.98);
        }
        
        .hz-cert-close svg,
        .hz-cert-close span {
          position: relative;
          z-index: 1;
        }
        
        /* Modal top hazard stripe */
        .hz-modal-stripe {
          position: absolute;
          top: -6px;
          left: 0;
          right: 0;
          height: 3px;
          border-radius: 2px;
          background: repeating-linear-gradient(
            90deg,
            #C8F135 0px,
            #C8F135 10px,
            #0a0a08 10px,
            #0a0a08 18px
          );
          opacity: 0.8;
          pointer-events: none;
        }
        
        /* Modal corner hazard badge */
        .hz-modal-corner {
          position: absolute;
          top: 0;
          right: 0;
          width: 50px;
          height: 50px;
          overflow: hidden;
          z-index: 5;
          pointer-events: none;
        }
        
        .hz-modal-corner-inner {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -45deg,
            #C8F135 0px,
            #C8F135 5px,
            #0a0a08 5px,
            #0a0a08 10px
          );
          clip-path: polygon(100% 0, 100% 100%, 0 0);
          opacity: 0.7;
        }
        
        /* Modal image styling - Base */
        .hz-modal-image {
          max-width: 70vw;
          max-height: 75vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          display: block;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        /* ===== RESPONSIVE BREAKPOINTS ===== */
        
        /* Tablet (768px and below) */
        @media (max-width: 768px) {
          .hz-modal-container {
            padding: 16px;
            max-width: 92vw;
            max-height: 85vh;
          }
          
          .hz-modal-image {
            max-width: 85vw;
            max-height: 70vh;
          }
          
          .hz-cert-close {
            top: -42px;
            padding: 6px 14px;
            font-size: 0.68rem;
            gap: 6px;
          }
          
          .hz-modal-corner {
            width: 40px;
            height: 40px;
          }
        }
        
        /* Mobile Landscape (640px and below) */
        @media (max-width: 640px) {
          .hz-modal-lightbox {
            padding: 0.75rem;
          }
          
          .hz-modal-container {
            padding: 12px;
            max-width: 95vw;
            max-height: 90vh;
            border-radius: 12px;
          }
          
          .hz-modal-image {
            max-width: 92vw;
            max-height: 65vh;
          }
          
          .hz-cert-close {
            top: -38px;
            right: -8px;
            padding: 5px 12px;
            font-size: 0.62rem;
            gap: 5px;
            border-width: 1.2px;
          }
          
          .hz-cert-close span {
            display: inline-block;
          }
          
          /* For very small screens, hide the text and show only icon */
          @media (max-width: 480px) {
            .hz-cert-close span {
              display: none;
            }
            
            .hz-cert-close {
              padding: 8px;
              right: 0;
              top: -36px;
            }
            
            .hz-cert-close svg {
              width: 16px;
              height: 16px;
            }
          }
          
          .hz-modal-corner {
            width: 35px;
            height: 35px;
          }
          
          .hz-modal-stripe {
            top: -4px;
            height: 2px;
          }
        }
        
        /* Small Mobile (480px and below) */
        @media (max-width: 480px) {
          .hz-modal-lightbox {
            padding: 0.5rem;
          }
          
          .hz-modal-container {
            padding: 8px;
            border-radius: 10px;
          }
          
          .hz-modal-image {
            max-width: 95vw;
            max-height: 60vh;
            border-radius: 6px;
          }
          
          .hz-cert-close {
            top: -32px;
            padding: 6px;
          }
          
          .hz-modal-corner {
            width: 30px;
            height: 30px;
          }
        }
        
        /* Desktop Large (1200px and above) - Enhance size */
        @media (min-width: 1200px) {
          .hz-modal-image {
            max-width: 60vw;
            max-height: 80vh;
          }
          
          .hz-modal-container {
            padding: 24px;
          }
        }
        
        /* Desktop Extra Large (1600px and above) */
        @media (min-width: 1600px) {
          .hz-modal-image {
            max-width: 50vw;
            max-height: 85vh;
          }
          
          .hz-modal-container {
            padding: 28px;
            border-radius: 20px;
          }
          
          .hz-cert-close {
            top: -56px;
            padding: 10px 20px;
            font-size: 0.8rem;
            gap: 10px;
          }
        }
        
        /* Handle orientation changes */
        @media (orientation: landscape) and (max-height: 600px) {
          .hz-modal-image {
            max-height: 55vh;
          }
          
          .hz-modal-container {
            max-height: 80vh;
          }
        }
      `}</style>

      <HazardSectionTopLine />
      <HazardBgDecoration />

      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <HazardSectionLabel id="04">CERTIFICATES</HazardSectionLabel>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {certificates.slice(0, visible).map((cert, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="hz-cert-card group"
              onMouseEnter={e => {
                const el = e.currentTarget.querySelector('.hz-stripe-corner-inner') as HTMLElement | null;
                if (el) el.style.opacity = '0.85';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget.querySelector('.hz-stripe-corner-inner') as HTMLElement | null;
                if (el) el.style.opacity = '0.5';
              }}
            >
              <div className="hz-cert-topbar" />
              <HazardStripeCorner size={40} />
              <div className="hz-cert-crt" />
              <div className="hz-cert-badge">{String(i + 1).padStart(2, '0')}</div>

              <img src={cert.src} alt={cert.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2"
                style={{ background: 'rgba(10,10,8,0.8)', backdropFilter: 'blur(8px)', zIndex: 5 }}
              >
                <p className="text-center px-4" style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.75rem',
                  fontWeight: 400, color: 'var(--ink-2)', lineHeight: 1.4,
                }}>{cert.alt}</p>
                <div className="flex gap-2 mt-2">
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:scale-105"
                      style={{ background: 'var(--surface-3)', border: '1px solid var(--border-muted)', color: 'var(--ink-2)' }}
                      aria-label="Open certificate">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button onClick={() => setSelected(cert.src)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:scale-105"
                    style={{ background: 'var(--accent)', color: '#0a0a08' }}
                    aria-label="Preview certificate">
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More / LinkedIn */}
        <motion.div className="mt-10 flex justify-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          {visible < certificates.length ? (
            <button onClick={loadMore} disabled={loading} className="btn btn-ghost" style={{ minWidth: 200, justifyContent: 'center' }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Loading
                </span>
              ) : <>Load More</>}
            </button>
          ) : (
            <a href="https://www.linkedin.com/in/deniiprwnt" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <FaLinkedin size={16} style={{ color: '#0A66C2' }} />
              More on LinkedIn
              <ArrowUpRight size={14} />
            </a>
          )}
        </motion.div>
      </div>

      {/* HAZARD THEMED LIGHTBOX MODAL - Enhanced Responsive */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 hz-modal-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.target === e.currentTarget && setSelected(null)}
          >
            <motion.div
              className="hz-modal-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', damping: 32, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top hazard stripe */}
              <div className="hz-modal-stripe" />
              
              {/* Corner hazard badge */}
              <div className="hz-modal-corner">
                <div className="hz-modal-corner-inner" />
              </div>
              
              {/* HAZARD THEMED CLOSE BUTTON - Responsive */}
              <button 
                onClick={() => setSelected(null)}
                className="hz-cert-close"
                aria-label="Close preview"
              >
                <X size={14} strokeWidth={2.5} />
                <span>CLOSE</span>
              </button>
              
              {/* Certificate Image */}
              <img 
                src={selected} 
                alt="Certificate preview"
                className="hz-modal-image" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;