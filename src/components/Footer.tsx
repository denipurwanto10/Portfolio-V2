import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative z-10 py-12 md:py-8 px-4 overflow-hidden"
      style={{
        background: 'var(--surface-0)',
        borderTop: '1px solid rgba(200,241,53,0.2)',
        color: 'var(--ink-2)',
      }}
    >
      <style>{`
        @keyframes footer-blink-line {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.6; }
        }
        
        @keyframes footer-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes footer-blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .footer-hazard-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: repeating-linear-gradient(90deg, var(--accent) 0px, var(--accent) 8px, transparent 8px, transparent 16px);
          animation: footer-blink-line 2s ease-in-out infinite;
        }
        
        .footer-corner {
          position: absolute;
          width: 24px;
          height: 24px;
          opacity: 0.4;
          animation: footer-pulse 2s ease-in-out infinite;
        }
        
        .footer-corner::before,
        .footer-corner::after {
          content: '';
          position: absolute;
          background: var(--accent);
        }
        
        .footer-corner::before { width: 2px; height: 100%; }
        .footer-corner::after { width: 100%; height: 2px; }
        
        .footer-corner-tl { top: 8px; left: 8px; }
        .footer-corner-tl::before { top: 0; left: 0; }
        .footer-corner-tl::after { top: 0; left: 0; }
        
        .footer-corner-tr { top: 8px; right: 8px; }
        .footer-corner-tr::before { top: 0; right: 0; }
        .footer-corner-tr::after { top: 0; right: 0; }
        
        .footer-corner-bl { bottom: 8px; left: 8px; }
        .footer-corner-bl::before { bottom: 0; left: 0; }
        .footer-corner-bl::after { bottom: 0; left: 0; }
        
        .footer-corner-br { bottom: 8px; right: 8px; }
        .footer-corner-br::before { bottom: 0; right: 0; }
        .footer-corner-br::after { bottom: 0; right: 0; }
        
        .footer-led {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          display: inline-block;
          animation: footer-blink 1.5s ease-in-out infinite;
          box-shadow: 0 0 4px var(--accent);
        }
        
        /* Filter untuk ubah warna love jadi lemon */
        .lemon-love {
          display: inline-block;
          filter: brightness(0) saturate(100%) invert(87%) sepia(48%) saturate(1037%) hue-rotate(23deg) brightness(102%) contrast(93%);
        }
        
        /* Mobile height adjustment - EVEN HIGHER (increased from previous) */
        @media (max-width: 768px) {
          footer {
            padding-top: 8rem !important;
            padding-bottom: 8rem !important;
          }
          
          .footer-corner {
            width: 40px;
            height: 40px;
          }
          
          .footer-corner-tl { top: 16px; left: 16px; }
          .footer-corner-tr { top: 16px; right: 16px; }
          .footer-corner-bl { bottom: 16px; left: 16px; }
          .footer-corner-br { bottom: 16px; right: 16px; }
        }

        /* Extra small devices - EVEN HIGHER for very small screens */
        @media (max-width: 480px) {
          footer {
            padding-top: 10rem !important;
            padding-bottom: 10rem !important;
          }
          
          .footer-corner {
            width: 48px;
            height: 48px;
          }
          
          .footer-corner-tl { top: 20px; left: 20px; }
          .footer-corner-tr { top: 20px; right: 20px; }
          .footer-corner-bl { bottom: 20px; left: 20px; }
          .footer-corner-br { bottom: 20px; right: 20px; }
        }

        /* Small height phones (e.g., iPhone SE) - max height constraint */
        @media (max-width: 380px) {
          footer {
            padding-top: 7rem !important;
            padding-bottom: 7rem !important;
          }
        }
      `}</style>

      {/* Top hazard line - BERKEDIP, tidak bergerak */}
      <div className="footer-hazard-line" />

      {/* Corner brackets */}
      <div className="footer-corner footer-corner-tl" />
      <div className="footer-corner footer-corner-tr" />
      <div className="footer-corner footer-corner-bl" />
      <div className="footer-corner footer-corner-br" />

      {/* Diagonal stripe sederhana */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 80,
        height: 80,
        backgroundImage: 'repeating-linear-gradient(-45deg, rgba(200,241,53,0.03) 0px, rgba(200,241,53,0.03) 6px, transparent 6px, transparent 12px)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
          
          {/* Left: Nama */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className="footer-led" />
              <h1 
                className="text-2xl md:text-xl font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--accent)',
                  letterSpacing: '-0.02em',
                }}
              >
                Deni Purwanto
              </h1>
            </div>
          </div>

          {/* Center: Icon Sosial Media */}
          <div className="flex items-center justify-center gap-5 md:gap-3">
            <a
              href="https://github.com/denipurwanto10"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-2xl md:text-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--ink-3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = 'var(--surface-0)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(200,241,53,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--surface-2)';
                e.currentTarget.style.color = 'var(--ink-3)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FaGithub />
            </a>
            
            <a
              href="https://www.linkedin.com/in/deniiprwnt/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-2xl md:text-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--ink-3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = 'var(--surface-0)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(200,241,53,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--surface-2)';
                e.currentTarget.style.color = 'var(--ink-3)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <FaLinkedinIn />
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-center md:text-right">
            <p 
              className="text-sm md:text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink-4)',
              }}
            >
              © {currentYear} Created with{' '}
              <span className="lemon-love">❤️</span>{' '}
              by Deni Purwanto
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;