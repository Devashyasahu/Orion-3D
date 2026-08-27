import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getWorldById } from '../data/worlds';
import { CHARACTERS, getCharactersByWorld } from '../data/characters';
import { FlipWord } from '../components/ui/FlipWord';
import { useCursor } from '../context/CursorContext';

export const WorldDetailPage: React.FC = () => {
  const { worldId } = useParams<{ worldId: string }>();
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();
  const world = getWorldById(worldId || '');
  const directCharacters = getCharactersByWorld(worldId || '');

  if (!world) {
    return (
      <div className="min-h-screen bg-[#070e1b] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-syne font-bold uppercase tracking-tight">WORLD UNCHARTED</h1>
        <button
          onClick={() => navigate('/worlds')}
          className="mt-6 text-xs font-space tracking-[0.2em] text-cyan-300 hover:underline uppercase font-semibold"
        >
          RETURN TO WORLDS -&gt;
        </button>
      </div>
    );
  }

  const isDeathNote = world.id === 'death-note';

  const characters = directCharacters.length > 0
    ? directCharacters
    : world.characterSlugs.map((slug) => CHARACTERS.find((c) => c.slug === slug)).filter(Boolean) as typeof CHARACTERS;

  return (
    <div className={`world-environment world-environment-${world.id} min-h-screen bg-transparent text-white pb-32 relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${world.bgGradient} opacity-80`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_75%_80%,rgba(251,191,36,0.10),transparent_35%)]" />
      <div className="world-skyline" />
      <div className="world-weather" />
      <div className="world-symbols" />

      <section className="relative min-h-[85vh] px-6 md:px-12 pt-36 flex items-center z-10">
        <div className="world-entry max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-space tracking-[0.35em] uppercase font-semibold" style={{ color: world.themeColor }}>
                ENTER WORLD
              </span>
              <span className="text-white/30 text-xs">/</span>
              <span className="text-xs font-space tracking-widest text-white/60 uppercase">{world.id}</span>
            </div>

            <h1 className="type-display-l font-syne uppercase text-white">
              <FlipWord text={world.name} accentColor={world.themeColor} />
            </h1>

            <p className="text-lg md:text-2xl font-space font-medium tracking-[0.15em] text-white/90 uppercase">
              {world.headline}
            </p>

            <p className="text-sm font-space tracking-wider text-white/70 uppercase max-w-2xl leading-relaxed">
              {world.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative world-entry__figure"
            style={{ '--world-accent': world.themeColor } as React.CSSProperties}
          >
            <div className="world-entry__horizon" />
            <img src={world.heroImage} alt={world.name} className="world-entry__figure-img filter brightness-105 contrast-110" />
            <div className="world-entry__mist" />
            <p className="world-entry__atmosphere">{world.atmosphere}</p>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-36">
        {isDeathNote && (
          <section className="death-note-chapter relative space-y-12">
            <div className="border-b border-white/10 pb-6">
              <span className="text-xs font-space tracking-[0.35em] text-red-400 uppercase font-semibold">BLACK FEATHER / WHITE PAPER / RED SILENCE</span>
              <h2 className="type-display-m font-syne uppercase text-white mt-2">
                THE <FlipWord text="SHADOW" accentColor="#ef4444" /> REVEALS RYUK
              </h2>
            </div>

            <div className="death-note-chapter__papers" />
            <div className="death-note-chapter__cast">
              {characters.map((character, index) => (
                <motion.div
                  key={character.slug}
                  initial={{ opacity: 0, y: 54, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-12%' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onClick={() => navigate(`/character/${character.slug}`)}
                  onMouseEnter={() => setCursor(`VIEW ${character.name}`, 'image')}
                  onMouseLeave={resetCursor}
                  className="death-note-chapter__figure"
                  style={{ '--figure-accent': character.accentColor } as React.CSSProperties}
                >
                  <div className="world-character-landscape__glow" />
                  <img src={character.heroImage} alt={character.name} loading="lazy" />
                  <div className="world-character-landscape__caption">
                    <span>{character.tagline}</span>
                    <strong>{character.name}</strong>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {!isDeathNote && (
          <section className="space-y-12">
            <div className="border-b border-white/10 pb-6">
              <span className="text-xs font-space tracking-[0.35em] uppercase font-semibold" style={{ color: world.themeColor }}>CHARACTER ENCOUNTERS</span>
              <h2 className="type-display-m font-syne uppercase text-white mt-2">
                FIGURES OF <FlipWord text={world.name} accentColor={world.themeColor} />
              </h2>
            </div>

            {characters.length > 0 ? (
              <div className={`world-character-landscape world-character-landscape--${world.id}`}>
                {characters.map((character, index) => (
                  <motion.div
                    key={character.slug}
                    initial={{ opacity: 0, y: 54, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-12%' }}
                    transition={{ duration: 0.8, delay: index * 0.08 }}
                    onClick={() => navigate(`/character/${character.slug}`)}
                    onMouseEnter={() => setCursor(`VIEW ${character.name}`, 'image')}
                    onMouseLeave={resetCursor}
                    className={`world-character-landscape__figure world-character-landscape__figure--${(index % 5) + 1}`}
                    style={{ '--figure-accent': character.accentColor } as React.CSSProperties}
                  >
                    <div className="world-character-landscape__glow" />
                    <img src={character.heroImage} alt={character.name} loading="lazy" />
                    <div className="world-character-landscape__caption">
                      <span>{character.environment}</span>
                      <strong>{character.name}</strong>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="world-empty-commission">
                <p>Custom sculptures for this world are available via private commission.</p>
                <button
                  type="button"
                  onClick={() => navigate('/custom')}
                  onMouseEnter={() => setCursor('CREATE', 'hover')}
                  onMouseLeave={resetCursor}
                >
                  REQUEST CUSTOM SCULPTURE -&gt;
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
