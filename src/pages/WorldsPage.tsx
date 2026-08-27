import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WORLDS } from '../data/worlds';
import { getCharactersByWorld } from '../data/characters';
import { useCursor } from '../context/CursorContext';

export const WorldsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();

  return (
    <div className="discover-page min-h-screen bg-transparent text-white pt-32 pb-24 relative overflow-hidden">
      <div className="discover-page__intro px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-5">
            <span className="text-xs font-space tracking-[0.35em] text-white/55 uppercase font-semibold">
              DISCOVER / THE ORION VAULT
            </span>
            <h1 className="type-display-l font-syne uppercase text-white">
              COLLECT THE IMPOSSIBLE.
            </h1>
          </div>
          <p className="lg:col-span-4 text-sm font-space text-white/62 leading-relaxed">
            Each franchise becomes a world. Enter the world first, then discover the physical artifacts inside it.
          </p>
        </div>
      </div>

      <div className="discover-worlds">
        {WORLDS.map((world, idx) => {
          const characters = getCharactersByWorld(world.id);
          const lead = characters[0];
          const supporting = characters.slice(1, 4);

          return (
            <motion.section
              key={world.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.8 }}
              className="discover-world"
              style={{ '--world-accent': world.themeColor } as React.CSSProperties}
            >
              <div className="discover-world__texture" />
              <div className="discover-world__copy">
                <span>{String(idx + 1).padStart(2, '0')} / {characters.length} ARTIFACTS</span>
                <h2>{world.name}</h2>
                <p>{world.subhead}</p>
                <button
                  type="button"
                  onClick={() => navigate(`/world/${world.id}`)}
                  onMouseEnter={() => setCursor(`ENTER ${world.name}`, 'hover')}
                  onMouseLeave={resetCursor}
                >
                  ENTER WORLD -&gt;
                </button>
              </div>

              <div className="discover-world__stage">
                <div className="discover-world__horizon" />
                {lead && (
                  <img
                    src={lead.heroImage}
                    alt={lead.name}
                    className="discover-world__lead"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                )}
                {supporting.map((character, supportIdx) => (
                  <img
                    key={character.slug}
                    src={character.heroImage}
                    alt=""
                    className={`discover-world__support discover-world__support--${supportIdx + 1}`}
                    loading="lazy"
                  />
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
};
