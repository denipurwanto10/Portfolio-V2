import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState, type HTMLAttributes } from 'react';
import { motion, AnimatePresence, type TargetAndTransition, type Transition } from 'framer-motion';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { FileText, ArrowUpRight } from 'lucide-react';
import ProfileCard from './ProfileCard';
import {
  HazardBgDecoration,
  HazardSectionTopLine,
  HazardCrosshair,
  HazardDataStream,
} from './Warningdecorations';

/* ── Rotating Text ── */
interface RotatingTextProps extends Omit<HTMLAttributes<HTMLSpanElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "children"> {
  texts: string[];
  transition?: Transition;
  initial?: TargetAndTransition | boolean;
  animate?: TargetAndTransition | boolean;
  exit?: TargetAndTransition;
  animatePresenceMode?: "wait" | "sync" | "popLayout";
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words";
  onNext?: (idx: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

interface WordElement {
  characters: string[];
  needsSpace: boolean;
}

const RotatingText = forwardRef<{ next: () => void }, RotatingTextProps>((props, ref) => {
  const {
    texts,
    transition = { type: 'spring', damping: 25, stiffness: 300 },
    initial = { y: '100%', opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: '-120%', opacity: 0 },
    animatePresenceMode = 'wait',
    rotationInterval = 3000,
    staggerDuration = 0,
    staggerFrom = 'first',
    loop = true,
    auto = true,
    splitBy = 'characters',
    onNext,
    mainClassName = '',
    splitLevelClassName = '',
    elementLevelClassName = '',
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const splitIntoCharacters = (text: string) => {
    try {
      const Segmenter = (Intl as unknown as { Segmenter?: new (locale: string, opts: { granularity: string }) => { segment(s: string): Iterable<{ segment: string }> } }).Segmenter;
      if (Segmenter) {
        const seg = new Segmenter('en', { granularity: 'grapheme' });
        return Array.from(seg.segment(text), (s: { segment: string }) => s.segment);
      }
    } catch {
      /* fallback below */
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const text = texts[currentTextIndex];
    if (splitBy === 'characters') {
      return text.split(' ').map((word: string, i: number, arr: string[]) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== arr.length - 1,
      }));
    }
    return text.split(' ').map((word: string, i: number, arr: string[]) => ({
      characters: [word],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  const getDelay = useCallback((index: number, total: number) => {
    if (staggerFrom === 'first') return index * staggerDuration;
    if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
    return Math.abs(Math.floor(total / 2) - index) * staggerDuration;
  }, [staggerFrom, staggerDuration]);

  const next = useCallback(() => {
    const nextIdx = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
    if (nextIdx !== currentTextIndex) { setCurrentTextIndex(nextIdx); onNext?.(nextIdx); }
  }, [currentTextIndex, texts.length, loop, onNext]);

  useImperativeHandle(ref, () => ({ next }));

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(next, rotationInterval);
    return () => clearInterval(id);
  }, [next, rotationInterval, auto]);

  return (
    <motion.span className={`text-rotate ${mainClassName}`} {...rest} layout transition={transition}>
      <span className="sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={false}>
        <motion.span key={currentTextIndex} className="text-rotate-inner" layout aria-hidden>
          {elements.map((wordObj: WordElement, wIdx: number, arr: WordElement[]) => {
            const prevCount = arr.slice(0, wIdx).reduce((s: number, w: WordElement) => s + w.characters.length, 0);
            const total = arr.reduce((s: number, w: WordElement) => s + w.characters.length, 0);
            return (
              <span key={wIdx} className={`text-rotate-word ${splitLevelClassName}`}>
                {wordObj.characters.map((char: string, cIdx: number) => (
                  <motion.span
                    key={cIdx}
                    initial={initial} animate={animate} exit={exit}
                    transition={{ ...transition, delay: getDelay(prevCount + cIdx, total) }}
                    className={`text-rotate-element ${elementLevelClassName}`}
                  >{char}</motion.span>
                ))}
                {wordObj.needsSpace && <span className="text-rotate-space"> </span>}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});
RotatingText.displayName = 'RotatingText';

/* ── Hero ── */
const Hero = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showPDF ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showPDF]);

  const closePDF = () => {
    setIsClosing(true);
    setTimeout(() => { setShowPDF(false); setIsClosing(false); }, 250);
  };

  const socials = [
    { href: 'https://github.com/denipurwanto10',       icon: <FaGithub />,    label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/deniiprwnt/', icon: <FaLinkedinIn />, label: 'LinkedIn' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'var(--surface-0)' }}>
      <style>{`
        @keyframes ws-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(200,241,53,0.5)}
          50%{box-shadow:0 0 0 6px rgba(200,241,53,0)}
        }
        .ws-pulse{animation:ws-pulse 2s ease-in-out infinite}
        .hero-role-pill .text-rotate-inner{
          display:inline-flex;align-items:center;
          background:var(--accent-mute);border:1px solid var(--border-accent);
          border-radius:100px;padding:5px 16px;
          font-family:var(--font-mono);font-size:0.85rem;font-weight:600;
          color:var(--accent);letter-spacing:-0.01em;
        }
        
        /* ========== DESKTOP ONLY - MENGESER GAMBAR AVATAR KE BAWAH ========== */
        @media (min-width: 769px) {
          .pc-card .pc-content .avatar {
            transform: translateY(18px) !important;
            transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1) !important;
          }
          
          .pc-card:hover .pc-content .avatar {
            transform: translateY(14px) !important;
          }
          
          .pc-card .pc-content {
            overflow: visible !important;
          }
          
          .pc-card {
            transform: none !important;
            position: relative !important;
          }
        }
        
        /* ========== MOBILE: HANYA GAMBAR AVATAR YANG DIGESER ========== */
        @media (max-width: 768px) {
          /* HANYA geser avatar, tanpa mengubah apapun */
          .pc-card .pc-content .avatar {
            transform: translateY(24px) !important;
            transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1) !important;
          }
          
          /* Pastikan gambar tidak terpotong */
          .pc-card .pc-content {
            overflow: visible !important;
          }
        }
        
        /* ========== MOBILE ONLY - PERKECIL TEKS DI PROFILE CARD ========== */
        @media(max-width: 640px){
          .pc-handle {
            font-size: 0.7rem !important;
          }
          .pc-status {
            font-size: 0.6rem !important;
          }
          .pc-contact-btn {
            font-size: 0.65rem !important;
            padding: 6px 10px !important;
          }
          .pc-mini-avatar {
            width: 36px !important;
            height: 36px !important;
            min-width: 36px !important;
          }
          .pc-user-info {
            gap: 8px !important;
            padding: 8px !important;
          }
        }
        
        @media(max-width: 480px){
          .pc-handle {
            font-size: 0.65rem !important;
          }
          .pc-status {
            font-size: 0.55rem !important;
          }
          .pc-contact-btn {
            font-size: 0.6rem !important;
            padding: 5px 8px !important;
          }
          .pc-mini-avatar {
            width: 32px !important;
            height: 32px !important;
            min-width: 32px !important;
          }
          .pc-user-info {
            gap: 6px !important;
            padding: 6px !important;
          }
          
          /* Kurangi sedikit geseran di layar sangat kecil */
          .pc-card .pc-content .avatar {
            transform: translateY(16px) !important;
          }
        }
      `}</style>

      {/* Hazard Decoration */}
      <HazardSectionTopLine />
      <HazardBgDecoration />

      {/* Crosshair Decorations */}
      <HazardCrosshair
        size={120}
        opacity={0.08}
        style={{ top: '15%', left: '5%', zIndex: 0 }}
      />
      <HazardCrosshair
        size={80}
        opacity={0.06}
        style={{ bottom: '20%', right: '8%', zIndex: 0 }}
      />
      <HazardCrosshair
        size={50}
        opacity={0.05}
        style={{ top: '40%', right: '15%', zIndex: 0 }}
      />

      {/* Data Stream Decorations */}
      <HazardDataStream
        style={{ top: '20%', left: '2%', zIndex: 0, opacity: 0.08 }}
      />
      <HazardDataStream
        style={{ bottom: '30%', right: '1%', zIndex: 0, opacity: 0.06 }}
      />
      <HazardDataStream
        style={{ top: '60%', left: '1%', zIndex: 0, opacity: 0.05 }}
      />

      {/* Additional hazard stripes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '3%',
        width: '150px',
        height: '150px',
        backgroundImage: 'repeating-linear-gradient(-45deg, rgba(200,241,53,0.04) 0px, rgba(200,241,53,0.04) 6px, transparent 6px, transparent 12px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'hz-rotate-slow 30s linear infinite',
      }} />

      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '2%',
        width: '100px',
        height: '100px',
        backgroundImage: 'repeating-linear-gradient(-45deg, rgba(200,241,53,0.03) 0px, rgba(200,241,53,0.03) 5px, transparent 5px, transparent 10px)',
        borderRadius: '16px',
        pointerEvents: 'none',
        zIndex: 0,
        animation: 'hz-rotate-slow 20s linear infinite reverse',
      }} />

      <div className="container relative z-10">
        {/* ── FLEX CONTAINER ── */}
        <div 
          className="flex flex-col md:flex-row items-center justify-between gap-12 py-20 md:py-0 min-h-screen"
        >
          {/* Left: Text */}
          <motion.div
            className="flex-1 max-w-xl text-center md:text-left"
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="mb-6" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem,7vw,5rem)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--ink-0)',
            }}>
              Deni<br/>
              <span style={{ color: 'var(--ink-3)', fontWeight: 400 }}>Purwanto</span>
            </h1>

            <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-4)', letterSpacing: '0.05em' }}>
                I'm a
              </span>  
              <RotatingText
                texts={['Software Engineer','Fullstack Developer','GIS Developer','Software Tester']}
                mainClassName="hero-role-pill"
                splitLevelClassName="overflow-hidden"
                staggerFrom="last" staggerDuration={0.02}
                initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '-110%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 380 }}
                rotationInterval={3200}
              />
            </div>

            <p className="mb-10 mx-auto md:mx-0" style={{
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              fontWeight: 300, lineHeight: 1.75, color: 'var(--ink-4)', maxWidth: '460px',
            }}>
              Informatics Engineering graduate with hands-on experience building
              scalable fullstack systems, geospatial data tools, and clean user interfaces.
            </p>

            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:scale-105"
                  style={{ background: 'var(--surface-3)', border: '1px solid var(--border-subtle)', color: 'var(--ink-3)', fontSize: '1rem' }}
                >{s.icon}</a>
              ))}
              <button onClick={() => setShowPDF(true)} className="btn btn-primary">
                <FileText size={15}/>
                Resume
                <ArrowUpRight size={14}/>
              </button>
            </div>
          </motion.div>

          {/* Right: Card */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProfileCard
              avatarUrl="/images/DSC_0139r.webp"
              miniAvatarUrl="/images/DSC_0139r.webp"
              handle="deniiprwnt"
              status="Open to Work"
              contactText="Contact Me"
              onContactClick={() => window.open('mailto:denipurwanto800@gmail.com')}
            />
          </motion.div>
        </div>
      </div>

      {/* PDF Modal */}
      <AnimatePresence>
        {(showPDF || isClosing) && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.target === e.currentTarget && closePDF()}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              className="w-full max-w-2xl overflow-hidden"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border-muted)', borderRadius: 'var(--radius-lg)' }}
            >
              <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg"
                    style={{ background: 'var(--accent-mute)', border: '1px solid var(--border-accent)' }}>
                    <FileText size={14} style={{ color: 'var(--accent)' }}/>
                  </div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink-1)' }}>
                    CV — Deni Purwanto
                  </p>
                </div>
                <button onClick={closePDF}
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 hover:bg-white/5"
                  style={{ color: 'var(--ink-4)' }} aria-label="Close">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="p-4" style={{ background: 'var(--surface-1)' }}>
                <iframe
                  src="https://docs.google.com/gview?url=https://deniiprwnt.vercel.app/images/CV%20Deni%20Purwanto.pdf&embedded=true"
                  title="Resume PDF" className="w-full border-0 rounded-xl"
                  style={{ height: '62vh' }} loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;