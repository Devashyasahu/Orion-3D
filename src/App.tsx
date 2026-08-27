import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/ui/CustomCursor';
import { CinematicBackdrop } from './components/ui/CinematicBackdrop';
import { OrionLoader } from './components/ui/OrionLoader';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { WorldScene } from './components/ui/WorldScene';
import { WorldIndicator } from './components/ui/WorldIndicator';
import { RouteTravel } from './components/ui/RouteTravel';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/utils/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { WorldsPage } from './pages/WorldsPage';
import { WorldDetailPage } from './pages/WorldDetailPage';
import { CharacterDetailPage } from './pages/CharacterDetailPage';
import { StudioPage } from './pages/StudioPage';
import { CustomPage } from './pages/CustomPage';
import { AboutPage } from './pages/AboutPage';

function ExperienceFrame() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {isHome && <CinematicBackdrop />}
      {isHome && <WorldScene />}
      <ScrollProgress />
      <RouteTravel />
      <WorldIndicator />
      <CustomCursor />
      <Navbar />

      <motion.main
        className="relative z-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/worlds" element={<WorldsPage />} />
          <Route path="/world/:worldId" element={<WorldDetailPage />} />
          <Route path="/character/:slug" element={<CharacterDetailPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>

      <Footer />
    </>
  );
}

export function App() {
  const [loading, setLoading] = useState(true);

  // Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <CursorProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#05070d] text-[#f0f0f5] selection:bg-cyan-500/30 selection:text-cyan-200 has-custom-cursor relative overflow-hidden">
          <AnimatePresence>
            <OrionLoader active={loading} />
          </AnimatePresence>
          <ExperienceFrame />
        </div>
      </Router>
    </CursorProvider>
  );
}

export default App;
