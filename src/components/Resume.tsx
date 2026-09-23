import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, GraduationCap, Briefcase } from 'lucide-react';
import {
  HazardSectionLabel,
  HazardStripeCorner,
  HazardSectionTopLine,
  HazardBgDecoration,
  HazardCrosshair,
} from './Warningdecorations';

/* ── Data ── */
interface ResumeEntry {
  logo: string;
  role: string;
  period: string;
  org: string;
  bullets?: string[];
}

const education: ResumeEntry[] = [
  {
    logo: '/images/unla.png',
    role: 'Bachelor of Informatics Engineering',
    period: 'Jul 2021 — Jun 2025',
    org: 'Langlangbuana University',
    bullets: [
      'Won second place in UI/UX Competition at HARTIK (2023)',
      'Received Outstanding Student Award certificate at the 42nd Anniversary of Langlangbuana University (2024)',
    ],
  },
  {
    logo: '/images/angkasa.png',
    role: 'Software Engineering',
    period: 'May 2018 — Jul 2021',
    org: 'Angkasa 1 Margahayu Vocational School',
  },
];

const experience: ResumeEntry[] = [
  {
    logo: '/images/esdm1.png',
    role: 'Full Stack Developer',
    period: 'Dec 2025 — Jun 2026',
    org: 'Center for Groundwater and Environmental Geology',
    bullets: [
      'Developed a laboratory management application using Laravel to support data management and equipment borrowing activities',
      'Built an internal application using Next.js to support the equipment borrowing process',
      'Developed a geospatial visualization and web mapping system for borehole data to present information in a more informative and accessible way',
    ],
  },
  {
    logo: '/images/mandiri.jpg',
    role: 'Project-Based Intern: Mobile Apps Developer',
    period: 'Nov 2025 — Dec 2025',
    org: 'PT Bank Mandiri (Persero) Tbk · Rakamin Academy',
    bullets: [
      'Developed a simple Android application by integrating a REST API to retrieve and display data',
      'Applied basic UI/UX principles and implemented JSON parsing during application development',
      'Completed a final project evaluated by Mandiri through the Rakamin Academy Virtual Internship Experience',
    ],
  },
  {
    logo: '/images/pemkab.png',
    role: 'Full Stack Developer',
    period: 'Jan 2025 — Jun 2025',
    org: 'Department of Trade and Industry, Bandung Regency',
    bullets: [
      'Developed a web-based MSME information system, improving data processing efficiency by up to 40%',
      'Integrated Leaflet.js and QGIS to build an interactive geospatial map for displaying MSME data',
      'Developed a RESTful API using Node.js, implementing parameterized queries to help improve data security',
    ],
  },
  {
    logo: '/images/unla.png',
    role: 'Laboratory Assistant',
    period: 'Aug 2022 — Jul 2024',
    org: 'Langlangbuana University',
    bullets: [
      'Guided students through programming and database practicums, including Algorithms, Database Systems, Basic Web Development, and Web Frameworks',
      'Designed and developed practicum modules aligned with the academic curriculum',
      'Coordinated practicum sessions each semester, from preparation and implementation to evaluation',
      'Maintained laboratory computers and supporting software to ensure smooth practicum activities',
    ],
  },
];

/* ── Resume Item ── */
const ResumeItem = ({ entry, index, isLast }: { entry: ResumeEntry; index: number; isLast: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="relative pl-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <style>{`
        .hz-timeline-line {
          position: absolute;
          left: 18px; top: 40px; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, rgba(200,241,53,0.25), transparent);
        }
        .hz-resume-card {
          margin-bottom: 1rem;
          border-radius: 12px;
          cursor: pointer;
          user-select: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          padding: 14px 16px;
          position: relative;
          overflow: hidden;
          background: var(--surface-2);
          border: 1px solid var(--border-subtle);
        }
        .hz-resume-card:hover {
          border-color: rgba(200,241,53,0.3) !important;
          box-shadow: 0 0 0 1px rgba(200,241,53,0.1), inset 0 0 20px rgba(200,241,53,0.03);
        }
        .hz-resume-card.open {
          border-color: rgba(200,241,53,0.35) !important;
          box-shadow: 0 0 0 1px rgba(200,241,53,0.15), inset 0 0 30px rgba(200,241,53,0.04);
        }
        /* Left accent bar on open */
        .hz-resume-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: transparent;
          transition: background 0.3s;
          border-radius: 2px 0 0 2px;
        }
        .hz-resume-card.open::before {
          background: linear-gradient(to bottom, transparent, var(--accent) 30%, var(--accent) 70%, transparent);
        }
        /* Sweep shine on hover */
        .hz-resume-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(200,241,53,0.05), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
          pointer-events: none;
        }
        .hz-resume-card:hover::after { transform: translateX(100%); }
        
        .hz-resume-icon {
          position: absolute;
          left: 0; top: 0;
          width: 36px; height: 36px;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-3);
          border: 1px solid var(--border-muted);
          flex-shrink: 0;
        }
        .hz-period-badge {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          background: var(--accent-mute);
          color: var(--accent);
          border: 1px solid rgba(200,241,53,0.25);
          border-radius: 100px;
          padding: 2px 10px;
          letter-spacing: 0.03em;
          white-space: nowrap;
          align-self: flex-start;
          position: relative;
        }
        .hz-period-badge::before {
          content: '';
          position: absolute;
          left: 8px; top: 50%;
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--accent);
          transform: translateY(-50%);
          opacity: 0.7;
        }
        .hz-bullet-marker {
          display: inline-block;
          width: 8px; height: 8px;
          border-radius: 1px;
          flex-shrink: 0;
          margin-top: 6px;
          background-image: repeating-linear-gradient(
            -45deg,
            #C8F135 0px, #C8F135 2px,
            #0a0a08 2px, #0a0a08 4px
          );
          opacity: 0.8;
        }
        .hz-stripe-corner-inner { transition: opacity 0.3s ease; }
      `}</style>

      {!isLast && <div className="hz-timeline-line" />}

      {/* Icon */}
      <div className="hz-resume-icon">
        <img src={entry.logo} alt={entry.org} className="w-7 h-7 rounded-full object-cover" />
      </div>

      {/* Card */}
      <div
        className={`hz-resume-card ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        role="button"
        aria-expanded={open}
        onMouseEnter={e => {
          const el = e.currentTarget.querySelector('.hz-stripe-corner-inner') as HTMLElement | null;
          if (el) el.style.opacity = '0.85';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget.querySelector('.hz-stripe-corner-inner') as HTMLElement | null;
          if (el) el.style.opacity = '0.5';
        }}
      >
        <HazardStripeCorner size={44} />

        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-start justify-between gap-2">
            <h4 style={{
              fontFamily: 'var(--font-display)', fontSize: '0.9rem',
              fontWeight: 700, color: 'var(--ink-1)',
              letterSpacing: '-0.01em', lineHeight: 1.3,
            }}>{entry.role}</h4>
            {entry.bullets && (
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: open ? 'var(--accent)' : 'var(--ink-4)', flexShrink: 0, marginTop: 2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="hz-period-badge" style={{ paddingLeft: 20 }}>{entry.period}</span>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.75rem',
              fontStyle: 'italic', color: 'var(--ink-4)',
            }}>{entry.org}</span>
          </div>
        </div>

        {/* Expandable bullets */}
        <AnimatePresence initial={false}>
          {open && entry.bullets && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-3 space-y-1.5 list-none relative z-10"
            >
              {entry.bullets.map((b, bi) => (
                <li key={bi} className="flex items-start gap-2.5">
                  <span className="hz-bullet-marker" />
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                    fontWeight: 300, color: 'var(--ink-4)', lineHeight: 1.6,
                  }}>{b}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ── Resume Section ── */
const Resume = () => (
  <section id="resume" className="relative py-24 overflow-hidden" style={{ background: 'var(--surface-0)' }}>
    <HazardSectionTopLine />
    <HazardBgDecoration />

    {/* Crosshair decorations */}
    <HazardCrosshair size={100} opacity={0.06} style={{ top: '10%', right: '5%' }} />
    <HazardCrosshair size={70} opacity={0.05} style={{ bottom: '15%', left: '3%' }} />

    {/* Gradient orbs */}
    <div className="absolute top-1/4 -right-24 rounded-full pointer-events-none" style={{
      width: 'min(400px,60vw)', height: 'min(400px,60vw)',
      background: 'radial-gradient(circle, rgba(200,241,53,0.07), transparent 70%)',
      filter: 'blur(40px)', zIndex: 0,
    }} />
    <div className="absolute bottom-1/4 -left-24 rounded-full pointer-events-none" style={{
      width: 'min(320px,50vw)', height: 'min(320px,50vw)',
      background: 'radial-gradient(circle, rgba(200,241,53,0.04), transparent 70%)',
      filter: 'blur(40px)', zIndex: 0,
    }} />

    <div className="container relative z-10">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <HazardSectionLabel id="02">RESUME</HazardSectionLabel>
      </motion.div>

       <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
        {/* Education */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2"
            style={{
              fontFamily: 'var(--font-display)', fontSize: '1.5rem',
              fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink-0)',
            }}
          >
            <GraduationCap size={24} strokeWidth={1.5} style={{ color: '#C8F135' }} />
            Education
          </motion.h3>
          <div className="space-y-2">
            {education.map((e, i) => (
              <ResumeItem key={i} entry={e} index={i} isLast={i === education.length - 1} />
            ))}
          </div>
        </div>

       {/* Experience */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-2"
            style={{
              fontFamily: 'var(--font-display)', fontSize: '1.5rem',
              fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink-0)',
            }}
          >
            <Briefcase size={24} strokeWidth={1.5} style={{ color: '#C8F135' }} />
            Experience
          </motion.h3>
          <div className="space-y-2">
            {experience.map((e, i) => (
              <ResumeItem key={i} entry={e} index={i} isLast={i === experience.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Resume;
