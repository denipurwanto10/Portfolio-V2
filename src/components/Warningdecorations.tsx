import React, { useEffect, useRef, useState, useCallback } from 'react';
 
/* ═══════════════════════════════════════════════════════════
   HAZARD DECORATION SYSTEM — INDUSTRIAL ORANGE EDITION
   Tema: Hardware Store / Industrial Brutalist
   Palet: Oranye #FF6B00 + Hitam #0D0D0D + Putih #F5F0E8
   Terinspirasi dari: Built to Last / Made to Work
═══════════════════════════════════════════════════════════ */
 
/* ─── Design Tokens ─────────────────────────────────────── */
const T = {
  orange:      '#FF6B00',
  orangeHot:   '#FF8C00',
  orangeDark:  '#CC5500',
  black:       '#0D0D0D',
  blackSoft:   '#1A1A1A',
  cream:       '#F5F0E8',
  white:       '#FFFFFF',
  gray:        '#2A2A2A',
  grayMid:     '#444444',
  grayLight:   '#888888',
  warning:     '#FFB800',
  danger:      '#FF3333',
  ok:          '#00D084',
  info:        '#0099FF',
};
 
export const HAZARD_GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Share+Tech+Mono&display=swap');
 
  /* ── Core animations ── */
  @keyframes hz-scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes hz-glitch-x {
    0%,91%,100% { clip-path: none; transform: none; opacity: 1; }
    92% { clip-path: polygon(0 12%,100% 12%,100% 28%,0 28%); transform: translateX(-8px); opacity:.85; filter: hue-rotate(15deg); }
    94% { clip-path: polygon(0 55%,100% 55%,100% 68%,0 68%); transform: translateX(8px); opacity:.9; }
    96% { clip-path: polygon(0 38%,100% 38%,100% 44%,0 44%); transform: translateX(-4px); }
    98% { clip-path: polygon(0 72%,100% 72%,100% 80%,0 80%); transform: translateX(3px); opacity:.95; }
  }
  @keyframes hz-rgb-split {
    0%,88%,100% { text-shadow: none; }
    89% { text-shadow: -4px 0 rgba(255,107,0,.8), 4px 0 rgba(255,200,0,.8); }
    91% { text-shadow: 4px 0 rgba(255,107,0,.6), -4px 0 rgba(255,200,0,.6); }
  }
  @keyframes hz-pulse-border {
    0%,100% { box-shadow: 0 0 0 1px rgba(255,107,0,.15), inset 0 0 0 1px rgba(255,107,0,.06); }
    50% {
      box-shadow:
        0 0 0 2px rgba(255,107,0,.9),
        inset 0 0 0 1px rgba(255,107,0,.3),
        0 0 24px rgba(255,107,0,.15),
        0 0 60px rgba(255,107,0,.07);
    }
  }
  @keyframes hz-data-stream {
    0% { transform: translateY(-100%); opacity: 0; }
    4% { opacity: .9; }
    94% { opacity: .7; }
    100% { transform: translateY(110%); opacity: 0; }
  }
  @keyframes hz-corner-blink {
    0%,100% { opacity: .4; }
    50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(255,107,0,1)); }
  }
  @keyframes hz-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes hz-marquee-rev {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  @keyframes hz-crosshair-rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes hz-crosshair-rotate-reverse {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
  @keyframes hz-status-dot {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: .15; transform: scale(.5); }
  }
  @keyframes hz-sweep {
    0% { transform: translateY(-80px); opacity: 0; }
    5% { opacity: 1; }
    95% { opacity: 1; }
    100% { transform: translateY(calc(100% + 80px)); opacity: 0; }
  }
  @keyframes hz-flicker {
    0%,96%,100% { opacity: 1; }
    97% { opacity: .2; }
    98% { opacity: .9; }
    99% { opacity: .4; }
  }
  @keyframes hz-grid-fade {
    0%,100% { opacity: .04; }
    50% { opacity: .09; }
  }
  @keyframes hz-radar-sweep {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
   @keyframes hz-id-glow {
    0%,100% { border-color: rgba(200,241,53,.2); box-shadow: none; }
    50% { border-color: rgba(200,241,53,.75); box-shadow: 0 0 14px rgba(200,241,53,.18), inset 0 0 8px rgba(200,241,53,.06); }
  }

  @keyframes hz-stripe-shift {
    0% { background-position: 0 0; }
    100% { background-position: 28px 0; }
  }
  @keyframes hz-ping {
    0% { transform: scale(1); opacity: .7; }
    100% { transform: scale(3); opacity: 0; }
  }
  @keyframes hz-rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes hz-hex-pulse {
    0%,100% { opacity: .04; }
    50% { opacity: .10; }
  }
  @keyframes hz-type-cursor {
    0%,100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes hz-circuit-dash {
    from { stroke-dashoffset: 200; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes hz-holo-shimmer {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(300%) skewX(-15deg); }
  }
  @keyframes hz-specbar-fill {
    from { width: 0; }
    to { width: var(--target-w); }
  }
  @keyframes hz-biohazard-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes hz-biohazard-spin-rev {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
  @keyframes hz-seg-blink {
    0%,100% { opacity: 1; }
    49% { opacity: 1; }
    50% { opacity: .15; }
    99% { opacity: .15; }
  }
  @keyframes hz-noise-shift {
    0% { transform: translate(0,0); }
    10% { transform: translate(-2%,-2%); }
    20% { transform: translate(2%,2%); }
    30% { transform: translate(-3%,1%); }
    50% { transform: translate(3%,3%); }
    100% { transform: translate(0,0); }
  }
  @keyframes hz-alert-slide {
    from { transform: translateX(120%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes hz-scan-beam {
    0%,100% { top: 0; opacity: .7; }
    50% { top: calc(100% - 2px); opacity: .5; }
  }
  @keyframes hz-code-scroll {
    from { transform: translateY(0); }
    to { transform: translateY(-50%); }
  }
  @keyframes hz-stamp-appear {
    from { opacity: 0; transform: scale(1.3) rotate(-8deg); }
    to { opacity: 1; transform: scale(1) rotate(-5deg); }
  }
`;
 
/* ── 1. HazardSectionLabel — ultra upgraded ── */
export const HazardSectionLabel = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 64 }}>
    <style>{`
      .hz-label-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 6px 14px 6px 8px;
        border: 1px solid rgba(200,241,53,0.35);
        border-radius: 4px;
        background: rgba(200,241,53,0.03);
        overflow: hidden;
        animation: hz-id-glow 3s ease-in-out infinite;
      }
      .hz-label-wrap::before {
        content: '';
        position: absolute;
        inset: 0;
        background: repeating-linear-gradient(
          90deg, transparent 0px, transparent 8px,
          rgba(200,241,53,0.025) 8px, rgba(200,241,53,0.025) 9px
        );
        pointer-events: none;
      }
      .hz-label-wrap::after {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0; width: 3px;
        background: linear-gradient(to bottom, transparent, #C8F135 30%, #C8F135 70%, transparent);
      }
      .hz-label-hazard-stripe {
        width: 20px; height: 20px; flex-shrink: 0; border-radius: 2px;
        background-image: repeating-linear-gradient(
          -45deg, #C8F135 0px, #C8F135 4px,
          rgba(0,0,0,0.85) 4px, rgba(0,0,0,0.85) 8px
        );
        border: 1px solid rgba(200,241,53,0.4);
      }
      .hz-label-dot {
        width: 6px; height: 6px; border-radius: 50%;
        background: #C8F135;
        animation: hz-status-dot 1.4s ease-in-out infinite;
        box-shadow: 0 0 0 2px rgba(200,241,53,0.2), 0 0 8px rgba(200,241,53,0.4);
        flex-shrink: 0;
      }
      .hz-label-ping {
        position: absolute;
        width: 6px; height: 6px; border-radius: 50%;
        background: rgba(200,241,53,0.5);
        animation: hz-ping 1.8s ease-out infinite;
      }
      .hz-label-text {
        font-family: var(--font-mono, 'Courier New', monospace);
        font-size: 0.68rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #C8F135;
        font-weight: 700;
        text-shadow: 0 0 10px rgba(200,241,53,0.45);
      }
      .hz-label-id {
        font-family: var(--font-mono, 'Courier New', monospace);
        font-size: 0.58rem;
        color: rgba(200,241,53,0.5);
        letter-spacing: 0.08em;
        border-left: 1px solid rgba(200,241,53,0.2);
        padding-left: 8px;
        margin-left: 2px;
      }
      .hz-label-tail {
        display: flex; align-items: center; gap: 5px;
      }
      .hz-label-tail-line {
        width: 48px; height: 1px;
        background: linear-gradient(90deg, #C8F135, transparent);
        opacity: 0.5;
      }
      .hz-label-tail-dots {
        display: flex; gap: 4px;
      }
      .hz-label-tail-dot {
        width: 3px; height: 3px; border-radius: 50%;
        background: #C8F135; opacity: 0.35;
      }
      .hz-label-tail-dot:nth-child(1) { opacity: 0.5; }
      .hz-label-tail-dot:nth-child(2) { opacity: 0.3; }
      .hz-label-tail-dot:nth-child(3) { opacity: 0.15; }
    `}</style>
    <div className="hz-label-wrap">
      <div className="hz-label-hazard-stripe" />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div className="hz-label-ping" />
        <div className="hz-label-dot" />
      </div>
      <span className="hz-label-text">{children}</span>
      {id && <span className="hz-label-id">#{id}</span>}
    </div>
    <div className="hz-label-tail">
      <div className="hz-label-tail-line" />
      <div className="hz-label-tail-dots">
        {[0, 1, 2].map(i => <div key={i} className="hz-label-tail-dot" />)}
      </div>
    </div>
  </div>
);

 
/* ── 2. HazardTagChip ── */
export const HazardTagChip = ({
  label,
  color,
  pulse = false,
}: {
  label: string;
  color?: string;
  pulse?: boolean;
}) => {
  const hex = color ?? T.orange;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '5px 12px 5px 8px',
        borderRadius: 2,
        background: `${hex}10`,
        border: `1px solid ${hex}35`,
        fontFamily: "'Share Tech Mono', 'Courier New', monospace",
        fontSize: '.65rem', letterSpacing: '.08em',
        color: hex, fontWeight: 600,
        position: 'relative', overflow: 'hidden',
        transition: 'all .2s ease',
        cursor: 'default',
        textTransform: 'uppercase' as const,
        ...(pulse ? { animation: 'hz-id-glow 2s ease-in-out infinite' } : {}),
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${hex}80`;
        el.style.background = `${hex}20`;
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = `0 4px 14px ${hex}25, 0 0 0 1px ${hex}25`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${hex}35`;
        el.style.background = `${hex}10`;
        el.style.transform = '';
        el.style.boxShadow = '';
      }}
    >
      <span style={{
        width: 8, height: 8, borderRadius: 1, flexShrink: 0,
        backgroundImage: `repeating-linear-gradient(-45deg,${hex} 0px,${hex} 2px,rgba(0,0,0,.9) 2px,rgba(0,0,0,.9) 4px)`,
        border: `1px solid ${hex}50`,
      }} />
      {label}
      <span style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(105deg, transparent 40%, ${hex}12 50%, transparent 60%)`,
        pointerEvents: 'none',
        animation: 'hz-holo-shimmer 3s ease-in-out infinite',
      }} />
    </span>
  );
};
 
/* ── 3. HazardMarqueeBar ── */
export const HazardMarqueeBar = ({
  items,
  rows = 2,
}: {
  items: { name: string; color: string }[];
  rows?: 1 | 2;
}) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ position: 'relative' }}>
      <style>{`
        @keyframes hz-mq-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes hz-mq-rev {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .hz-mq-row { display: flex; width: max-content; gap: 8px; }
        .hz-mq-row-fwd { animation: hz-mq-fwd 26s linear infinite; }
        .hz-mq-row-rev { animation: hz-mq-rev 32s linear infinite; }
        .hz-mq-end-cap {
          position: absolute; top: 0; bottom: 0; width: 40px; z-index: 2;
          /* Warna ijo stabilo / neon lemon */
          background-image: repeating-linear-gradient(
            -60deg, #CCFF0012 0px, #CCFF0012 5px, transparent 5px, transparent 11px
          );
          pointer-events: none;
        }
        .hz-mq-end-cap-left  { left: 0; border-right: 2px solid #CCFF0020; }
        .hz-mq-end-cap-right { right: 0; border-left: 2px solid #CCFF0020;
          background-image: repeating-linear-gradient(
            60deg, #CCFF0012 0px, #CCFF0012 5px, transparent 5px, transparent 11px
          );
        }
      `}</style>
      
      {/* Top hazard stripe - warna ijo stabilo */}
      <div style={{
        height: 8,
        backgroundImage: `repeating-linear-gradient(-45deg, #CCFF00 0px, #CCFF00 8px, #000000 8px, #000000 16px)`,
        opacity: .85,
      }} />
      
      <div style={{
        position: 'relative',
        background: T.blackSoft,
        borderTop: `2px solid #CCFF0040`,
        borderBottom: `2px solid #CCFF0040`,
        overflow: 'hidden',
        padding: rows === 2 ? '8px 0' : '10px 0',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div className="hz-mq-end-cap hz-mq-end-cap-left" />
        <div className="hz-mq-end-cap hz-mq-end-cap-right" />
        <div style={{
          overflow: 'hidden', paddingLeft: 50, paddingRight: 50,
          mask: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMask: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}>
          <div className="hz-mq-row hz-mq-row-fwd">
            {doubled.map((tech, i) => (
              <HazardTagChip key={i} label={tech.name} color={tech.color} />
            ))}
          </div>
        </div>
        {rows === 2 && (
          <div style={{
            overflow: 'hidden', paddingLeft: 50, paddingRight: 50,
            mask: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMask: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}>
            <div className="hz-mq-row hz-mq-row-rev">
              {doubled.map((tech, i) => (
                <HazardTagChip key={i} label={tech.name} color={tech.color} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom hazard stripe - warna ijo stabilo */}
      <div style={{
        height: 8,
        backgroundImage: `repeating-linear-gradient(-45deg, #CCFF00 0px, #CCFF00 8px, #000000 8px, #000000 16px)`,
        opacity: .85,
      }} />
    </div>
  );
};

/* ── 4. HazardBgDecoration — full-featured background ── */
export const HazardBgDecoration = () => (
  <>
    <style>{`
      .hz-grid-overlay {
        position: absolute; inset: 0; pointer-events: none; z-index: 0;
        background-image:
          linear-gradient(rgba(200,241,53,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,241,53,0.035) 1px, transparent 1px);
        background-size: 52px 52px;
        mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 100%);
        animation: hz-grid-fade 5s ease-in-out infinite;
      }
      .hz-grid-overlay-sm {
        position: absolute; inset: 0; pointer-events: none; z-index: 0;
        background-image:
          linear-gradient(rgba(200,241,53,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,241,53,0.015) 1px, transparent 1px);
        background-size: 13px 13px;
        mask-image: radial-gradient(ellipse 60% 70% at 30% 40%, black 20%, transparent 80%);
      }
      .hz-corner-bracket {
        position: absolute;
        width: clamp(32px, 4.5vw, 48px);
        height: clamp(32px, 4.5vw, 48px);
        pointer-events: none; z-index: 1;
        animation: hz-corner-blink 2.8s ease-in-out infinite;
      }
      .hz-corner-bracket::before, .hz-corner-bracket::after {
        content: ''; position: absolute;
        background: #C8F135; border-radius: 1px;
      }
      .hz-corner-tl { top: 10px; left: 10px; }
      .hz-corner-tl::before { top:0; left:0; width: 2px; height: 100%; }
      .hz-corner-tl::after  { top:0; left:0; width: 100%; height: 2px; }
      .hz-corner-tr { top: 10px; right: 10px; }
      .hz-corner-tr::before { top:0; right:0; width: 2px; height: 100%; }
      .hz-corner-tr::after  { top:0; right:0; width: 100%; height: 2px; }
      .hz-corner-bl { bottom: 10px; left: 10px; }
      .hz-corner-bl::before { bottom:0; left:0; width: 2px; height: 100%; }
      .hz-corner-bl::after  { bottom:0; left:0; width: 100%; height: 2px; }
      .hz-corner-br { bottom: 10px; right: 10px; }
      .hz-corner-br::before { bottom:0; right:0; width: 2px; height: 100%; }
      .hz-corner-br::after  { bottom:0; right:0; width: 100%; height: 2px; }
      .hz-scanline-wrap {
        position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none;
      }
      .hz-scanline-beam {
        position: absolute; left: 0; right: 0; height: 100px;
        background: linear-gradient(to bottom, transparent, rgba(200,241,53,0.025), transparent);
        animation: hz-scanline 10s linear infinite;
      }
      .hz-bg-stripe-blob {
        position: absolute; pointer-events: none;
        background-image: repeating-linear-gradient(
          -45deg,
          rgba(200,241,53,0.055) 0px, rgba(200,241,53,0.055) 3px,
          transparent 3px, transparent 10px
        );
        border-radius: 12px;
      }
      /* Radar circle decoration */
      .hz-radar-circle {
        position: absolute; border-radius: 50%; pointer-events: none;
        border: 1px solid rgba(200,241,53,0.06);
      }
      .hz-radar-sweep-arm {
        position: absolute; inset: 0; border-radius: 50%;
        background: conic-gradient(
          from 0deg,
          rgba(200,241,53,0.06) 0deg,
          rgba(200,241,53,0.01) 60deg,
          transparent 90deg
        );
        animation: hz-radar-sweep 8s linear infinite;
      }
    `}</style>

    <div className="hz-grid-overlay" />
    <div className="hz-grid-overlay-sm" />

    <div className="hz-scanline-wrap">
      <div className="hz-scanline-beam" />
    </div>

    {/* Corner brackets */}
    <div className="hz-corner-bracket hz-corner-tl" style={{ animationDelay: '0s' }} />
    <div className="hz-corner-bracket hz-corner-tr" style={{ animationDelay: '0.7s' }} />
    <div className="hz-corner-bracket hz-corner-bl" style={{ animationDelay: '1.4s' }} />
    <div className="hz-corner-bracket hz-corner-br" style={{ animationDelay: '2.1s' }} />

    {/* Diagonal stripe blobs */}
    <div className="hz-bg-stripe-blob" style={{
      bottom: 'clamp(20px,8vh,70px)', left: 'clamp(-30px,-4vw,-10px)',
      width: 'clamp(90px,16vw,140px)', height: 'clamp(90px,16vw,140px)',
      transform: 'rotate(10deg)', opacity: 0.9,
    }} />
    <div className="hz-bg-stripe-blob" style={{
      top: '12%', right: 'clamp(1%,3vw,4%)',
      width: 'clamp(60px,10vw,90px)', height: 'clamp(60px,10vw,90px)',
      transform: 'rotate(-18deg)', opacity: 0.7,
    }} />
    <div className="hz-bg-stripe-blob" style={{
      bottom: '10%', left: '0.5%',
      width: 'clamp(44px,7vw,64px)', height: 'clamp(44px,7vw,64px)',
      transform: 'rotate(30deg)', opacity: 0.55,
    }} />

    {/* Radar decoration */}
    <div style={{
      position: 'absolute', top: '8%', right: '6%',
      width: 120, height: 120,
      pointerEvents: 'none', zIndex: 0,
    }}>
      <div className="hz-radar-circle" style={{ inset: 0 }} />
      <div className="hz-radar-circle" style={{ inset: '25%' }} />
      <div className="hz-radar-circle" style={{ inset: '45%' }} />
      <div className="hz-radar-sweep-arm" />
      {/* crosshair on radar */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(200,241,53,0.08)', transform: 'translateX(-50%)' }} />
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(200,241,53,0.08)', transform: 'translateY(-50%)' }} />
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(200,241,53,0.3)' }} />
      </div>
    </div>
  </>
);

/* ── 5. HazardCrosshair — more detailed SVG reticle ── */
export const HazardCrosshair = ({
  size = 72,
  opacity = 0.2,
  color = '#C8F135',
  style: extraStyle = {},
}: {
  size?: number;
  opacity?: number;
  color?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size} height={size} viewBox="0 0 80 80"
    style={{ position: 'absolute', pointerEvents: 'none', opacity, ...extraStyle }}
    aria-hidden
  >
    <style>{`
      .hz-ch-ring1 { animation: hz-crosshair-rotate 16s linear infinite; transform-origin: 40px 40px; }
      .hz-ch-ring2 { animation: hz-crosshair-rotate-reverse 10s linear infinite; transform-origin: 40px 40px; }
      .hz-ch-ring3 { animation: hz-crosshair-rotate 24s linear infinite; transform-origin: 40px 40px; }
    `}</style>
 
    {/* Outermost ring — slow rotation */}
    <g className="hz-ch-ring1">
      <circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth=".6" strokeDasharray="4 8" />
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a} x1="40" y1="4" x2="40" y2="10" stroke={color} strokeWidth={a % 90 === 0 ? 1.5 : .8} transform={`rotate(${a},40,40)`} />
      ))}
    </g>
 
    {/* Mid ring — reverse */}
    <g className="hz-ch-ring2">
      <circle cx="40" cy="40" r="24" fill="none" stroke={color} strokeWidth=".5" strokeDasharray="3 6" />
      {[0,90,180,270].map(a => (
        <line key={a} x1="40" y1="16" x2="40" y2="22" stroke={color} strokeWidth=".7" opacity=".6" transform={`rotate(${a},40,40)`} />
      ))}
    </g>
 
    {/* Inner diamond ring */}
    <g className="hz-ch-ring3">
      <circle cx="40" cy="40" r="14" fill="none" stroke={color} strokeWidth=".5" strokeDasharray="2 4" />
    </g>
 
    {/* Static rings */}
    <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeWidth=".35" opacity=".45" />
 
    {/* Center dot + micro-ring */}
    <circle cx="40" cy="40" r="3" fill={color} />
    <circle cx="40" cy="40" r="1.2" fill="#0a0a08" />
    <circle cx="40" cy="40" r="5" fill="none" stroke={color} strokeWidth=".7" opacity=".5" />
 
    {/* Main axis lines */}
    <line x1="40" y1="2" x2="40" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="40" y1="62" x2="40" y2="78" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="2" y1="40" x2="18" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="62" y1="40" x2="78" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
 
    {/* Diagonal secondary ticks */}
    {[45,135,225,315].map(a => (
      <line key={a} x1="40" y1="32" x2="40" y2="36" stroke={color} strokeWidth=".8" opacity=".5" transform={`rotate(${a},40,40)`} />
    ))}
 
    {/* Arc segments at corners */}
    {[0,90,180,270].map(a => (
      <path key={a} d={`M 40,4 A 36,36 0 0,1 54.5,11`} fill="none" stroke={color} strokeWidth="1.2" opacity=".3" transform={`rotate(${a},40,40)`} />
    ))}
  </svg>
);

/* ── 6. HazardDataStream — vertical binary/char rain ── */
export const HazardDataStream = ({
  x = 0,
  y = 0,
  variant = 'mixed',
  style: extraStyle = {},
}: {
  x?: number;
  y?: number;
  variant?: 'katakana' | 'hex' | 'mixed';
  style?: React.CSSProperties;
}) => {
  const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ';
  const hex = '0123456789ABCDEF';
  const mixed = '01アイウエABCDEF░▒▓⚡⚠◈▲✦■□▪▫';
 
  const charset = variant === 'katakana' ? katakana : variant === 'hex' ? hex : mixed;
  const cols = Array.from({ length: 4 }, () =>
    Array.from({ length: 10 }, () => charset[Math.floor(Math.random() * charset.length)]).join('\n')
  );
 
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      display: 'flex', gap: 10,
      pointerEvents: 'none', zIndex: 0,
      ...extraStyle,
    }} aria-hidden>
      <style>{`
        .hz-ds-col {
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: 9px; letter-spacing: .08em;
          line-height: 1.55; white-space: pre;
          animation: hz-data-stream 5s linear infinite;
        }
        .hz-ds-col:nth-child(2) { animation-duration: 7s; animation-delay: -1.8s; color: rgba(200,241,53,.7); }
        .hz-ds-col:nth-child(3) { animation-duration: 4.2s; animation-delay: -3.1s; color: rgba(200,241,53,.5); }
        .hz-ds-col:nth-child(4) { animation-duration: 8s; animation-delay: -0.5s; color: rgba(200,241,53,.35); }
      `}</style>
      {cols.map((col, i) => (
        <div key={i} className="hz-ds-col" style={{ color: '#C8F135', animationDelay: `${i * -0.9}s` }}>
          {col}
        </div>
      ))}
    </div>
  );
};

/* ── 7. HazardStatusBar — bottom ticker tape ── */
export const HazardStatusBar = ({
  messages: customMessages,
}: {
  messages?: string[];
}) => {
  const defaultMessages = [
    '⚡ SYS.NOMINAL', '▶ STACK ACTIVE', '⚠ HAZARD ZONE', '✓ DEPLOY READY',
    '◈ BUILD PASS', '⚡ FULLSTACK', '▲ GEOSPATIAL', '◉ REST API',
    '⚠ CAUTION ZONE', '✦ OPEN TO WORK', '◈ NODE.JS ONLINE', '▶ LEAFLET.JS',
    '⚡ FIREBASE', '▲ NEXT.JS', '◉ TYPESCRIPT', '✦ REACT', '▲ POSTGRESQL',
  ];
  const msgs = customMessages ?? defaultMessages;
  const row1 = [...msgs, ...msgs];
  const row2 = [...msgs.slice(Math.floor(msgs.length / 2)), ...msgs.slice(0, Math.floor(msgs.length / 2)), ...msgs];
 
  return (
    <div style={{ position: 'relative', background: 'rgba(200,241,53,.025)', borderTop: '1px solid rgba(200,241,53,.15)', borderBottom: '1px solid rgba(200,241,53,.15)', overflow: 'hidden' }}>
      <style>{`
        .hz-sb-fwd { display: flex; width: max-content; animation: hz-marquee 38s linear infinite; gap: 0; }
        .hz-sb-rev { display: flex; width: max-content; animation: hz-marquee-rev 44s linear infinite; gap: 0; }
        .hz-sb-item {
          font-family: var(--font-mono, monospace);
          font-size: .6rem; letter-spacing: .14em;
          color: #C8F135; padding: 0 20px; opacity: .65;
          white-space: nowrap; display: flex; align-items: center; gap: 4px;
        }
        .hz-sb-sep { color: rgba(200,241,53,.2); font-size: .5rem; }
        .hz-sb-divider { height: 1px; background: rgba(200,241,53,.08); }
      `}</style>
 
      {/* Warning end caps */}
      {['left', 'right'].map(side => (
        <div key={side} style={{
          position: 'absolute', [side]: 0, top: 0, bottom: 0, width: 30, zIndex: 2,
          backgroundImage: `repeating-linear-gradient(${side === 'left' ? -55 : 55}deg, rgba(200,241,53,.1) 0px, rgba(200,241,53,.1) 3px, transparent 3px, transparent 8px)`,
          borderRight: side === 'left' ? '1px solid rgba(200,241,53,.1)' : undefined,
          borderLeft: side === 'right' ? '1px solid rgba(200,241,53,.1)' : undefined,
          pointerEvents: 'none',
        }} />
      ))}
 
      <div style={{ mask: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)', WebkitMask: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}>
        {/* Row 1 — forward */}
        <div style={{ padding: '4px 0' }}>
          <div className="hz-sb-fwd">
            {row1.map((msg, i) => (
              <React.Fragment key={i}>
                <div className="hz-sb-item">{msg}</div>
                <div className="hz-sb-sep">◈</div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="hz-sb-divider" />
        {/* Row 2 — reverse */}
        <div style={{ padding: '4px 0' }}>
          <div className="hz-sb-rev">
            {row2.map((msg, i) => (
              <React.Fragment key={i}>
                <div className="hz-sb-item" style={{ opacity: .45 }}>{msg}</div>
                <div className="hz-sb-sep">▪</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── 8. HazardProfileOverlay — CRT-grade photo effect ── */
export const HazardProfileOverlay = ({ id = 'ID:DNPRWNT' }: { id?: string }) => (
  <>
    <style>{`
      .hz-po-wrap { position: absolute; inset: 0; pointer-events: none; z-index: 5; border-radius: inherit; }
      .hz-po-scanlines {
        position: absolute; inset: 0;
        background: repeating-linear-gradient(
          0deg, transparent 0px, transparent 2px, rgba(0,0,0,.14) 2px, rgba(0,0,0,.14) 3px
        );
        z-index: 6; pointer-events: none; border-radius: inherit;
        mix-blend-mode: multiply; animation: hz-flicker 8s step-end infinite;
      }
      .hz-po-vignette {
        position: absolute; inset: 0;
        background: radial-gradient(ellipse 82% 82% at 50% 50%, transparent 40%, rgba(0,0,0,.65) 100%);
        z-index: 7; pointer-events: none; border-radius: inherit;
      }
      .hz-po-glitch {
        position: absolute; inset: 0; z-index: 8; pointer-events: none; border-radius: inherit;
        animation: hz-glitch-x 10s step-end infinite;
        background: linear-gradient(0deg, rgba(200,241,53,.045), transparent 20%, transparent 80%, rgba(200,241,53,.03));
        mix-blend-mode: hard-light;
      }
      /* RGB aberration overlay */
      .hz-po-rgb-r {
        position: absolute; inset: 0; z-index: 8; pointer-events: none; border-radius: inherit;
        background: rgba(255,0,80,.0); mix-blend-mode: screen;
        animation: hz-glitch-x 13s step-end infinite 3s;
      }
      .hz-po-rgb-g {
        position: absolute; inset: 0; z-index: 8; pointer-events: none; border-radius: inherit;
        background: rgba(0,255,200,.0); mix-blend-mode: screen;
        animation: hz-glitch-x 11s step-end infinite 6s;
      }
      .hz-po-glow {
        position: absolute; inset: -1px; border-radius: inherit;
        box-shadow:
          inset 0 0 0 1px rgba(200,241,53,.5),
          inset 0 0 24px rgba(200,241,53,.06),
          0 0 0 1px rgba(200,241,53,.22),
          0 0 32px rgba(200,241,53,.06);
        z-index: 10; pointer-events: none;
        animation: hz-pulse-border 2.8s ease-in-out infinite;
      }
      .hz-po-topbar {
        position: absolute; top: 0; left: 0; right: 0; height: 5px; z-index: 12;
        background: repeating-linear-gradient(
          90deg, #C8F135 0px, #C8F135 7px, rgba(0,0,0,.93) 7px, rgba(0,0,0,.93) 13px
        );
        opacity: .95;
      }
      .hz-po-bracket {
        position: absolute; width: 22px; height: 22px; z-index: 11; pointer-events: none;
        animation: hz-corner-blink 2.4s ease-in-out infinite;
      }
      .hz-po-bracket::before, .hz-po-bracket::after {
        content: ''; position: absolute; background: #C8F135;
        box-shadow: 0 0 10px rgba(200,241,53,.75); border-radius: 1px;
      }
      .hz-po-bracket::before { width: 2px; height: 100%; }
      .hz-po-bracket::after  { width: 100%; height: 2px; }
      .hz-po-btl { top: 8px; left: 8px; } .hz-po-btl::before, .hz-po-btl::after { top:0; left:0; }
      .hz-po-btr { top: 8px; right: 8px; animation-delay: .6s; } .hz-po-btr::before { top:0; right:0; } .hz-po-btr::after { top:0; right:0; }
      .hz-po-bbl { bottom: 8px; left: 8px; animation-delay: 1.2s; } .hz-po-bbl::before { bottom:0; left:0; } .hz-po-bbl::after { bottom:0; left:0; }
      .hz-po-bbr { bottom: 8px; right: 8px; animation-delay: 1.8s; } .hz-po-bbr::before { bottom:0; right:0; } .hz-po-bbr::after { bottom:0; right:0; }
      /* Corner hazard triangles */
      .hz-po-badge-tr { position: absolute; top: 0; right: 0; width: clamp(30px,7vw,56px); height: clamp(30px,7vw,56px); overflow: hidden; z-index: 11; border-radius: inherit; }
      .hz-po-badge-tr > div {
        position: absolute; inset: 0;
        background-image: repeating-linear-gradient(-45deg, #C8F135 0px, #C8F135 5px, rgba(0,0,0,.93) 5px, rgba(0,0,0,.93) 10px);
        clip-path: polygon(100% 0, 100% 100%, 0 0); opacity: .85;
      }
      .hz-po-badge-bl { position: absolute; bottom: 0; left: 0; width: clamp(24px,5vw,42px); height: clamp(24px,5vw,42px); overflow: hidden; z-index: 11; border-radius: inherit; }
      .hz-po-badge-bl > div {
        position: absolute; inset: 0;
        background-image: repeating-linear-gradient(-45deg, #C8F135 0px, #C8F135 4px, rgba(0,0,0,.93) 4px, rgba(0,0,0,.93) 8px);
        clip-path: polygon(0 0, 0 100%, 100% 100%); opacity: .65;
      }
      /* ID badge */
      .hz-po-id {
        position: absolute; bottom: 11px; left: 11px; z-index: 13;
        display: flex; align-items: center; gap: 7px;
        background: rgba(8,8,6,.9); backdrop-filter: blur(12px);
        border: 1px solid rgba(200,241,53,.3); border-radius: 4px; padding: 3px 9px;
        animation: hz-id-glow 2.8s ease-in-out infinite;
      }
      .hz-po-id-dot { width: 5px; height: 5px; border-radius: 50%; background: #C8F135; animation: hz-status-dot 1.3s ease-in-out infinite; box-shadow: 0 0 5px rgba(200,241,53,.6); }
      .hz-po-id-text { font-family: var(--font-mono, monospace); font-size: .57rem; letter-spacing: .12em; color: #C8F135; text-shadow: 0 0 8px rgba(200,241,53,.5); }
      /* Horizontal scan beam */
      .hz-po-sweep {
        position: absolute; left: 0; right: 0; height: 65px; z-index: 9; pointer-events: none;
        background: linear-gradient(to bottom, transparent, rgba(200,241,53,.035), transparent);
        animation: hz-sweep 7s linear infinite;
      }
      /* Noise pattern */
      .hz-po-noise {
        position: absolute; inset: 0; z-index: 9; pointer-events: none; border-radius: inherit;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
        background-size: 150px 150px;
        mix-blend-mode: screen; opacity: .4;
        animation: hz-noise-shift .15s steps(1) infinite;
      }
    `}</style>
    <div className="hz-po-wrap">
      <div className="hz-po-scanlines" />
      <div className="hz-po-vignette" />
      <div className="hz-po-glitch" />
      <div className="hz-po-rgb-r" />
      <div className="hz-po-rgb-g" />
      <div className="hz-po-sweep" />
      <div className="hz-po-noise" />
      <div className="hz-po-glow" />
      <div className="hz-po-topbar" />
      <div className="hz-po-bracket hz-po-btl" />
      <div className="hz-po-bracket hz-po-btr" />
      <div className="hz-po-bracket hz-po-bbl" />
      <div className="hz-po-bracket hz-po-bbr" />
      <div className="hz-po-badge-tr"><div /></div>
      <div className="hz-po-badge-bl"><div /></div>
      <div className="hz-po-id">
        <div className="hz-po-id-dot" />
        <span className="hz-po-id-text">{id}</span>
      </div>
    </div>
  </>
);

/* ── 9. HazardStripeCorner — card corner stripe ── */
export const HazardStripeCorner = ({ size = 46, position = 'top-right' }: { size?: number; position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' }) => {
  const pos = {
    'top-right': { top: 0, right: 0 },
    'top-left': { top: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
  }[position];
  const clip = {
    'top-right': 'polygon(100% 0, 100% 100%, 0 0)',
    'top-left': 'polygon(0 0, 100% 0, 0 100%)',
    'bottom-right': 'polygon(100% 0, 100% 100%, 0 100%)',
    'bottom-left': 'polygon(0 0, 0 100%, 100% 100%)',
  }[position];
  return (
    <div style={{ position: 'absolute', ...pos, width: size, height: size, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none', zIndex: 1 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(-45deg, #C8F135 0px, #C8F135 4px, #0a0a08 4px, #0a0a08 8px)',
        clipPath: clip,
        opacity: .5,
        animation: 'hz-stripe-shift 2.5s linear infinite',
      }} />
    </div>
  );
};

/* ── 10. HazardSectionTopLine — sharp section divider ── */
export const HazardSectionTopLine = () => (
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0, height: '3px', zIndex: 2, overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(90deg, transparent 0%, #C8F135 20%, #C8F135 80%, transparent 100%)',
      opacity: 0.3,
    }} />
    <div style={{
      position: 'absolute', inset: 0,
      background: 'repeating-linear-gradient(90deg, #C8F135 0px, #C8F135 3px, transparent 3px, transparent 22px)',
      opacity: 0.18,
    }} />
  </div>
);

/* ── 11. HazardBottomBar — footer stripe ── */
export const HazardBottomBar = ({
  height = 'clamp(1rem, 3vh, 2rem)',
}: {
  height?: string;
}) => (
  <div style={{
    height,
    backgroundImage: 'repeating-linear-gradient(90deg, #C8F135 0px, #C8F135 5px, transparent 5px, transparent 16px)',
    opacity: 0.22,
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to right, transparent, rgba(200,241,53,0.12) 50%, transparent)',
      animation: 'hz-stripe-shift 2s linear infinite',
    }} />
  </div>
);

/* ── 12. HazardWarningBadge — NEW: floating warning pill ── */
export const HazardWarningBadge = ({
  text,
  level = 'warn',
  style: extraStyle = {},
}: {
  text: string;
  level?: 'warn' | 'danger' | 'ok' | 'info';
  style?: React.CSSProperties;
}) => {
  const palette = {
    warn: { bg: 'rgba(200,241,53,.08)', border: 'rgba(200,241,53,.4)', text: '#C8F135', icon: '⚠' },
    danger: { bg: 'rgba(255,50,50,.08)', border: 'rgba(255,50,50,.4)', text: '#ff5555', icon: '✕' },
    ok: { bg: 'rgba(53,241,150,.08)', border: 'rgba(53,241,150,.4)', text: '#35f196', icon: '✓' },
    info: { bg: 'rgba(53,170,241,.08)', border: 'rgba(53,170,241,.4)', text: '#35AAF1', icon: '◈' },
  }[level];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '5px 13px',
      background: palette.bg,
      border: `1px solid ${palette.border}`,
      borderRadius: 4,
      fontFamily: 'var(--font-mono, monospace)',
      fontSize: '.65rem', letterSpacing: '.1em',
      color: palette.text, fontWeight: 600,
      position: 'relative', overflow: 'hidden',
      ...extraStyle,
    }}>
      <span>{palette.icon}</span>
      <span>{text}</span>
      {/* Sheen */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent, ${palette.text}08, transparent)`, pointerEvents: 'none' }} />
    </div>
  );
};

/* ── 13. HazardDivider — section separator ── */
export const HazardDivider = ({ label }: { label?: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0' }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,241,53,.3))' }} />
    {label && (
      <span style={{
        fontFamily: 'var(--font-mono, monospace)', fontSize: '.6rem', letterSpacing: '.14em',
        color: 'rgba(200,241,53,.5)', textTransform: 'uppercase',
        padding: '2px 10px', border: '1px solid rgba(200,241,53,.15)', borderRadius: 3,
      }}>{label}</span>
    )}
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(200,241,53,.3), transparent)' }} />
  </div>
);
/* ─────────────────────────────────────────────────────────────────────
   14. NEW: HazardTerminalText — typewriter + glitch renderer
───────────────────────────────────────────────────────────────────── */
export const HazardTerminalText = ({
  lines,
  color = '#C8F135',
  typingSpeed = 40,
}: {
  lines: string[];
  color?: string;
  typingSpeed?: number;
}) => {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
 
  useEffect(() => {
    if (currentLine >= lines.length) return;
    if (currentChar < lines[currentLine].length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), typingSpeed + Math.random() * 20);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed(d => [...d, lines[currentLine]]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 180);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines, typingSpeed]);
 
  const currentText = currentLine < lines.length ? lines[currentLine].slice(0, currentChar) : '';
 
  return (
    <div style={{ fontFamily: 'var(--font-mono, "Courier New", monospace)', fontSize: '.75rem', lineHeight: 1.7 }}>
      <style>{`
        .hz-term-cursor { display: inline-block; width: 7px; height: 1em; background: ${color}; animation: hz-type-cursor .9s step-end infinite; vertical-align: text-bottom; margin-left: 2px; }
        .hz-term-line { color: ${color}; opacity: .85; }
        .hz-term-line::before { content: '> '; color: ${color}; opacity: .45; }
        .hz-term-prompt { color: ${color}; }
      `}</style>
      {displayed.map((line, i) => (
        <div key={i} className="hz-term-line">{line}</div>
      ))}
      {currentLine < lines.length && (
        <div style={{ color, opacity: .9 }}>
          <span style={{ opacity: .45 }}>{'> '}</span>
          <span>{currentText}</span>
          <span className="hz-term-cursor" />
        </div>
      )}
    </div>
  );
};
 
/* ─────────────────────────────────────────────────────────────────────
   15. NEW: HazardRadarPanel — fully animated radar scope
───────────────────────────────────────────────────────────────────── */
export const HazardRadarPanel = ({
  size = 180,
  blips = [
    { angle: 45, distance: .55, label: 'TGT-01' },
    { angle: 145, distance: .75, label: 'TGT-02' },
    { angle: 260, distance: .35, label: 'TGT-03' },
  ],
  color = '#C8F135',
}: {
  size?: number;
  blips?: { angle: number; distance: number; label?: string }[];
  color?: string;
}) => {
  const r = size / 2;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <style>{`
        .hz-radar-panel-sweep {
          position: absolute; inset: 0; border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            ${color}14 0deg, ${color}03 70deg, transparent 95deg
          );
          animation: hz-radar-sweep 5s linear infinite;
        }
        .hz-radar-blip {
          position: absolute;
          width: 6px; height: 6px;
          background: ${color};
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 6px ${color}, 0 0 12px ${color}60;
          animation: hz-ping 2s ease-out infinite;
        }
      `}</style>
 
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0 }}>
        {/* Grid circles */}
        {[.25, .5, .75, 1].map(f => (
          <circle key={f} cx={r} cy={r} r={r * f} fill="none" stroke={`${color}20`} strokeWidth=".7" />
        ))}
        {/* Cross */}
        <line x1={r} y1={0} x2={r} y2={size} stroke={`${color}15`} strokeWidth=".5" />
        <line x1={0} y1={r} x2={size} y2={r} stroke={`${color}15`} strokeWidth=".5" />
        {/* Diagonals */}
        <line x1={0} y1={0} x2={size} y2={size} stroke={`${color}08`} strokeWidth=".5" />
        <line x1={size} y1={0} x2={0} y2={size} stroke={`${color}08`} strokeWidth=".5" />
        {/* Outer ring with tick marks */}
        <circle cx={r} cy={r} r={r - 2} fill="none" stroke={`${color}30`} strokeWidth="1" strokeDasharray="2 6" />
        {/* Degree markers */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 - 90) * Math.PI / 180;
          const x1 = r + (r - 6) * Math.cos(angle);
          const y1 = r + (r - 6) * Math.sin(angle);
          const x2 = r + (r - 2) * Math.cos(angle);
          const y2 = r + (r - 2) * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`${color}50`} strokeWidth="1" />;
        })}
        {/* Center dot */}
        <circle cx={r} cy={r} r={2.5} fill={color} />
        <circle cx={r} cy={r} r={1} fill="#0a0a08" />
      </svg>
 
      {/* Sweep arm */}
      <div className="hz-radar-panel-sweep" />
 
      {/* Blips */}
      {blips.map((b, i) => {
        const rad = (b.angle - 90) * Math.PI / 180;
        const bx = r + (r * b.distance) * Math.cos(rad);
        const by = r + (r * b.distance) * Math.sin(rad);
        return (
          <div key={i}>
            <div className="hz-radar-blip" style={{
              left: bx, top: by,
              animationDelay: `${i * .6}s`,
            }} />
            {b.label && (
              <span style={{
                position: 'absolute',
                left: bx + 8, top: by - 8,
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '.52rem', color,
                opacity: .7, letterSpacing: '.06em',
                textShadow: `0 0 6px ${color}60`,
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
              }}>{b.label}</span>
            )}
          </div>
        );
      })}
 
      {/* Status text */}
      <div style={{
        position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'var(--font-mono, monospace)', fontSize: '.52rem',
        color, opacity: .5, letterSpacing: '.12em', whiteSpace: 'nowrap',
      }}>RADAR ACTIVE</div>
    </div>
  );
};
 
/* ─────────────────────────────────────────────────────────────────────
   16. NEW: HazardCircuitBorder — SVG circuit-trace borders
───────────────────────────────────────────────────────────────────── */
export const HazardCircuitBorder = ({
  children,
  color = '#C8F135',
  className = '',
  style: extraStyle = {},
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div style={{ position: 'relative', ...extraStyle }} className={className}>
    <style>{`
      .hz-cb-svg {
        position: absolute; inset: 0;
        width: 100%; height: 100%;
        pointer-events: none; overflow: visible;
      }
      .hz-cb-trace {
        fill: none;
        stroke: ${color};
        stroke-width: 1;
        stroke-dasharray: 6 4;
        animation: hz-circuit-dash 2s linear infinite;
        opacity: .45;
      }
      .hz-cb-trace-fast {
        fill: none;
        stroke: ${color};
        stroke-width: .7;
        stroke-dasharray: 3 8;
        animation: hz-circuit-dash 1.4s linear infinite reverse;
        opacity: .25;
      }
      .hz-cb-dot { fill: ${color}; opacity: .6; animation: hz-status-dot 1.8s ease-in-out infinite; }
    `}</style>
    {children}
    <svg className="hz-cb-svg" preserveAspectRatio="none">
      {/* Top trace */}
      <path className="hz-cb-trace" d="M 20,0 L 80,0 L 88,8" />
      <path className="hz-cb-trace" d="M 88,8 L 96,8" />
      {/* Right trace */}
      <path className="hz-cb-trace-fast" d="M 100%,20 L 100%,60%" />
      {/* Bottom trace */}
      <path className="hz-cb-trace" d="M 0%,100% L 20%,100% L 25%,calc(100% - 8px)" />
      {/* Left trace */}
      <path className="hz-cb-trace-fast" d="M 0,30% L 0,70%" />
      {/* Corner dots */}
      <circle className="hz-cb-dot" cx="4" cy="4" r="2.5" />
      <circle className="hz-cb-dot" cx="calc(100% - 4)" cy="4" r="2.5" style={{ animationDelay: '.6s' }} />
      <circle className="hz-cb-dot" cx="4" cy="calc(100% - 4)" r="2.5" style={{ animationDelay: '1.2s' }} />
      <circle className="hz-cb-dot" cx="calc(100% - 4)" cy="calc(100% - 4)" r="2.5" style={{ animationDelay: '1.8s' }} />
    </svg>
  </div>
);
/* ─────────────────────────────────────────────────────────────────────
   17. NEW: HazardHoloCard — holographic shimmer card
───────────────────────────────────────────────────────────────────── */
export const HazardHoloCard = ({
  children,
  accentColor = '#C8F135',
  style: extraStyle = {},
}: {
  children: React.ReactNode;
  accentColor?: string;
  style?: React.CSSProperties;
}) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
 
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);
 
  const rotX = (mousePos.y - 50) * 0.12;
  const rotY = (mousePos.x - 50) * -0.12;
 
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
      style={{
        position: 'relative', overflow: 'hidden',
        border: `1px solid ${accentColor}25`,
        borderRadius: 8,
        background: 'rgba(10,10,8,.85)',
        backdropFilter: 'blur(16px)',
        transform: `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        transition: 'transform .2s ease',
        boxShadow: `0 8px 32px rgba(0,0,0,.4), inset 0 0 0 1px ${accentColor}10`,
        ...extraStyle,
      }}
    >
      {/* Holo shimmer */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${accentColor}12 0%, transparent 60%)`,
        pointerEvents: 'none', zIndex: 0,
        transition: 'background .1s ease',
      }} />
      {/* Stripe shimmer */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(
          ${45 + rotY * 2}deg,
          transparent 30%,
          ${accentColor}08 45%,
          ${accentColor}04 50%,
          transparent 65%
        )`,
        pointerEvents: 'none', zIndex: 0,
      }} />
      <HazardSectionTopLine />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      <HazardStripeCorner />
    </div>
  );
};
 
/* ─────────────────────────────────────────────────────────────────────
   18. NEW: HazardSpecBar — animated stat/skill bar
───────────────────────────────────────────────────────────────────── */
export const HazardSpecBar = ({
  label,
  value,
  max = 100,
  color = '#C8F135',
  showValue = true,
  animated = true,
}: {
  label: string;
  value: number;
  max?: number;
  color?: string;
  showValue?: boolean;
  animated?: boolean;
}) => {
  const pct = Math.min((value / max) * 100, 100);
  const [visible, setVisible] = useState(!animated);
  const ref = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    if (!animated) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: .2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [animated]);
 
  return (
    <div ref={ref} style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <span style={{
          fontFamily: 'var(--font-mono, monospace)', fontSize: '.65rem',
          letterSpacing: '.1em', color, opacity: .8, textTransform: 'uppercase',
        }}>{label}</span>
        {showValue && (
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '.63rem', color, opacity: .6 }}>
            {value}/{max}
          </span>
        )}
      </div>
      <div style={{
        height: 6, background: `${color}12`,
        border: `1px solid ${color}20`, borderRadius: 2,
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Track segments */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `repeating-linear-gradient(90deg, transparent 0px, transparent 12px, ${color}08 12px, ${color}08 13px)`,
        }} />
        {/* Fill bar */}
        <div style={{
          height: '100%',
          width: visible ? `${pct}%` : '0%',
          background: `linear-gradient(90deg, ${color}80, ${color})`,
          boxShadow: `0 0 8px ${color}60, inset 0 0 4px ${color}30`,
          borderRadius: 1,
          transition: animated ? 'width 1.2s cubic-bezier(.22,.68,0,1.2)' : 'none',
          position: 'relative',
        }}>
          {/* Leading edge glow */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 4,
            background: color, boxShadow: `0 0 6px ${color}`,
            borderRadius: 1,
          }} />
        </div>
      </div>
      {/* Tick marks below bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        {[0,25,50,75,100].map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-mono, monospace)', fontSize: '.42rem',
            color, opacity: t <= pct ? .4 : .15,
          }}>│</span>
        ))}
      </div>
    </div>
  );
};
 
/* ─────────────────────────────────────────────────────────────────────
   19. NEW: HazardBiohazardSymbol — animated SVG biohazard
───────────────────────────────────────────────────────────────────── */
export const HazardBiohazardSymbol = ({
  size = 80,
  color = '#C8F135',
  opacity = 0.15,
  style: extraStyle = {},
}: {
  size?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) => {
  const c = size / 2;
  const r = size * 0.38;
  const ir = size * 0.14;
  const or = size * 0.46;
 
  return (
    <svg
      width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ pointerEvents: 'none', opacity, ...extraStyle }}
      aria-hidden
    >
      <style>{`
        .hz-bio-outer { animation: hz-biohazard-spin 18s linear infinite; transform-origin: ${c}px ${c}px; }
        .hz-bio-inner { animation: hz-biohazard-spin-rev 12s linear infinite; transform-origin: ${c}px ${c}px; }
      `}</style>
 
      {/* Outer ring with segmentation */}
      <g className="hz-bio-outer">
        <circle cx={c} cy={c} r={or} fill="none" stroke={color} strokeWidth="1" strokeDasharray="8 4" />
        {Array.from({ length: 3 }, (_, i) => {
          const angle = (i * 120 - 90) * Math.PI / 180;
          const x1 = c + (or - 8) * Math.cos(angle);
          const y1 = c + (or - 8) * Math.sin(angle);
          const x2 = c + or * Math.cos(angle);
          const y2 = c + or * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" />;
        })}
      </g>
 
      {/* Three lobes */}
      {Array.from({ length: 3 }, (_, i) => {
        const baseAngle = i * 120;
        return (
          <circle
            key={i}
            cx={c + r * Math.cos((baseAngle - 90) * Math.PI / 180)}
            cy={c + r * Math.sin((baseAngle - 90) * Math.PI / 180)}
            r={r * 0.55}
            fill={color}
            fillOpacity=".15"
            stroke={color}
            strokeWidth="1.5"
          />
        );
      })}
 
      {/* Inner circle */}
      <g className="hz-bio-inner">
        <circle cx={c} cy={c} r={ir * 1.6} fill="#0a0a08" />
        <circle cx={c} cy={c} r={ir * 1.6} fill="none" stroke={color} strokeWidth="1.5" />
        <circle cx={c} cy={c} r={ir * .7} fill={color} />
      </g>
 
      {/* Radial spokes */}
      {Array.from({ length: 3 }, (_, i) => {
        const angle = (i * 120 - 90) * Math.PI / 180;
        return (
          <line
            key={i}
            x1={c + ir * 1.6 * Math.cos(angle)}
            y1={c + ir * 1.6 * Math.sin(angle)}
            x2={c + r * .45 * Math.cos(angle)}
            y2={c + r * .45 * Math.sin(angle)}
            stroke="#0a0a08"
            strokeWidth="4"
          />
        );
      })}
    </svg>
  );
};
/* ─────────────────────────────────────────────────────────────────────
   20. NEW: HazardAlertStack — multi-level alert system
───────────────────────────────────────────────────────────────────── */
export const HazardAlertStack = ({
  alerts,
}: {
  alerts: { id: string; level: 'warn' | 'danger' | 'ok' | 'info'; message: string; detail?: string }[];
}) => {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
 
  const palette = {
    warn: { bg: 'rgba(200,241,53,.06)', border: 'rgba(200,241,53,.3)', text: '#C8F135', icon: '⚠', pulse: 'rgba(200,241,53,.15)' },
    danger: { bg: 'rgba(255,50,50,.06)', border: 'rgba(255,50,50,.35)', text: '#ff5555', icon: '✕', pulse: 'rgba(255,50,50,.15)' },
    ok: { bg: 'rgba(53,241,150,.06)', border: 'rgba(53,241,150,.3)', text: '#35f196', icon: '✓', pulse: 'rgba(53,241,150,.15)' },
    info: { bg: 'rgba(53,170,241,.06)', border: 'rgba(53,170,241,.3)', text: '#35AAF1', icon: '◈', pulse: 'rgba(53,170,241,.15)' },
  };
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {alerts.filter(a => !dismissed.has(a.id)).map((alert, i) => {
        const p = palette[alert.level];
        return (
          <div key={alert.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '8px 12px',
            background: p.bg,
            border: `1px solid ${p.border}`,
            borderRadius: 4,
            animation: 'hz-alert-slide .35s ease-out',
            animationDelay: `${i * .08}s`,
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Left accent bar */}
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
              background: p.text, opacity: .8,
              boxShadow: `2px 0 8px ${p.text}50`,
            }} />
            {/* Pulse dot */}
            <div style={{ position: 'relative', marginTop: 1, flexShrink: 0 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%', background: p.text,
                animation: alert.level === 'danger' ? 'hz-status-dot .8s ease-in-out infinite' : 'hz-status-dot 1.6s ease-in-out infinite',
                boxShadow: `0 0 6px ${p.text}80`,
              }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: p.pulse, animation: 'hz-ping 2s ease-out infinite' }} />
            </div>
            {/* Content */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: alert.detail ? 3 : 0 }}>
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '.6rem', color: p.text, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 700 }}>{alert.level.toUpperCase()}</span>
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '.65rem', color: p.text, opacity: .8 }}>{alert.message}</span>
              </div>
              {alert.detail && (
                <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '.58rem', color: p.text, opacity: .45, letterSpacing: '.04em' }}>{alert.detail}</div>
              )}
            </div>
            {/* Dismiss */}
            <button
              onClick={() => setDismissed(d => new Set([...d, alert.id]))}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: p.text, opacity: .4, fontSize: '.65rem',
                padding: 0, flexShrink: 0, transition: 'opacity .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '.4')}
            >✕</button>
          </div>
        );
      })}
    </div>
  );
};
 
/* ─────────────────────────────────────────────────────────────────────
   21. NEW: HazardCodeDump — hex/code scrolling ticker
───────────────────────────────────────────────────────────────────── */
export const HazardCodeDump = ({
  height = 120,
  color = '#C8F135',
}: {
  height?: number;
  color?: string;
}) => {
  const generateLine = () => {
    const addr = Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0').toUpperCase();
    const bytes = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()
    ).join(' ');
    const ascii = Array.from({ length: 16 }, () => {
      const c = Math.floor(Math.random() * 94) + 33;
      return String.fromCharCode(c);
    }).join('');
    return `${addr}  ${bytes}  │${ascii}│`;
  };
 
  const lines = Array.from({ length: 40 }, generateLine);
  const doubled = [...lines, ...lines];
 
  return (
    <div style={{
      height, overflow: 'hidden', position: 'relative',
      background: `${color}04`,
      border: `1px solid ${color}15`,
      borderRadius: 4,
    }}>
      <style>{`.hz-code-dump-track { animation: hz-code-scroll 18s linear infinite; }`}</style>
      <div className="hz-code-dump-track">
        {doubled.map((line, i) => (
          <div key={i} style={{
            fontFamily: 'var(--font-mono, "Courier New", monospace)',
            fontSize: '.58rem', lineHeight: 1.6, padding: '0 10px',
            color, opacity: i % 5 === 0 ? .7 : i % 3 === 0 ? .4 : .25,
            letterSpacing: '.04em', whiteSpace: 'nowrap',
          }}>{line}</div>
        ))}
      </div>
      {/* Fade edges */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${color}10 0%, transparent 15%, transparent 85%, ${color}10 100%)`, pointerEvents: 'none' }} />
    </div>
  );
};
 
/* ─────────────────────────────────────────────────────────────────────
   22. NEW: HazardCountdown — segment display timer
───────────────────────────────────────────────────────────────────── */
export const HazardCountdown = ({
  initialSeconds = 300,
  color = '#C8F135',
  label = 'COUNTDOWN',
}: {
  initialSeconds?: number;
  color?: string;
  label?: string;
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
 
  useEffect(() => {
    if (!running || seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, seconds]);
 
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const fmt = (n: number) => n.toString().padStart(2, '0');
 
  const isUrgent = seconds < 60;
 
  return (
    <div style={{
      fontFamily: 'var(--font-mono, "Courier New", monospace)',
      display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    }}>
      <style>{`
        .hz-cd-colon { animation: hz-seg-blink 1s step-end infinite; color: ${isUrgent ? '#ff5555' : color}; }
        .hz-cd-digit {
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 56px;
          background: ${color}08;
          border: 1px solid ${color}20;
          border-radius: 4px;
          font-size: 2rem; font-weight: 700;
          color: ${isUrgent ? '#ff5555' : color};
          text-shadow: 0 0 12px ${isUrgent ? '#ff555580' : `${color}80`};
          box-shadow: inset 0 0 12px ${color}08;
          letter-spacing: 0;
        }
      `}</style>
      <div style={{ fontSize: '.55rem', letterSpacing: '.18em', color, opacity: .5, marginBottom: 2 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {h > 0 && <>
          <span className="hz-cd-digit">{fmt(h)[0]}</span>
          <span className="hz-cd-digit">{fmt(h)[1]}</span>
          <span className="hz-cd-colon" style={{ fontSize: '1.8rem', fontWeight: 700, padding: '0 2px' }}>:</span>
        </>}
        <span className="hz-cd-digit">{fmt(m)[0]}</span>
        <span className="hz-cd-digit">{fmt(m)[1]}</span>
        <span className="hz-cd-colon" style={{ fontSize: '1.8rem', fontWeight: 700, padding: '0 2px' }}>:</span>
        <span className="hz-cd-digit">{fmt(s)[0]}</span>
        <span className="hz-cd-digit">{fmt(s)[1]}</span>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        <button
          onClick={() => setRunning(r => !r)}
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '.58rem', letterSpacing: '.1em',
            background: running ? `${color}15` : `${color}08`,
            border: `1px solid ${color}35`,
            color, borderRadius: 3, padding: '3px 10px', cursor: 'pointer',
            transition: 'all .2s',
          }}
        >{running ? '■ STOP' : '▶ START'}</button>
        <button
          onClick={() => { setSeconds(initialSeconds); setRunning(false); }}
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '.58rem', letterSpacing: '.1em',
            background: `${color}06`,
            border: `1px solid ${color}20`,
            color, borderRadius: 3, padding: '3px 10px', cursor: 'pointer',
            opacity: .6, transition: 'opacity .2s',
          }}
        >↺ RESET</button>
      </div>
    </div>
  );
};
/* ─────────────────────────────────────────────────────────────────────
   23. NEW: HazardScanFrame — full scan overlay
───────────────────────────────────────────────────────────────────── */
export const HazardScanFrame = ({
  children,
  scanning = true,
  label = 'SCANNING',
  style: extraStyle = {},
}: {
  children: React.ReactNode;
  scanning?: boolean;
  label?: string;
  style?: React.CSSProperties;
}) => (
  <div style={{ position: 'relative', overflow: 'hidden', ...extraStyle }}>
    <style>{`
      .hz-sf-beam {
        position: absolute; left: 0; right: 0; height: 2px; z-index: 10;
        background: linear-gradient(to right, transparent, rgba(200,241,53,.7) 30%, rgba(200,241,53,.7) 70%, transparent);
        box-shadow: 0 0 8px rgba(200,241,53,.4), 0 0 20px rgba(200,241,53,.15);
        animation: hz-scan-beam 2.4s linear infinite;
      }
      .hz-sf-grid {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(200,241,53,.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,241,53,.04) 1px, transparent 1px);
        background-size: 24px 24px;
        pointer-events: none; z-index: 1;
      }
      .hz-sf-corner {
        position: absolute; width: 18px; height: 18px; z-index: 12; pointer-events: none;
        animation: hz-corner-blink 1.6s ease-in-out infinite;
      }
      .hz-sf-corner::before, .hz-sf-corner::after {
        content: ''; position: absolute; background: #C8F135; border-radius: 1px;
      }
      .hz-sf-corner::before { width: 2px; height: 100%; }
      .hz-sf-corner::after  { width: 100%; height: 2px; }
      .hz-sf-tl { top: 6px; left: 6px; }
      .hz-sf-tl::before, .hz-sf-tl::after { top:0; left:0; }
      .hz-sf-tr { top: 6px; right: 6px; animation-delay: .4s; }
      .hz-sf-tr::before { top:0; right:0; } .hz-sf-tr::after { top:0; right:0; }
      .hz-sf-bl { bottom: 6px; left: 6px; animation-delay: .8s; }
      .hz-sf-bl::before { bottom:0; left:0; } .hz-sf-bl::after { bottom:0; left:0; }
      .hz-sf-br { bottom: 6px; right: 6px; animation-delay: 1.2s; }
      .hz-sf-br::before { bottom:0; right:0; } .hz-sf-br::after { bottom:0; right:0; }
      .hz-sf-label {
        position: absolute; top: 6px; left: 50%; transform: translateX(-50%); z-index: 13;
        font-family: var(--font-mono, monospace); font-size: .55rem;
        color: #C8F135; letter-spacing: .18em; opacity: .65;
        background: rgba(0,0,0,.6); padding: 2px 8px; border-radius: 2px;
        border: 1px solid rgba(200,241,53,.2);
        animation: hz-flicker 4s step-end infinite;
      }
    `}</style>
 
    {children}
    {scanning && <div className="hz-sf-beam" />}
    <div className="hz-sf-grid" />
    <div className="hz-sf-corner hz-sf-tl" />
    <div className="hz-sf-corner hz-sf-tr" />
    <div className="hz-sf-corner hz-sf-bl" />
    <div className="hz-sf-corner hz-sf-br" />
    {scanning && <div className="hz-sf-label">{label}</div>}
  </div>
);
 
/* ─────────────────────────────────────────────────────────────────────
   24. NEW: HazardNeuralGrid — canvas hex neural network background
───────────────────────────────────────────────────────────────────── */
export const HazardNeuralGrid = ({
  width = 400,
  height = 300,
  color = '#C8F135',
  nodeCount = 22,
  style: extraStyle = {},
}: {
  width?: number;
  height?: number;
  color?: string;
  nodeCount?: number;
  style?: React.CSSProperties;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
 
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      r: Math.random() * 2 + 1.5,
      pulse: Math.random() * Math.PI * 2,
    }));
 
    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
 
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += .025;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });
 
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * .18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${color}`;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = .7;
            ctx.stroke();
          }
        }
      }
 
      // Draw nodes
      nodes.forEach(n => {
        const pulse = (Math.sin(n.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = .15 + pulse * .45;
        ctx.fill();
 
        // Glow ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = pulse * .12;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
 
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(animate);
    };
 
    animate();
    return () => cancelAnimationFrame(raf);
  }, [width, height, color, nodeCount]);
 
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ pointerEvents: 'none', ...extraStyle }}
    />
  );
};