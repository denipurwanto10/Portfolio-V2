import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { X, ArrowUpRight } from 'lucide-react';
import {
  HazardSectionLabel,
  HazardTagChip,
  HazardStripeCorner,
  HazardSectionTopLine,
  HazardBgDecoration,
  HazardCrosshair,
} from './Warningdecorations';

/* ── Tag colors ── */
const TAG_COLORS: Record<string, string> = {
  html: '#E34F26', css: '#1572B6', javascript: '#F7DF1E',
  bootstrap: '#7952B3', php: '#777BB4', codeigniter: '#EE4623',
  mysql: '#447A9B', 'node.js': '#339933', 'leaflet.js': '#199900',
  'restful api': '#FF6C37', jquery: '#0769AD', java: '#007396',
  swing: '#D07722', jdbc: '#005F87', figma: '#F24E1E',
};
const getTagColor = (tag: string) => TAG_COLORS[tag.toLowerCase()] ?? '#888';

/* ── Data ── */
const projects = [
  {
    src: '/images/projects/figma.webp',
    title: 'UI/UX Wisata Apps',
    short: 'Mobile UI/UX design for a tourism app called Treveler.',
    full: 'A comprehensive mobile UI/UX design for a tourism application called "Treveler". Features intuitive navigation, destination exploration, booking system, and interactive maps. Designed with a seamless user experience and modern design principles.',
    link: 'https://www.figma.com/design/Zep20sG4qB5vddS4m66SFc/UI-UX-Wisata-Apps?node-id=188-3102',
    tags: ['Figma'],
  },
  {
    src: '/images/projects/proyek4.webp',
    title: 'UMKM V1',
    short: 'Web app for MSME data management built with CodeIgniter 3.',
    full: 'A complete web application for managing UMKM data built using CodeIgniter 3. Features include data management, PDF export, approval workflows, and role-based access control with secure authentication.',
    link: 'https://github.com/denipurwanto10/Website-UMKM-V1/tree/main',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap', 'Codeigniter', 'MySQL', 'JQuery'],
  },
  {
    src: '/images/projects/proyek5.webp',
    title: 'UMKM V2',
    short: 'Enhanced MSME system with REST API and Leaflet.js maps.',
    full: 'Enhanced version of the MSME management system with REST API built on Node.js, SQL injection protection, and Leaflet.js for geographical visualization. Includes real-time updates and advanced reporting.',
    link: 'https://github.com/denipurwanto10/Website-UMKM-V2',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap', 'Codeigniter', 'MySQL', 'Node.js', 'Leaflet.js', 'RESTful API', 'JQuery'],
  },
  {
    src: '/images/projects/proyek2.webp',
    title: 'Pet Clinic',
    short: 'Web-based pet clinic management system.',
    full: 'A comprehensive pet clinic management system for veterinary operations. Manages medical records, appointments, vaccination tracking, prescription management, and automated reminders.',
    link: 'https://github.com/denipurwanto10/petclinic',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap', 'MySQL'],
  },
  {
    src: '/images/projects/proyek1.webp',
    title: 'Cat Shop',
    short: 'E-commerce platform for pet supplies built with CodeIgniter.',
    full: 'Feature-rich e-commerce platform for pet supplies including food, accessories, and healthcare. Built with CodeIgniter 3, featuring shopping cart, inventory management, order processing, and payment integration.',
    link: 'https://github.com/denipurwanto10/catshop',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Bootstrap', 'Codeigniter', 'MySQL'],
  },
  {
    src: '/images/projects/proyek6.webp',
    title: 'Populace GIS',
    short: 'Geospatial Information System for citizen data management.',
    full: 'Sophisticated web-based GIS for comprehensive citizen data management with interactive map visualization. Features spatial analysis, demographic mapping, population density visualization, and export functionality.',
    link: 'https://github.com/denipurwanto10/GisPenduduk',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
  },
];

/* ── Projects Section ── */
const Projects = () => {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const [visible, setVisible] = useState(6);

  useEffect(() => { if (window.innerWidth < 640) setVisible(3); }, []);
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  // Ref untuk modal content
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside dengan lebih aman
  const handleBackdropClick = (e: ReactMouseEvent) => {
    // Pastikan klik benar-benar pada backdrop, bukan pada modal content
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setSelected(null);
    }
  };

  return (
    <section id="projects" className="relative py-24" style={{ background: 'var(--surface-0)' }}>
      <style>{`
        .hz-project-card {
          overflow: hidden;
          border-radius: 16px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          height: 100%;
          background: var(--surface-2);
          border: 1px solid var(--border-subtle);
          position: relative;
          cursor: pointer;
        }
        .hz-project-card:hover {
          border-color: rgba(200,241,53,0.35);
          box-shadow: 0 0 0 1px rgba(200,241,53,0.12), 0 8px 32px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
        .hz-project-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px; z-index: 2;
          background: repeating-linear-gradient(
            90deg, #C8F135 0px, #C8F135 8px, #0a0a08 8px, #0a0a08 14px
          );
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .hz-project-card:hover .hz-project-topbar { opacity: 1; }
        .hz-project-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(200,241,53,0.04), transparent 40%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          z-index: 1;
        }
        .hz-project-card:hover::after { opacity: 1; }
        .hz-modal-content::-webkit-scrollbar { width: 4px; }
        .hz-modal-content::-webkit-scrollbar-track { background: transparent; }
        .hz-modal-content::-webkit-scrollbar-thumb {
          background: rgba(200,241,53,0.3);
          border-radius: 2px;
        }
        .hz-project-num {
          position: absolute;
          top: 10px; left: 10px;
          z-index: 3;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          color: var(--accent);
          background: rgba(10,10,8,0.75);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(200,241,53,0.3);
          border-radius: 4px;
          padding: 2px 7px;
          pointer-events: none;
        }
        .hz-stripe-corner-inner { transition: opacity 0.3s ease; }
        
        /* MODAL JUDUL FIX - PREVENT TEXT FROM DISAPPEARING */
        .hz-modal-title {
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--ink-0);
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.3;
          word-break: break-word;
          white-space: normal;
          overflow-wrap: break-word;
          width: 100%;
          display: block;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        
        /* HAZARD THEMED CLOSE BUTTON - NOT TRANSPARENT */
        .hz-modal-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #0a0a08;
          border: 1.5px solid #C8F135;
          color: #C8F135;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        
        /* Hazard stripes effect on hover */
        .hz-modal-close::before {
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
            rgba(200,241,53,0.15) 8px,
            rgba(200,241,53,0.15) 16px
          );
          transition: left 0.3s ease;
          z-index: 0;
        }
        
        .hz-modal-close:hover::before {
          left: 0;
        }
        
        .hz-modal-close:hover {
          background: #1a1a18;
          border-color: #C8F135;
          color: #C8F135;
          transform: scale(1.05);
          box-shadow: 0 0 12px rgba(200,241,53,0.3);
        }
        
        .hz-modal-close:active {
          transform: scale(0.95);
        }
        
        /* Ensure X icon stays above the hazard stripes */
        .hz-modal-close svg {
          position: relative;
          z-index: 1;
        }
        
        /* Corner hazard indicator on close button */
        .hz-modal-close::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 12px;
          height: 12px;
          background: repeating-linear-gradient(
            -45deg,
            #C8F135 0px,
            #C8F135 3px,
            #0a0a08 3px,
            #0a0a08 6px
          );
          clip-path: polygon(100% 0, 100% 100%, 0 100%);
          opacity: 0.7;
          transition: opacity 0.2s ease;
          z-index: 1;
        }
        
        .hz-modal-close:hover::after {
          opacity: 1;
        }
        
        /* Mobile styles - ensured title stays visible */
        @media (max-width: 640px) {
          .hz-modal-title {
            font-size: 0.9rem !important;
            line-height: 1.3 !important;
          }
          .hz-modal-header {
            padding: 16px !important;
            min-height: 60px !important;
          }
          .hz-modal-close {
            width: 36px;
            height: 36px;
          }
        }

        /* Desktop title size */
        @media (min-width: 641px) {
          .hz-modal-title {
            font-size: 1.1rem !important;
          }
        }

        /* Mencegah touch event propagation */
        .modal-backdrop {
          touch-action: none;
        }
        .modal-container {
          touch-action: auto;
        }
      `}</style>

      <HazardSectionTopLine />
      <HazardBgDecoration />
      <HazardCrosshair size={80} opacity={0.06} style={{ top: '5%', right: '2%' }} />

      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <HazardSectionLabel id="03">PROJECTS</HazardSectionLabel>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(0, visible).map((project, i) => (
            <motion.article key={i} className="group cursor-pointer"
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(project)}
            >
              <div
                className="hz-project-card"
                onMouseEnter={e => {
                  const el = e.currentTarget.querySelector('.hz-stripe-corner-inner') as HTMLElement | null;
                  if (el) el.style.opacity = '0.85';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget.querySelector('.hz-stripe-corner-inner') as HTMLElement | null;
                  if (el) el.style.opacity = '0.5';
                }}
              >
                <div className="hz-project-topbar" />
                <HazardStripeCorner size={44} />

                <div className="relative overflow-hidden" style={{ height: 190 }}>
                  <img
                    src={project.src} alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="hz-project-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                    style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium"
                      style={{ background: 'var(--accent)', color: '#0a0a08', fontFamily: 'var(--font-body)' }}>
                      View Details <ArrowUpRight size={12} />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="mb-1.5" style={{
                    fontFamily: 'var(--font-display)', fontSize: '0.95rem',
                    fontWeight: 700, color: 'var(--ink-1)', letterSpacing: '-0.01em',
                  }}>{project.title}</h3>
                  <p className="mb-3" style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                    fontWeight: 300, color: 'var(--ink-4)', lineHeight: 1.5,
                  }}>{project.short}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 5).map(tag => (
                      <HazardTagChip key={tag} label={tag} color={getTagColor(tag)} />
                    ))}
                    {project.tags.length > 5 && (
                      <HazardTagChip label={`+${project.tags.length - 5}`} />
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div className="mt-10 flex justify-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <a href="https://github.com/denipurwanto10" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <FaGithub size={16} />
            More on GitHub
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>

      {/* Modal - HAZARD THEMED CLOSE BUTTON */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
            style={{ 
              background: 'rgba(0,0,0,0.9)', 
              backdropFilter: 'blur(16px)',
              cursor: 'pointer',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleBackdropClick}
            onTouchStart={(e) => {
              // Untuk mobile, cegah touch event propagation jika bukan di backdrop
              if (modalRef.current && modalRef.current.contains(e.target as Node)) {
                e.stopPropagation();
              }
            }}
          >
            <motion.div
              ref={modalRef}
              className="w-full max-w-3xl modal-container"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid rgba(200,241,53,0.25)',
                borderRadius: 'var(--radius-lg)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh',
                boxShadow: '0 0 0 1px rgba(200,241,53,0.1), 0 24px 80px rgba(0,0,0,0.6)',
                cursor: 'default',
              }}
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ type: 'spring', damping: 32, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {/* Modal top stripe */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4, zIndex: 20,
                background: 'repeating-linear-gradient(90deg,#C8F135 0px,#C8F135 10px,#0a0a08 10px,#0a0a08 18px)',
                opacity: 0.8, pointerEvents: 'none',
              }} />
              
              {/* Modal corner badge */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: 60, height: 60, overflow: 'hidden', zIndex: 19, pointerEvents: 'none',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'repeating-linear-gradient(-45deg,#C8F135 0px,#C8F135 5px,#0a0a08 5px,#0a0a08 10px)',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 0)', opacity: 0.55,
                }} />
              </div>

              {/* Header - with HAZARD THEMED close button */}
              <div 
                className="hz-modal-header"
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 24px',
                  borderBottom: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--surface-2)',
                  position: 'relative',
                  zIndex: 15,
                  gap: '16px',
                  flexShrink: 0,
                  minHeight: '70px',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <div 
                    style={{
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      boxShadow: '0 0 8px rgba(200,241,53,0.5)',
                      flexShrink: 0,
                    }} 
                  />
                  <h2 className="hz-modal-title">
                    {selected.title}
                  </h2>
                </div>
                
                {/* HAZARD THEMED CLOSE BUTTON - SOLID & VISIBLE */}
                <button 
                  onClick={() => setSelected(null)}
                  className="hz-modal-close"
                  aria-label="Close modal"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="hz-modal-content" style={{ 
                padding: '24px', 
                overflowY: 'auto', 
                flex: 1,
              }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <img src={selected.src} alt={selected.title}
                      className="w-full rounded-xl object-cover"
                      style={{ border: '1px solid var(--border-subtle)', maxHeight: 240 }} />
                    {selected.link && (
                      <a href={selected.link} target="_blank" rel="noopener noreferrer"
                        className="btn btn-ghost w-full justify-center">
                        <FaGithub size={15} />
                        View Source Code
                      </a>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{ background: 'var(--surface-3)', border: '1px solid var(--border-subtle)' }}>
                      <p className="mb-2" style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                        color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase',
                      }}>Description</p>
                      <p style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                        fontWeight: 300, color: 'var(--ink-3)', lineHeight: 1.7,
                      }}>{selected.full}</p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: 'var(--surface-3)', border: '1px solid var(--border-subtle)' }}>
                      <p className="mb-3" style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                        color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase',
                      }}>Tech Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.tags.map(tag => (
                          <HazardTagChip key={tag} label={tag} color={getTagColor(tag)} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;