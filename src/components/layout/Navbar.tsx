import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'DISCOVER', path: '/worlds' },
    { label: 'THE FORGE', path: '/custom' },
    { label: 'STUDIO', path: '/studio' },
    { label: 'ABOUT', path: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-[#040406]/34 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.36)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <NavLink
            to="/"
            onMouseEnter={() => setCursor('ORION', 'hover')}
            onMouseLeave={resetCursor}
            className="group flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-8 h-8 border border-cyan-200/45 bg-white/5 flex items-center justify-center group-hover:border-cyan-100 transition-colors duration-300 shadow-[0_0_18px_rgba(125,211,252,0.28)] rotate-45">
              <div className="w-2.5 h-2.5 bg-cyan-200 group-hover:scale-125 transition-transform duration-300" />
            </div>
            <span className="text-base md:text-lg font-space font-semibold tracking-[0.18em] text-white group-hover:text-cyan-200 transition-colors duration-300">
              ORION <span className="text-cyan-300 font-medium text-xs tracking-[0.18em] ml-1">3D</span>
            </span>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onMouseEnter={() => setCursor(item.label, 'hover')}
                onMouseLeave={resetCursor}
                className={({ isActive }) =>
                  `text-[11px] font-inter tracking-[0.15em] font-medium transition-all duration-300 relative py-1 uppercase ${
                    isActive
                      ? 'text-cyan-300 font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-300 to-transparent"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/80 hover:text-white p-2 rounded-lg bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[70px] z-30 bg-[#040406]/95 backdrop-blur-2xl px-8 py-12 flex flex-col justify-between border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col space-y-8 mt-6">
              <NavLink
                to="/"
                className="text-2xl font-space tracking-[0.12em] text-white hover:text-cyan-300"
              >
                HOME
              </NavLink>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-2xl font-space tracking-[0.12em] transition-colors ${
                      isActive ? 'text-cyan-300 font-bold' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 text-xs font-space tracking-widest text-white/40">
              ORION 3D — DIGITAL WORLDS. PHYSICAL CHARACTERS.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
