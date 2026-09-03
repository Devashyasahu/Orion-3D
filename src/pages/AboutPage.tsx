import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useCursor } from '../context/CursorContext';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();

  return (
    <div className="about-exhibition min-h-screen bg-transparent text-white pt-32 pb-28 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-amber-950/20 blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32 relative z-10">
        <div className="max-w-4xl space-y-6">
          <span className="text-xs font-space tracking-[0.35em] text-amber-300 uppercase font-semibold">
            ABOUT ORION 3D
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-syne font-extrabold uppercase tracking-tight text-white leading-none break-words">
            WE MAKE IMAGINATION PHYSICAL.
          </h1>
          <p className="text-sm md:text-xl font-space text-white/70 leading-relaxed max-w-2xl">
            Orion is a digital art gallery and physical sculpture studio creating collectible forms from fictional worlds.
          </p>
        </div>

        <div className="about-origin grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <div className="portal-3d relative overflow-hidden aspect-[16/10] shadow-[0_0_60px_rgba(0,0,0,0.9)]">
              <div className="portal-3d__depth" />
              <div className="portal-3d__strata" />
              <img
                src="/images/studio_finishing.png"
                alt="Orion craftsman studio"
                className="w-full h-full object-cover filter brightness-95"
              />
            </div>
          </div>
          <div className="md:col-span-4 space-y-6 text-sm font-space text-white/70 leading-relaxed">
            <h3 className="text-2xl font-syne font-bold text-white uppercase">
              WHY ORION EXISTS
            </h3>
            <p>
              In a world dominated by temporary digital media, Orion 3D restores physical tactility to the characters and stories people keep returning to.
            </p>
            <p>
              We do not treat collectibles as flat product thumbnails. Each piece is shaped through sculpting, resin printing, sanding, painting, and final inspection.
            </p>
          </div>
        </div>

        <div className="about-standard space-y-12 pt-20">
          <div>
            <span className="text-xs font-space tracking-[0.3em] text-amber-300 uppercase font-semibold">
              OUR PILLARS
            </span>
            <h2 className="text-3xl md:text-5xl font-syne font-bold uppercase text-white mt-1">
              THE ORION STANDARD
            </h2>
          </div>

          <div className="about-standard__pillars">
            <div className="about-pillar p-8 space-y-4">
              <span className="text-xs font-space tracking-[0.25em] text-amber-300 font-semibold">PILLAR 01</span>
              <h4 className="text-2xl font-syne font-bold text-white uppercase">MICRON PRECISION</h4>
              <p className="text-xs font-space text-white/60 leading-relaxed">
                We print at Z-axis layer heights down to 15 microns, preserving skin pores, armor textures, and delicate weapon edges.
              </p>
            </div>
            <div className="about-pillar about-pillar--middle p-8 space-y-4">
              <span className="text-xs font-space tracking-[0.25em] text-violet-400 font-semibold">PILLAR 02</span>
              <h4 className="text-2xl font-syne font-bold text-white uppercase">ARTISANAL FINISH</h4>
              <p className="text-xs font-space text-white/60 leading-relaxed">
                No raw 3D prints leave the studio. Every model is micro-sanded, airbrushed with layered lacquer, and finished by hand.
              </p>
            </div>
            <div className="about-pillar p-8 space-y-4">
              <span className="text-xs font-space tracking-[0.25em] text-pink-400 font-semibold">PILLAR 03</span>
              <h4 className="text-2xl font-syne font-bold text-white uppercase">LIMITED EDITIONS</h4>
              <p className="text-xs font-space text-white/60 leading-relaxed">
                Exhibition pieces are prepared as collector objects, with edition details surfaced only where the product data is real.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-12">
          <span
            onClick={() => navigate('/worlds')}
            onMouseEnter={() => setCursor('EXHIBITION', 'hover')}
            onMouseLeave={resetCursor}
            className="inline-flex items-center space-x-3 text-sm font-space tracking-[0.3em] font-semibold text-amber-200 hover:text-white cursor-pointer transition-colors"
          >
            <span>ENTER THE EXHIBITION WORLDS</span>
            <span>-&gt;</span>
          </span>
        </div>
      </div>
    </div>
  );
};
