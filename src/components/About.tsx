import { motion, type Variants } from 'framer-motion';
import { MapPin, Globe, GraduationCap, Mail } from 'lucide-react';
import {
  HazardSectionLabel,
  HazardMarqueeBar,
  HazardBgDecoration,
  HazardSectionTopLine,
} from './Warningdecorations';

/* ── Data ── */
const techStack = [
  { name: 'Selenium',    color: '#43B02A' },
  { name: 'Jira',        color: '#0052CC' },
  { name: 'Postman',     color: '#FF6C37' },
  { name: 'HTML5',       color: '#E34F26' },
  { name: 'CSS3',        color: '#1572B6' },
  { name: 'JavaScript',  color: '#F7DF1E' },
  { name: 'TypeScript',  color: '#3178C6' },
  { name: 'Tailwind',    color: '#06B6D4' },
  { name: 'React',       color: '#61DAFB' },
  { name: 'PHP',         color: '#777BB4' },
  { name: 'Node.js',     color: '#339933' },
  { name: 'Bootstrap',   color: '#7952B3' },
  { name: 'MySQL',       color: '#4479A1' },
  { name: 'CodeIgniter', color: '#EE4623' },
  { name: 'jQuery',      color: '#0769AD' },
  { name: 'Figma',       color: '#F24E1E' },
  { name: 'Java',        color: '#007396' },
  { name: 'Laravel',     color: '#FF2D20' },
  { name: 'Firebase',    color: '#FFCA28' },
];

const infoItems = [
  { icon: MapPin,        label: 'Bandung, Indonesia',             href: undefined },
  { icon: Mail,          label: 'denipurwanto800@gmail.com',      href: 'mailto:denipurwanto800@gmail.com' },
  { icon: Globe,         label: 'deniiprwnt.is-a.dev',          href: 'https://deniiprwnt.is-a.dev/' },
  { icon: GraduationCap, label: 'Informatics Engineering', href: 'https://new.unla.ac.id/' },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  }),
};

interface ProfileCardProps { avatarUrl?: string; }

/* ── Profile Card ── */
const ProfileCard = ({ avatarUrl }: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative', width: '100%', maxWidth: 300, margin: '0 auto' }}
    >
      <style>{`
        @keyframes hz-sweep-down {
          0%   { top: -60px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes hz-scan-blink {
          0%,100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes hz-corner-blink {
          0%,100% { opacity: 0.45; }
          50% { opacity: 1; filter: drop-shadow(0 0 5px rgba(200,241,53,0.9)); }
        }
        @keyframes hz-pulse-border {
          0%,100% { box-shadow: 0 0 0 1px rgba(200,241,53,0.25), inset 0 0 0 1px rgba(200,241,53,0.1); }
          50% { box-shadow: 0 0 0 1.5px rgba(200,241,53,0.7), inset 0 0 0 1px rgba(200,241,53,0.3), 0 0 30px rgba(200,241,53,0.2); }
        }
        @keyframes hz-crosshair-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hz-crosshair-rotate-reverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes hz-data-stream {
          0%   { transform: translateY(-120%); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 0.8; }
          100% { transform: translateY(120%); opacity: 0; }
        }
        @keyframes hz-glitch-x {
          0%,93%,100% { clip-path: none; transform: none; opacity:1; }
          94% { clip-path: polygon(0 18%,100% 18%,100% 33%,0 33%); transform: translateX(-5px); opacity:.85; }
          96% { clip-path: polygon(0 58%,100% 58%,100% 68%,0 68%); transform: translateX(5px); opacity:.9; }
          98% { clip-path: polygon(0 43%,100% 43%,100% 49%,0 49%); transform: translateX(-3px); }
        }
        @keyframes hz-flicker {
          0%,97%,100% { opacity: 0.22; }
          98% { opacity: 0.06; }
          99% { opacity: 0.18; }
        }
        @keyframes hz-status-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:.25; transform:scale(.65); }
        }
        @keyframes hz-id-glow {
          0%,100% { border-color: rgba(200,241,53,0.3); box-shadow: none; }
          50% { border-color: rgba(200,241,53,0.65); box-shadow: 0 0 10px rgba(200,241,53,0.18); }
        }
        .pc-scanlines-layer {
          position:absolute;inset:0;
          background:repeating-linear-gradient(0deg,transparent 0px,transparent 2px,rgba(0,0,0,0.2) 2px,rgba(0,0,0,0.2) 3px);
          z-index:6;pointer-events:none;
          animation:hz-flicker 5s step-end infinite;
        }
        .pc-vignette {
          position:absolute;inset:0;
          background:radial-gradient(ellipse 90% 90% at 50% 50%,transparent 45%,rgba(0,0,0,0.55) 100%);
          z-index:7;pointer-events:none;
        }
        .pc-glitch-layer {
          position:absolute;inset:0;z-index:8;pointer-events:none;
          animation:hz-glitch-x 7s step-end infinite;
          background:linear-gradient(0deg,rgba(200,241,53,0.04),transparent 30%,transparent 70%,rgba(200,241,53,0.03));
        }
        .pc-sweep {
          position:absolute;left:0;right:0;height:60px;z-index:9;pointer-events:none;
          background:linear-gradient(to bottom,transparent,rgba(200,241,53,0.05),transparent);
          animation:hz-sweep-down 5s linear infinite;
        }
        .pc-glow {
          position:absolute;inset:-1px;border-radius:14px;pointer-events:none;z-index:10;
          animation:hz-pulse-border 2.5s ease-in-out infinite;
        }
        .pc-top-bar {
          position:absolute;top:0;left:0;right:0;height:4px;z-index:12;pointer-events:none;
          background:repeating-linear-gradient(90deg,var(--accent) 0px,var(--accent) 8px,rgba(0,0,0,0.9) 8px,rgba(0,0,0,0.9) 14px);
          opacity:0.9;
        }
        .pc-bracket {
          position:absolute;width:18px;height:18px;z-index:11;pointer-events:none;
          animation:hz-corner-blink 2s ease-in-out infinite;
        }
        .pc-bracket::before,.pc-bracket::after { content:'';position:absolute;background:var(--accent);box-shadow:0 0 6px rgba(200,241,53,0.6); }
        .pc-bracket::before{width:2px;height:100%;}
        .pc-bracket::after{width:100%;height:2px;}
        .pc-btl{top:8px;left:8px;animation-delay:0s;}
        .pc-btr{top:8px;right:8px;animation-delay:.5s;}
        .pc-bbl{bottom:8px;left:8px;animation-delay:1s;}
        .pc-bbr{bottom:8px;right:8px;animation-delay:1.5s;}
        .pc-btl::before,.pc-btl::after{top:0;left:0;}
        .pc-btr::before{top:0;right:0;}.pc-btr::after{top:0;right:0;}
        .pc-bbl::before{bottom:0;left:0;}.pc-bbl::after{bottom:0;left:0;}
        .pc-bbr::before{bottom:0;right:0;}.pc-bbr::after{bottom:0;right:0;}
        .pc-badge-tr{position:absolute;top:0;right:0;width:52px;height:52px;overflow:hidden;z-index:11;pointer-events:none;}
        .pc-badge-tr>div{position:absolute;inset:0;background-image:repeating-linear-gradient(-45deg,var(--accent) 0px,var(--accent) 5px,rgba(0,0,0,0.9) 5px,rgba(0,0,0,0.9) 10px);clip-path:polygon(100% 0,100% 100%,0 0);opacity:.75;}
        .pc-badge-bl{position:absolute;bottom:0;left:0;width:40px;height:40px;overflow:hidden;z-index:11;pointer-events:none;}
        .pc-badge-bl>div{position:absolute;inset:0;background-image:repeating-linear-gradient(-45deg,var(--accent) 0px,var(--accent) 4px,rgba(0,0,0,0.9) 4px,rgba(0,0,0,0.9) 8px);clip-path:polygon(0 0,0 100%,100% 100%);opacity:.6;}
        .pc-id{position:absolute;bottom:10px;left:10px;z-index:13;display:flex;align-items:center;gap:6px;background:rgba(10,10,8,.85);backdrop-filter:blur(8px);border:1px solid rgba(200,241,53,0.3);border-radius:4px;padding:3px 8px;animation:hz-id-glow 2.5s ease-in-out infinite;}
        .pc-id-dot{width:5px;height:5px;border-radius:50%;background:var(--accent);animation:hz-status-dot 1.2s ease-in-out infinite;}
        .pc-id-text{font-family:var(--font-mono);font-size:.58rem;letter-spacing:.1em;color:var(--accent);}
        .pc-blinking-dot {
          position:absolute;bottom:8px;right:8px;z-index:15;
          width:6px;height:6px;border-radius:50%;
          background:var(--accent);box-shadow:0 0 8px var(--accent);
          animation:hz-scan-blink 1s ease-in-out infinite;pointer-events:none;
        }
        .pc-ch-outer { animation:hz-crosshair-rotate 12s linear infinite; transform-origin:30px 30px; }
        .pc-ch-outer-rev { animation:hz-crosshair-rotate-reverse 16s linear infinite; transform-origin:30px 30px; }
        .pc-ds-line {
          font-family:var(--font-mono);font-size:9px;color:var(--accent);letter-spacing:.08em;
          animation:hz-data-stream 4s linear infinite;line-height:1;
        }
        .pc-ds-line:nth-child(odd){animation-duration:5.2s;}
        .pc-ds-line:nth-child(3n){animation-duration:6.8s;animation-delay:-3s;}
      `}</style>

      {/* Crosshair top-right */}
      <svg width="90" height="90" viewBox="0 0 60 60"
        style={{ position:'absolute',top:-20,right:-20,opacity:0.12,zIndex:0,pointerEvents:'none' }} aria-hidden>
        <g className="pc-ch-outer">
          <circle cx="30" cy="30" r="26" fill="none" stroke="#C8F135" strokeWidth="0.75" strokeDasharray="4 6"/>
        </g>
        <circle cx="30" cy="30" r="14" fill="none" stroke="#C8F135" strokeWidth="0.75" strokeDasharray="2 4"/>
        <circle cx="30" cy="30" r="2.5" fill="#C8F135"/>
        <line x1="30" y1="4" x2="30" y2="14" stroke="#C8F135" strokeWidth="1"/>
        <line x1="30" y1="46" x2="30" y2="56" stroke="#C8F135" strokeWidth="1"/>
        <line x1="4" y1="30" x2="14" y2="30" stroke="#C8F135" strokeWidth="1"/>
        <line x1="46" y1="30" x2="56" y2="30" stroke="#C8F135" strokeWidth="1"/>
      </svg>

      {/* Crosshair bottom-left */}
      <svg width="52" height="52" viewBox="0 0 60 60"
        style={{ position:'absolute',bottom:28,left:-15,opacity:0.08,zIndex:0,pointerEvents:'none' }} aria-hidden>
        <g className="pc-ch-outer-rev">
          <circle cx="30" cy="30" r="26" fill="none" stroke="#C8F135" strokeWidth="0.75" strokeDasharray="4 6"/>
        </g>
        <circle cx="30" cy="30" r="2.5" fill="#C8F135"/>
        <line x1="30" y1="4" x2="30" y2="14" stroke="#C8F135" strokeWidth="1"/>
        <line x1="30" y1="46" x2="30" y2="56" stroke="#C8F135" strokeWidth="1"/>
        <line x1="4" y1="30" x2="14" y2="30" stroke="#C8F135" strokeWidth="1"/>
        <line x1="46" y1="30" x2="56" y2="30" stroke="#C8F135" strokeWidth="1"/>
      </svg>

      {/* Data stream left */}
      <div style={{ position:'absolute',top:10,left:-18,display:'flex',flexDirection:'column',gap:3,pointerEvents:'none',zIndex:0,opacity:0.1 }} aria-hidden>
        {['01アX','⚡BZ','░FC2','11KY','▒AE9','イ01⚠','XZ▓B','EC00'].map((l,i)=>(
          <div key={i} className="pc-ds-line" style={{ animationDelay:`${i*-0.4}s` }}>{l}</div>
        ))}
      </div>

      {/* Data stream right */}
      <div style={{ position:'absolute',bottom:10,right:-18,display:'flex',flexDirection:'column',gap:3,pointerEvents:'none',zIndex:0,opacity:0.08 }} aria-hidden>
        {['01カ░','ZZ11','BX⚡E','F00Z'].map((l,i)=>(
          <div key={i} className="pc-ds-line" style={{ animationDelay:`${i*-0.6}s` }}>{l}</div>
        ))}
      </div>

      {/* Main Image Container */}
      <div style={{
        position:'relative',overflow:'hidden',borderRadius:16,
        border:'1px solid rgba(200,241,53,0.2)',
      }}>
        {/* All overlay layers */}
        <div className="pc-scanlines-layer" />
        <div className="pc-vignette" />
        <div className="pc-glitch-layer" />
        <div className="pc-sweep" />
        <div className="pc-glow" />
        <div className="pc-top-bar" />
        <div className="pc-bracket pc-btl" />
        <div className="pc-bracket pc-btr" />
        <div className="pc-bracket pc-bbl" />
        <div className="pc-bracket pc-bbr" />
        <div className="pc-badge-tr"><div /></div>
        <div className="pc-badge-bl"><div /></div>
        <div className="pc-id">
          <div className="pc-id-dot" />
          <span className="pc-id-text">ID:DNPRWNT</span>
        </div>
        <div className="pc-blinking-dot" />

        {/* Image */}
        <div style={{ position:'relative',width:'100%',aspectRatio:'4/5',overflow:'hidden' }}>
          <img
            src={avatarUrl}
            alt="Deni Purwanto"
            style={{
              width:'100%', height:'100%',
              objectFit:'cover', objectPosition:'top',
              filter:'grayscale(100%) contrast(1.08) brightness(0.93)',
              display:'block',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ── About Section ── */
const About = () => (
  <section
    id="about"
    className="relative"
    style={{
      background: 'var(--surface-0)',
      paddingTop: 'clamp(3rem, 8vh, 6rem)',
      paddingBottom: 'clamp(3rem, 8vh, 6rem)',
    }}
  >
    <style>{`
      @keyframes hz-pulse {
        0%,100% { opacity: 0.3; }
        50% { opacity: 0.85; }
      }
      @keyframes hz-status-dot {
        0%,100% { opacity:1; transform:scale(1); }
        50% { opacity:.25; transform:scale(.65); }
      }
      .hz-info-item {
        position: relative; overflow: hidden;
      }
      .hz-info-item::after {
        content: '';
        position: absolute; inset: 0;
        background: linear-gradient(90deg, transparent, rgba(200,241,53,0.07), transparent);
        transform: translateX(-100%);
        transition: transform 0.5s ease;
        pointer-events: none;
      }
      .hz-info-item:hover::after { transform: translateX(100%); }
      .hz-bio-text {
        font-family: var(--font-body);
        font-size: clamp(0.85rem, 2vw, 0.9rem);
        font-weight: 300; line-height: 1.8; color: var(--ink-4);
        border-left: 2px solid var(--accent);
        padding-left: clamp(1rem, 2vw, 1.25rem);
        background: linear-gradient(90deg, rgba(200,241,53,0.04), transparent 80%);
        position: relative;
        transition: all 0.3s ease;
      }
      .hz-bio-text:hover {
        background: linear-gradient(90deg, rgba(200,241,53,0.08), transparent 80%);
        transform: translateX(4px);
      }
      .hz-bio-text::before {
        content: '';
        position: absolute; left: -1px; top: 0; bottom: 0; width: 2px;
        background: linear-gradient(to bottom, transparent, var(--accent) 20%, var(--accent) 80%, transparent);
        animation: hz-pulse 2s ease-in-out infinite;
      }
      .hz-stack-section { margin-top: clamp(2rem,6vh,4rem); margin-bottom: clamp(1.5rem,4vh,3rem); }
      .hz-stack-label {
        text-align: center; margin-bottom: clamp(0.75rem,2vh,1rem);
        font-family: var(--font-mono); font-size: clamp(0.6rem,1.8vw,0.68rem);
        color: var(--accent); letter-spacing: 0.2em;
        display: flex; align-items: center; justify-content: center; gap: 10px;
      }
      .hz-stack-label-dash { height: 1px; width: 20px; background: linear-gradient(90deg, transparent, var(--accent)); opacity: 0.5; }
      .hz-stack-label-dash:last-child { background: linear-gradient(90deg, var(--accent), transparent); }
      @media (max-width: 768px) {
        .hz-name-heading { font-size: 1.75rem !important; text-align: center !important; }
        .hz-info-grid { gap: 0.75rem !important; }
        .hz-info-item { padding: 0.5rem 0.75rem !important; }
      }
    `}</style>

    <HazardSectionTopLine />
    <HazardBgDecoration />

    <div className="container relative z-10" style={{
      paddingLeft: 'clamp(1rem, 4vw, 2rem)',
      paddingRight: 'clamp(1rem, 4vw, 2rem)',
    }}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <HazardSectionLabel id="01">ABOUT</HazardSectionLabel>
      </motion.div>

      <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">
        <div className="md:col-span-4 flex justify-center">
          <ProfileCard avatarUrl="/images/DSC_0139r.webp" />
        </div>

        <div className="md:col-span-8 space-y-6 lg:space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hz-name-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 5vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink-0)',
            }}
          >
            Deni Purwanto{' '}
           
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 hz-info-grid">
            {infoItems.map(({ icon: Icon, label, href }, i) => (
              <motion.div key={label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-default hz-info-item"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border-subtle)',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,241,53,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                    style={{ background: 'var(--accent-mute)', border: '1px solid rgba(200,241,53,0.2)' }}
                  >
                    <Icon size={15} style={{ color: 'var(--accent)' }} />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="text-sm transition-colors duration-150"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: 400, color: 'var(--ink-3)' }}
                      onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--accent)')}
                      onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--ink-3)')}
                    >{label}</a>
                  ) : (
                    <span className="text-sm"
                      style={{ fontFamily: 'var(--font-body)', fontWeight: 400, color: 'var(--ink-3)' }}
                    >{label}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hz-bio-text"
          >
            Full Stack Developer with 1+ year of experience building web applications and geospatial information systems for government agencies and educational institutions. Experienced in using Next.js, Laravel, Node.js, Leaflet.js, and QGIS, as well as integrating REST APIs and developing interactive data visualizations. Focused on building efficient, scalable, and user-friendly solutions, with experience improving data management efficiency by up to 40%. Familiar with AI-assisted coding tools to accelerate development, improve productivity, and support problem-solving throughout the software development process
          </motion.p>
        </div>
      </div>
    </div>

    <div className="hz-stack-section container relative z-10">
      <div className="hz-stack-label">
        <div className="hz-stack-label-dash" />
        ⚠ TECH STACK ⚠
        <div className="hz-stack-label-dash" />
      </div>
      <HazardMarqueeBar items={techStack} />
    </div>
  </section>
);

export default About;
