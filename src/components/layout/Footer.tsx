import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCursor } from '../../context/CursorContext';

export const Footer: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <footer className="relative bg-[#030305] border-t border-white/10 pt-20 pb-12 overflow-hidden text-white/80">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-cyan-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Philosophy */}
          <div className="md:col-span-6 space-y-6">
            <h3 className="text-3xl font-syne font-extrabold tracking-[0.2em] text-white">
              ORION <span className="text-cyan-400 font-light text-xl">3D</span>
            </h3>
            <p className="text-sm font-space tracking-widest text-white/60 uppercase max-w-md">
              DIGITAL WORLDS. PHYSICAL CHARACTERS. WE DON'T JUST PRINT FIGURES. WE BRING IMAGINATION INTO PHYSICAL REALITY.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-space tracking-[0.25em] text-cyan-400 uppercase font-semibold">
              EXHIBITION
            </h4>
            <ul className="space-y-3 text-xs font-space tracking-[0.2em]">
              <li>
                <NavLink
                  to="/worlds"
                  onMouseEnter={() => setCursor('OPEN', 'hover')}
                  onMouseLeave={resetCursor}
                  className="hover:text-cyan-300 transition-colors"
                >
                  WORLDS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/studio"
                  onMouseEnter={() => setCursor('OPEN', 'hover')}
                  onMouseLeave={resetCursor}
                  className="hover:text-cyan-300 transition-colors"
                >
                  STUDIO PROCESS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/custom"
                  onMouseEnter={() => setCursor('OPEN', 'hover')}
                  onMouseLeave={resetCursor}
                  className="hover:text-cyan-300 transition-colors"
                >
                  CUSTOM SCULPTING
                </NavLink>
              </li>
              <li>
                <a
                  href="mailto:contact@orion3d.art?subject=ORION%203D%20shipping%20and%20care%20question"
                  onMouseEnter={() => setCursor('OPEN', 'hover')}
                  onMouseLeave={resetCursor}
                  className="hover:text-cyan-300 transition-colors"
                >
                  FAQ / SHIPPING / CARE
                </a>
              </li>
              <li>
                <NavLink
                  to="/about"
                  onMouseEnter={() => setCursor('OPEN', 'hover')}
                  onMouseLeave={resetCursor}
                  className="hover:text-cyan-300 transition-colors"
                >
                  ABOUT ORION
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact / Editorial Inquiry */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-space tracking-[0.25em] text-cyan-400 uppercase font-semibold">
              COMMUNICATIONS
            </h4>
            <ul className="space-y-3 text-xs font-space tracking-[0.2em]">
              <li>
                <a
                  href="mailto:contact@orion3d.art?subject=ORION%203D%20collectible%20inquiry"
                  onMouseEnter={() => setCursor('OPEN', 'hover')}
                  onMouseLeave={resetCursor}
                  className="hover:text-cyan-300 transition-colors"
                >
                  EMAIL INQUIRY
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/?text=Hi%20ORION%203D%2C%20I%20want%20to%20reserve%20a%20collectible%20or%20discuss%20a%20custom%20figure."
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setCursor('OPEN', 'hover')}
                  onMouseLeave={resetCursor}
                  className="hover:text-cyan-300 transition-colors"
                >
                  WHATSAPP QUOTE
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@orion3d.art"
                  onMouseEnter={() => setCursor('OPEN', 'hover')}
                  onMouseLeave={resetCursor}
                  className="hover:text-cyan-300 transition-colors"
                >
                  CONTACT@ORION3D.ART
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@orion3d.art?subject=ORION%203D%20policy%20request"
                  onMouseEnter={() => setCursor('OPEN', 'hover')}
                  onMouseLeave={resetCursor}
                  className="hover:text-cyan-300 transition-colors"
                >
                  POLICIES / TERMS
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-space tracking-[0.2em] text-white/40 space-y-4 md:space-y-0">
          <div>© {new Date().getFullYear()} ORION 3D. ALL RIGHTS RESERVED.</div>
          <div className="uppercase">DIGITAL ART EXHIBITION & PHYSICAL SCULPTURE STUDIO</div>
        </div>
      </div>
    </footer>
  );
};
