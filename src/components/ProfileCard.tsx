import { useEffect, useRef, useCallback, useMemo, memo, type CSSProperties } from 'react';

/* ─────────────────────────────────────────────
   PROFILE CARD v3.0 — HAZARD ULTRA THEME
   Gambar JELAS + 3D Tilt + Full Hazard Chrome
   With Grayscale Mini Avatar Option
───────────────────────────────────────────── */
const HAZARD_CARD_CSS = `
  @keyframes hz-pulse-border {
    0%,100% {
      box-shadow:
        0 0 0 1px rgba(200,241,53,0.22),
        inset 0 0 0 1px rgba(200,241,53,0.08);
    }
    50% {
      box-shadow:
        0 0 0 1px rgba(200,241,53,0.65),
        inset 0 0 0 1px rgba(200,241,53,0.28),
        0 0 28px rgba(200,241,53,0.14),
        0 0 60px rgba(200,241,53,0.04);
    }
  }
  @keyframes hz-corner-blink {
    0%,100% { opacity: 0.4; }
    50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(200,241,53,0.9)); }
  }
  @keyframes hz-status-dot {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.2; transform: scale(0.6); }
  }
  @keyframes hz-crosshair-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes hz-crosshair-rotate-reverse {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
  @keyframes hz-scanline-sweep {
    0% { transform: translateY(-120%); opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 1; }
    100% { transform: translateY(500%); opacity: 0; }
  }
  @keyframes hz-flicker {
    0%,97%,100% { opacity: 0.2; }
    98% { opacity: 0.06; }
    99% { opacity: 0.16; }
  }
  @keyframes hz-data-stream {
    0% { transform: translateY(-120%); opacity: 0; }
    5% { opacity: 0.9; }
    95% { opacity: 0.7; }
    100% { transform: translateY(120%); opacity: 0; }
  }
  @keyframes hz-id-glow {
    0%,100% { border-color: rgba(200,241,53,0.28); box-shadow: none; }
    50% { border-color: rgba(200,241,53,0.72); box-shadow: 0 0 14px rgba(200,241,53,0.22), inset 0 0 8px rgba(200,241,53,0.05); }
  }
  @keyframes hz-ping {
    0% { transform: scale(1); opacity: 0.7; }
    100% { transform: scale(2.8); opacity: 0; }
  }
  @keyframes hz-stripe-anim {
    0% { background-position: 0 0; }
    100% { background-position: 28px 0; }
  }

  .pc-card-wrapper {
    --card-opacity: 0.15;
    --pointer-x: 50%; --pointer-y: 50%;
    --background-x: 50%; --background-y: 50%;
    --pointer-from-center: 0;
    --pointer-from-top: 0.5; --pointer-from-left: 0.5;
    --rotate-x: 0deg; --rotate-y: 0deg;
    position: relative;
    perspective: 900px;
    border-radius: 14px;
  }

  .pc-card {
    border-radius: 14px;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateX(var(--rotate-y)) rotateY(var(--rotate-x));
    transition: transform 0.1s ease;
    cursor: default;
    overflow: hidden;
    background: #080808;
    border: 1px solid rgba(200,241,53,0.28);
    animation: hz-pulse-border 2.8s ease-in-out infinite;
  }

  .pc-shine {
    position: absolute; inset: 0; border-radius: inherit;
    background: radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      rgba(200,241,53,0.1) 10%,
      rgba(200,241,53,0.025) 40%,
      transparent 70%
    );
    mix-blend-mode: screen;
    opacity: calc(var(--pointer-from-center) * 0.5);
    pointer-events: none; z-index: 4;
  }

  .pc-glare {
    position: absolute; inset: 0; border-radius: inherit;
    background: linear-gradient(
      125deg,
      rgba(200,241,53,0.05) 0%, transparent 40%,
      transparent 60%, rgba(200,241,53,0.03) 100%
    );
    mix-blend-mode: overlay; pointer-events: none; z-index: 5;
    opacity: calc(0.2 + var(--pointer-from-center) * 0.35);
  }

  .pc-scanlines {
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      0deg, transparent 0px, transparent 2px,
      rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 3px
    );
    pointer-events: none; z-index: 6; border-radius: inherit;
    mix-blend-mode: multiply;
    animation: hz-flicker 7s step-end infinite;
  }

  .pc-scanline-sweep {
    position: absolute; left: 0; right: 0; height: 70px;
    background: linear-gradient(to bottom, transparent, rgba(200,241,53,0.04), transparent);
    pointer-events: none; z-index: 6;
    animation: hz-scanline-sweep 5s linear infinite;
  }

  .pc-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(200,241,53,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,241,53,0.025) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none; z-index: 1;
  }

  .pc-top-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 5px; z-index: 12;
    pointer-events: none;
    background: repeating-linear-gradient(
      90deg, #C8F135 0px, #C8F135 8px, rgba(0,0,0,0.92) 8px, rgba(0,0,0,0.92) 14px
    );
    opacity: 0.95;
  }

  .pc-bottom-bar {
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px; z-index: 12;
    pointer-events: none;
    background: repeating-linear-gradient(
      90deg, transparent 0px, transparent 16px, #C8F135 16px, #C8F135 22px
    );
    opacity: 0.45;
  }

  .pc-glow-border {
    position: absolute; inset: -1px; border-radius: 14px;
    box-shadow:
      inset 0 0 0 1px rgba(200,241,53,0.42),
      inset 0 0 24px rgba(200,241,53,0.06),
      0 0 0 1px rgba(200,241,53,0.18);
    z-index: 10; pointer-events: none;
    animation: hz-pulse-border 2.8s ease-in-out infinite;
  }

  .pc-bracket {
    position: absolute; width: 20px; height: 20px; z-index: 11;
    pointer-events: none;
    animation: hz-corner-blink 2.2s ease-in-out infinite;
  }
  .pc-bracket::before, .pc-bracket::after {
    content: ''; position: absolute; background: #C8F135;
    box-shadow: 0 0 8px rgba(200,241,53,0.65); border-radius: 1px;
  }
  .pc-bracket::before { width: 2px; height: 100%; }
  .pc-bracket::after  { width: 100%; height: 2px; }
  .pc-bracket-tl { top: 8px; left: 8px; animation-delay: 0s; }
  .pc-bracket-tl::before, .pc-bracket-tl::after { top: 0; left: 0; }
  .pc-bracket-tr { top: 8px; right: 8px; animation-delay: 0.55s; }
  .pc-bracket-tr::before { top: 0; right: 0; }
  .pc-bracket-tr::after  { top: 0; right: 0; }
  .pc-bracket-bl { bottom: 54px; left: 8px; animation-delay: 1.1s; }
  .pc-bracket-bl::before { bottom: 0; left: 0; }
  .pc-bracket-bl::after  { bottom: 0; left: 0; }
  .pc-bracket-br { bottom: 54px; right: 8px; animation-delay: 1.65s; }
  .pc-bracket-br::before { bottom: 0; right: 0; }
  .pc-bracket-br::after  { bottom: 0; right: 0; }

  .pc-badge-tr {
    position: absolute; top: 0; right: 0; width: 52px; height: 52px;
    overflow: hidden; z-index: 11; pointer-events: none;
  }
  .pc-badge-tr > div {
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -45deg, #C8F135 0px, #C8F135 5px, rgba(0,0,0,0.92) 5px, rgba(0,0,0,0.92) 10px
    );
    clip-path: polygon(100% 0, 100% 100%, 0 0); opacity: 0.75;
  }
  .pc-badge-bl {
    position: absolute; bottom: 0; left: 0; width: 38px; height: 38px;
    overflow: hidden; z-index: 11; pointer-events: none;
  }
  .pc-badge-bl > div {
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -45deg, #C8F135 0px, #C8F135 4px, rgba(0,0,0,0.92) 4px, rgba(0,0,0,0.92) 8px
    );
    clip-path: polygon(0 0, 0 100%, 100% 100%); opacity: 0.55;
  }

  .pc-id-label {
    position: absolute; top: 10px; left: 10px; z-index: 13;
    pointer-events: none; display: flex; align-items: center; gap: 6px;
    background: rgba(8,8,6,0.88); backdrop-filter: blur(10px);
    border: 1px solid rgba(200,241,53,0.32); border-radius: 4px;
    padding: 3px 8px;
    animation: hz-id-glow 2.5s ease-in-out infinite;
  }
  .pc-id-label-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #C8F135;
    animation: hz-status-dot 1.2s ease-in-out infinite; flex-shrink: 0;
  }
  .pc-id-ping {
    position: absolute; width: 5px; height: 5px; border-radius: 50%;
    background: rgba(200,241,53,0.5);
    animation: hz-ping 1.8s ease-out infinite;
  }
  .pc-id-label-text {
    font-family: 'Courier New', monospace; font-size: 0.57rem;
    letter-spacing: 0.12em; color: #C8F135; opacity: 0.92; text-transform: uppercase;
  }

  .pc-content .avatar {
    width: 100%; height: 100%; object-fit: cover;
    display: block; border-radius: 10px;
  }

  .pc-crosshair-outer { animation: hz-crosshair-rotate 14s linear infinite; transform-origin: 30px 30px; }
  .pc-crosshair-outer-rev { animation: hz-crosshair-rotate-reverse 9s linear infinite; transform-origin: 30px 30px; }

  .pc-user-info {
    position: absolute; bottom: 0; left: 0; right: 0;
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    padding: 10px 12px;
    background: rgba(8,8,6,0.94); backdrop-filter: blur(14px);
    border-top: 1px solid rgba(200,241,53,0.22); z-index: 100;
  }
  .pc-user-details { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
  .pc-mini-avatar {
    width: 40px; height: 40px; min-width: 40px; border-radius: 6px; overflow: hidden;
    border: 1px solid rgba(200,241,53,0.42); position: relative;
    box-shadow: 0 0 10px rgba(200,241,53,0.18); background: rgba(200,241,53,0.04);
  }
  
  /* GRAYSCALE STYLE FOR MINI AVATAR - HITAM PUTIH */
  .pc-mini-avatar-grayscale img {
    filter: grayscale(100%) contrast(1.2) brightness(1.05);
  }
  
  .pc-mini-avatar img { 
    width: 100%; height: 100%; object-fit: cover; display: block; 
  }
  
  .pc-user-text { display: flex; flex-direction: column; justify-content: center; gap: 2px; min-width: 0; }
  .pc-handle {
    font-family: 'Courier New', monospace; font-size: 0.75rem; font-weight: 700; color: #C8F135;
    letter-spacing: 0.05em; text-shadow: 0 0 10px rgba(200,241,53,0.45);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.2;
  }
  .pc-status {
    display: flex; align-items: center; gap: 5px;
    font-family: 'Courier New', monospace; font-size: 0.6rem;
    color: rgba(200,241,53,0.6); letter-spacing: 0.08em;
    text-transform: uppercase; line-height: 1.2;
  }
  .pc-status-pulse {
    width: 5px; height: 5px; border-radius: 50%; background: #C8F135; flex-shrink: 0;
    animation: hz-status-dot 1.5s ease-in-out infinite;
    box-shadow: 0 0 6px rgba(200,241,53,0.65);
    position: relative;
  }
  .pc-status-pulse::after {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    background: rgba(200,241,53,0.5); animation: hz-ping 1.8s ease-out infinite;
  }
  .pc-contact-btn {
    font-family: 'Courier New', monospace; font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; color: #080808;
    background: #C8F135; border: none; border-radius: 4px;
    padding: 7px 14px; cursor: pointer; white-space: nowrap; flex-shrink: 0;
    transition: all 0.2s ease; position: relative; overflow: hidden; z-index: 101;
    pointer-events: auto;
  }
  .pc-contact-btn::before {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(
      -45deg, transparent 0px, transparent 4px, rgba(0,0,0,0.08) 4px, rgba(0,0,0,0.08) 8px
    );
    pointer-events: none;
  }
  .pc-contact-btn:hover {
    background: #d4f540; box-shadow: 0 0 18px rgba(200,241,53,0.55); transform: scale(1.04);
  }
  .pc-contact-btn:active { transform: scale(0.96); }

  .pc-ds-line {
    font-family: 'Courier New', monospace; font-size: 9px; color: #C8F135;
    letter-spacing: 0.1em; animation: hz-data-stream 4.5s linear infinite;
    line-height: 1;
  }
  .pc-ds-line:nth-child(2n) { animation-duration: 5.8s; animation-delay: -1.2s; }
  .pc-ds-line:nth-child(3n) { animation-duration: 7s; animation-delay: -3s; color: rgba(200,241,53,0.55); }

  @media (max-width: 640px) {
    .pc-handle { font-size: 0.68rem !important; }
    .pc-status { font-size: 0.58rem !important; }
    .pc-contact-btn { font-size: 0.63rem !important; padding: 6px 10px !important; }
    .pc-mini-avatar { width: 36px !important; height: 36px !important; min-width: 36px !important; }
    .pc-user-info { gap: 8px !important; padding: 8px !important; }
  }
`;

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
};

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value: number, precision = 3) => parseFloat(value.toFixed(precision));
const adjust = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

/* Crosshair SVG */
const CrosshairSvg = ({ size = 50, opacity = 0.12, reversed = false, style: s = {} }: {
  size?: number; opacity?: number; reversed?: boolean; style?: CSSProperties;
}) => (
  <svg width={size} height={size} viewBox="0 0 60 60"
    style={{ position: 'absolute', pointerEvents: 'none', opacity, ...s }} aria-hidden>
    <g className={reversed ? 'pc-crosshair-outer-rev' : 'pc-crosshair-outer'}>
      <circle cx="30" cy="30" r="26" fill="none" stroke="#C8F135" strokeWidth="0.65" strokeDasharray="4 6" />
    </g>
    <circle cx="30" cy="30" r="14" fill="none" stroke="#C8F135" strokeWidth="0.65" strokeDasharray="2 5" />
    <circle cx="30" cy="30" r="2.5" fill="#C8F135" />
    <circle cx="30" cy="30" r="1" fill="#080808" />
    <line x1="30" y1="4" x2="30" y2="13" stroke="#C8F135" strokeWidth="1.2" />
    <line x1="30" y1="47" x2="30" y2="56" stroke="#C8F135" strokeWidth="1.2" />
    <line x1="4" y1="30" x2="13" y2="30" stroke="#C8F135" strokeWidth="1.2" />
    <line x1="47" y1="30" x2="56" y2="30" stroke="#C8F135" strokeWidth="1.2" />
  </svg>
);

interface ProfileCardProps {
  avatarUrl?: string;
  miniAvatarUrl?: string;
  name?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  onContactClick?: () => void;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Jika true, mini avatar akan tampil hitam putih (grayscale) */
  miniAvatarGrayscale?: boolean;
}

const ProfileCardComponent = ({
  avatarUrl = '',
  miniAvatarUrl,
  name = 'User',
  handle = 'javicodes',
  status = 'Online',
  contactText = 'Contact',
  onContactClick,
  showUserInfo = true,
  enableTilt = true,
  className = '',
  style: extraStyle = {},
  miniAvatarGrayscale = true, // default true agar tampil hitam putih
}: ProfileCardProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  const animationHandlers = useMemo(() => {
    if (!enableTilt) return null;
    let rafId: number | null = null;

    const updateCardTransform = (offsetX: number, offsetY: number, card: HTMLElement, wrap: HTMLElement) => {
      const width = card.clientWidth;
      const height = card.clientHeight;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const props: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
      };
      Object.entries(props).forEach(([k, v]) => wrap.style.setProperty(k, v));
    };

    const createSmoothAnimation = (duration: number, startX: number, startY: number, card: HTMLElement, wrap: HTMLElement) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;

      const loop = (now: number) => {
        const elapsed = now - startTime;
        const progress = clamp(elapsed / duration);
        const eased = easeInOutCubic(progress);
        updateCardTransform(
          adjust(eased, 0, 1, startX, targetX),
          adjust(eased, 0, 1, startY, targetY),
          card, wrap
        );
        if (progress < 1) rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    };

    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } },
    };
  }, [enableTilt]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    const rect = card.getBoundingClientRect();
    animationHandlers.updateCardTransform(e.clientX - rect.left, e.clientY - rect.top, card, wrap);
  }, [animationHandlers]);

  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    animationHandlers.cancelAnimation();
    wrap.classList.add('active');
    card.classList.add('active');
  }, [animationHandlers]);

  const handlePointerLeave = useCallback((e: PointerEvent) => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    animationHandlers.createSmoothAnimation(ANIMATION_CONFIG.SMOOTH_DURATION, e.offsetX, e.offsetY, card, wrap);
    wrap.classList.remove('active');
    card.classList.remove('active');
  }, [animationHandlers]);

  useEffect(() => {
    if (!enableTilt || !animationHandlers) return;
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    card.addEventListener('pointerenter', handlePointerEnter);
    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    const ix = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const iy = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    animationHandlers.updateCardTransform(ix, iy, card, wrap);
    animationHandlers.createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, ix, iy, card, wrap);

    return () => {
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
      animationHandlers.cancelAnimation();
    };
  }, [enableTilt, animationHandlers, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  // CSS class untuk mini avatar (hitam putih jika enabled)
  const miniAvatarClass = `pc-mini-avatar ${miniAvatarGrayscale ? 'pc-mini-avatar-grayscale' : ''}`;

  return (
    <>
      <style>{HAZARD_CARD_CSS}</style>
      <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={extraStyle}>
        <section ref={cardRef} className="pc-card">
          {/* Hazard grid */}
          <div className="pc-grid-bg" />

          {/* Avatar */}
          <div className="pc-content" style={{
            position: 'absolute', inset: 0,
            bottom: showUserInfo ? 58 : 0,
            pointerEvents: 'none',
          }}>
            {avatarUrl ? (
              <img className="avatar" src={avatarUrl} alt={`${name} avatar`} loading="lazy" />
            ) : (
              <div style={{
                width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(160deg, #141410 0%, #0a0a08 100%)',
              }}>
                <svg viewBox="0 0 100 120" style={{ width: 90, opacity: 0.18 }} fill="none" aria-hidden>
                  <circle cx="50" cy="38" r="26" fill="#C8F135" />
                  <rect x="20" y="64" width="60" height="40" rx="8" fill="#C8F135" />
                </svg>
              </div>
            )}
          </div>

          {/* Light layers */}
          <div className="pc-shine" />
          <div className="pc-glare" />
          <div className="pc-scanlines" />
          <div className="pc-scanline-sweep" />

          {/* Chrome elements */}
          <div className="pc-top-bar" />
          <div className="pc-bottom-bar" />
          <div className="pc-glow-border" />

          {/* Brackets */}
          <div className="pc-bracket pc-bracket-tl" />
          <div className="pc-bracket pc-bracket-tr" />
          <div className="pc-bracket pc-bracket-bl" />
          <div className="pc-bracket pc-bracket-br" />

          {/* Corner badges */}
          <div className="pc-badge-tr"><div /></div>
          <div className="pc-badge-bl"><div /></div>

          {/* Crosshairs */}
          <CrosshairSvg size={52} opacity={0.11} style={{ top: '26%', right: '5%', zIndex: 3 }} />
          <CrosshairSvg size={30} opacity={0.07} reversed style={{ top: '7%', left: '7%', zIndex: 3 }} />

          {/* Data streams */}
          <div style={{ position: 'absolute', top: 10, left: -16, display: 'flex', flexDirection: 'column', gap: 3, pointerEvents: 'none', zIndex: 2, opacity: 0.1 }} aria-hidden>
            {['01アX', '⚡BZ', '░FC2', '11KY', '▒AE9', 'イ01⚠', 'XZ▓B'].map((l, i) => (
              <div key={i} className="pc-ds-line" style={{ animationDelay: `${i * -0.42}s` }}>{l}</div>
            ))}
          </div>

          {/* ID Label */}
          <div className="pc-id-label">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div className="pc-id-ping" />
              <div className="pc-id-label-dot" />
            </div>
            <span className="pc-id-label-text">PORTFOLIO</span>
          </div>

          {/* User info bar */}
          {showUserInfo && (
            <div className="pc-user-info">
              <div className="pc-user-details">
                <div className={miniAvatarClass}>
                  <img src={miniAvatarUrl || avatarUrl} alt={`${name} mini`} loading="lazy" />
                </div>
                <div className="pc-user-text">
                  <div className="pc-handle">@{handle}</div>
                  <div className="pc-status">
                    <span className="pc-status-pulse" />
                    {status}
                  </div>
                </div>
              </div>
              <button
                className="pc-contact-btn"
                onClick={onContactClick}
                type="button"
                aria-label={`Contact ${name}`}
              >
                {contactText}
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

const ProfileCard = memo(ProfileCardComponent);
export default ProfileCard;