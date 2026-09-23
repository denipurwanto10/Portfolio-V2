import { useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { Home, UserRound, ScrollText, FileText, Award, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home',     href: '#home',         icon: Home },
  { name: 'About',    href: '#about',        icon: UserRound },
  { name: 'Resume',   href: '#resume',       icon: FileText },
  { name: 'Projects', href: '#projects',     icon: ScrollText },
  { name: 'Certs',    href: '#certificates', icon: Award },
  { name: 'Contact',  href: '#contact',       icon: Mail },
];

const SIDEBAR_CSS = `
  @keyframes hz-sb-dot {
    0%,100% { opacity:1; transform:scale(1); }
    50% { opacity:0.3; transform:scale(0.7); }
  }
  @keyframes hz-sb-blink {
    0%,100% { opacity:0.4; }
    50% { opacity:1; }
  }
  @keyframes hz-sb-pulse {
    0%,100% { box-shadow: 0 0 0 1px rgba(200,241,53,0.18); }
    50%      { box-shadow: 0 0 0 1px rgba(200,241,53,0.45), 0 0 18px rgba(200,241,53,0.07); }
  }
  .hz-sb-nav {
    animation: hz-sb-pulse 3s ease-in-out infinite;
  }
  .hz-sb-item-icon {
    display:flex; align-items:center; justify-content:center;
    width:36px; height:36px; border-radius:10px;
    transition: background 0.25s, color 0.25s;
  }
  .hz-sb-item-icon.active {
    background: #C8F135;
    color: #0e0e0b;
  }
  .hz-sb-item-icon:not(.active) {
    background: transparent;
    color: rgba(200,241,53,0.3);
  }
  .hz-sb-item:hover .hz-sb-item-icon:not(.active) {
    background: rgba(200,241,53,0.08);
    color: #C8F135;
  }
  .hz-sb-tooltip {
    pointer-events:none;
    position:absolute; left:48px; top:50%; transform:translateY(-50%) translateX(-6px);
    white-space:nowrap;
    opacity:0; transition:opacity 0.18s, transform 0.18s;
    font-family: var(--font-mono, 'Share Tech Mono', monospace);
    font-size:10px; letter-spacing:0.12em; text-transform:uppercase;
    color: #C8F135;
    background: rgba(10,10,8,0.92);
    border: 1px solid rgba(200,241,53,0.25);
    padding: 4px 10px; border-radius:4px;
    backdrop-filter: blur(12px);
  }
  .hz-sb-item:hover .hz-sb-tooltip {
    opacity:1; transform:translateY(-50%) translateX(0);
  }
  .hz-sb-corner {
    position:absolute; width:8px; height:8px; pointer-events:none;
    animation: hz-sb-blink 2.5s ease-in-out infinite;
  }
  .hz-sb-corner::before, .hz-sb-corner::after {
    content:''; position:absolute; background:#C8F135; border-radius:1px;
  }
  .hz-sb-tl { top:6px; left:6px; animation-delay:0s; }
  .hz-sb-tl::before { top:0; left:0; width:1.5px; height:100%; }
  .hz-sb-tl::after  { top:0; left:0; width:100%; height:1.5px; }
  .hz-sb-br { bottom:6px; right:6px; animation-delay:1.25s; }
  .hz-sb-br::before { bottom:0; right:0; width:1.5px; height:100%; }
  .hz-sb-br::after  { bottom:0; right:0; width:100%; height:1.5px; }
  .hz-mb-dot {
    width:5px; height:5px; border-radius:50%; background:#C8F135; flex-shrink:0;
    animation: hz-sb-dot 1.5s ease-in-out infinite;
    box-shadow: 0 0 0 2px rgba(200,241,53,0.2);
  }
  @keyframes hz-mb-pulse {
    0%,100% { box-shadow: 0 0 0 1px rgba(200,241,53,0.15); }
    50%      { box-shadow: 0 0 0 1px rgba(200,241,53,0.4), 0 0 20px rgba(200,241,53,0.08); }
  }
  .hz-mb-nav {
    animation: hz-mb-pulse 3s ease-in-out infinite;
  }
`;

let cssInjected = false;

const VerticalSidebar = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Handle smooth scroll when clicking nav items - TIDAK ADA LAGI HASH DI URL!
  const handleClick = (e: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(targetId);
      
      // HAPUS HASH DARI URL - gunakan pushState dengan URL saat ini (tanpa hash)
      const cleanUrl = window.location.pathname + window.location.search;
      window.history.pushState(null, '', cleanUrl);
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.replace('#', ''));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(prev => (prev !== section ? section : prev));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cek hash awal saat komponen mount, lalu bersihkan
  useEffect(() => {
    if (window.location.hash) {
      const cleanUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, '', cleanUrl);
    }
  }, []);

  useEffect(() => {
    if (!cssInjected) {
      const style = document.createElement('style');
      style.textContent = SIDEBAR_CSS;
      document.head.appendChild(style);
      cssInjected = true;
    }
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        aria-label="Page sections"
        className="hz-sb-nav hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-1 py-3 px-2"
        style={{
          background: 'rgba(26, 24, 21, 0.7)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(200,241,53,0.12)',
          borderRadius: '16px',
        }}
      >
        <span className="hz-sb-corner hz-sb-tl" aria-hidden="true" />
        <span className="hz-sb-corner hz-sb-br" aria-hidden="true" />
       
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSection === item.href.replace('#', '');
          return (
            <a
              key={item.name}
              href={item.href}
              className="relative flex items-center justify-center group"
              aria-label={item.name}
              onClick={(e) => handleClick(e, item.href)}
            >
              <div
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300"
                style={{
                  background: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? 'var(--surface-0)' : 'var(--ink-4)',
                }}
              >
                <Icon size={16} />
              </div>
              <span
                className="pointer-events-none absolute left-12 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0 -translate-x-1"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.05em',
                  background: 'var(--surface-3)',
                  color: 'var(--ink-1)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {item.name}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile Navigation */}
      <nav
        aria-label="Page sections mobile"
        className="hz-mb-nav fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-sm flex justify-between md:hidden px-3 py-2"
        style={{
          background: 'rgba(14,14,11,0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(200,241,53,0.2)',
          borderRadius: '18px',
        }}
      >
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSection === item.href.replace('#', '');
          return (
            <a
              key={item.name}
              href={item.href}
              className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-all duration-200"
              aria-label={item.name}
              aria-current={isActive ? 'page' : undefined}
              onClick={(e) => handleClick(e, item.href)}
              style={{
                background: isActive ? 'rgba(200,241,53,0.12)' : 'transparent',
                color: isActive ? '#C8F135' : 'rgba(200,241,53,0.7)',
              }}
            >
              <Icon size={18} />
              <span style={{
                fontFamily: "var(--font-mono, 'Share Tech Mono', monospace)",
                fontSize: '0.6rem',
                fontWeight: isActive ? '500' : '400',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: isActive ? '#C8F135' : 'rgba(200,241,53,0.6)',
                marginTop: '2px',
              }}>
                {item.name}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
};

export default VerticalSidebar;