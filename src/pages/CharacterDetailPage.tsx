import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getCharacterBySlug } from '../data/characters';
import { useCursor } from '../context/CursorContext';
import { CommissionModal } from '../components/common/CommissionModal';
import { FlipWord } from '../components/ui/FlipWord';

export const CharacterDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const character = getCharacterBySlug(slug || '');
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 72]);
  const titleY = useTransform(scrollY, [0, 700], [0, -80]);

  if (!character) {
    return (
      <div className="min-h-screen bg-[#040406] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-syne font-bold">CHARACTER UNFOUND</h1>
        <button onClick={() => navigate('/worlds')} className="mt-6 text-xs font-space tracking-[0.2em] text-cyan-300 hover:underline uppercase">
          EXPLORE EXHIBITION WORLDS -&gt;
        </button>
      </div>
    );
  }

  const process = [
    ['SILHOUETTE', character.description],
    ['SCULPTURE', character.story],
    ['MATERIAL', `${character.metadata.material} / ${character.metadata.layerResolution} / ${character.metadata.finish}`],
    ['PHYSICAL', `${character.metadata.printTimeHours}, refined by hand, packed securely, and confirmed for ${character.metadata.edition}.`],
  ];
  const environmentKey = ['light-yagami', 'l', 'ryuk'].includes(character.slug) ? 'death-note' : character.worldId;

  return (
    <div
      className={`world-environment world-environment-${environmentKey} min-h-screen bg-transparent text-white pb-28 relative overflow-hidden`}
      style={{ '--artifact-accent': character.accentColor } as React.CSSProperties}
    >
      <CommissionModal isOpen={isCommissionOpen} onClose={() => setIsCommissionOpen(false)} characterName={character.name} />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,226,181,0.16)_0%,rgba(34,45,54,0.34)_34%,rgba(29,28,35,0.5)_62%,rgba(12,14,18,0.84)_100%)]" />
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 52% 40%, ${character.accentColor}34, transparent 34%)` }} />
      <div className="world-skyline" />
      <div className="world-weather" />
      <div className="world-symbols" />

      <section className={`artifact-detail-hero artifact-${character.slug} image-mode-${character.imageMode} relative min-h-screen flex items-center overflow-hidden px-6 md:px-12 pt-28`}>
        <motion.div style={{ y: imageY }} className="artifact-detail-hero__image absolute inset-x-0 bottom-[-2vh] mx-auto w-[min(92vw,880px)] pointer-events-none">
          <img src={character.heroImage} alt={character.name} className="w-full h-auto object-contain drop-shadow-[0_60px_110px_rgba(0,0,0,0.86)]" />
          <div className="absolute left-1/2 bottom-[6%] h-10 w-[62%] -translate-x-1/2 rounded-full bg-black/45 blur-3xl" />
        </motion.div>

        <motion.div style={{ y: titleY }} className="artifact-detail-hero__content relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-[44rem]">
            <span className="text-xs font-space tracking-[0.35em] uppercase font-semibold" style={{ color: character.accentColor }}>
              {character.worldName}
            </span>
            <h1 className="mt-4 type-display-l font-syne uppercase text-white">
              <FlipWord text={character.name} accentColor={character.accentColor} />
            </h1>
            <p className="mt-6 max-w-2xl text-sm md:text-lg font-space text-white/75 leading-relaxed">{character.description}</p>
          </div>
          <div className="artifact-buy-panel mt-12">
            <span>{character.worldName}</span>
            <strong>{character.commerce.priceLabel}</strong>
            <em>{character.commerce.availability}</em>
            <button
              type="button"
              onClick={() => setIsCommissionOpen(true)}
              onMouseEnter={() => setCursor(character.commerce.primaryCta, 'hover')}
              onMouseLeave={resetCursor}
            >
              {character.commerce.primaryCta}
            </button>
            <small>{character.commerce.fulfillment}</small>
          </div>
        </motion.div>
      </section>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 space-y-32">
        <section className="character-closeup">
          <div className="character-closeup__light" style={{ '--figure-accent': character.accentColor } as React.CSSProperties} />
          <div className={`character-closeup__image character-closeup__image--near artifact-${character.slug} image-mode-${character.imageMode}`}>
            <img src={character.gallery[0] || character.heroImage} alt={`${character.name} close sculpt view`} loading="lazy" />
          </div>
          <div className="character-closeup__image character-closeup__image--far">
            <img src={character.gallery[1] || character.heroImage} alt={`${character.name} physical finish view`} loading="lazy" />
          </div>
          <div className="character-closeup__text">
            <span>{character.metadata.height} / {character.metadata.weight}</span>
            <h2>Physical texture, not a product photo.</h2>
            <p>{character.craftsmanshipHighlights.join(' / ')}</p>
          </div>
        </section>

        <section className="character-process">
          {process.map(([title, body], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`character-process__step ${index % 2 ? 'character-process__step--right' : ''}`}
            >
              <h2 className="type-display-m font-syne uppercase text-white">
                <FlipWord text={title} accentColor={character.accentColor} />
              </h2>
              <p className="text-sm md:text-base font-space tracking-wider text-white/68 uppercase leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </section>

        <section className="text-center pt-24 space-y-8">
          <p className="text-xs font-space tracking-[0.35em] uppercase text-white/50">YOU HAVE SEEN THE FIGURE.</p>
          <h2 className="type-display-m font-syne uppercase text-white">
            <FlipWord text="NOW MAKE IT YOURS." accentColor={character.accentColor} />
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-4">
            <span
              onClick={() => setIsCommissionOpen(true)}
              onMouseEnter={() => setCursor('REQUEST', 'hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-3 text-sm font-space tracking-[0.3em] font-semibold uppercase cursor-pointer transition-colors"
              style={{ color: character.accentColor }}
            >
              <span>{character.commerce.primaryCta}</span>
              <span>-&gt;</span>
            </span>

            <span className="hidden md:inline text-white/30 font-space">•</span>

            <span
              onClick={() => navigate('/custom')}
              onMouseEnter={() => setCursor('CREATE', 'hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-3 text-sm font-space tracking-[0.3em] font-semibold text-white/80 hover:text-white cursor-pointer transition-colors uppercase"
            >
              <span>CREATE YOUR OWN</span>
              <span>-&gt;</span>
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};
