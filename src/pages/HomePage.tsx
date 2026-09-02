import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FlipWord } from '../components/ui/FlipWord';
import { WORLDS } from '../data/worlds';
import { getFeaturedArtifacts } from '../data/characters';
import { useCursor } from '../context/CursorContext';
import { CommissionModal } from '../components/common/CommissionModal';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const [activeUniverse, setActiveUniverse] = useState(0);
  const [activeArtifact, setActiveArtifact] = useState(0);
  const [realitySplit, setRealitySplit] = useState(54);
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 760], [1, 0.08]);
  const vaultArtifacts = getFeaturedArtifacts();
  const activeCharacter = vaultArtifacts[activeArtifact] || vaultArtifacts[0];
  const activeWorld = WORLDS[activeUniverse] || WORLDS[0];
  const supportingWorlds = WORLDS.filter((world) => world.id !== activeWorld.id).slice(0, 2);
  const heroSpotlight = {
    '--spot-x': `${50 + mousePos.x * 10}%`,
    '--spot-y': `${42 + mousePos.y * 8}%`,
  } as React.CSSProperties;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX - innerWidth / 2) / (innerWidth / 2),
        y: (e.clientY - innerHeight / 2) / (innerHeight / 2),
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden">
      <CommissionModal isOpen={isCommissionOpen} onClose={() => setIsCommissionOpen(false)} characterName={activeCharacter.name} />

      <section className="orion-arrival orion-arrival--simple" style={heroSpotlight}>
        <motion.div style={{ opacity: heroOpacity }} className="orion-arrival__image">
          <img src="/images/artifacts/3d%20print/marvel/deadpool.jpg" alt="Deadpool collectible figure emerging from darkness" />
        </motion.div>
        <div className="orion-arrival__shade" />
        <div className="orion-arrival__spotlight" />

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="orion-arrival__content"
        >
          <span>ORION 3D</span>
          <h1>
            <strong>COLLECT</strong>
            <strong>THE IMPOSSIBLE.</strong>
          </h1>
          <p>Fictional characters escaped their worlds and became physical collectibles.</p>
          <div className="orion-proof-line" aria-label="Product proof">
            <span>3D printed</span>
            <span>Hand finished</span>
            <span>Made in India</span>
          </div>
          <button
            type="button"
            onClick={() => document.getElementById('world-discovery')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setCursor('EXPLORE COLLECTION', 'hover')}
            onMouseLeave={resetCursor}
          >
            EXPLORE THE COLLECTION -&gt;
          </button>
          <button
            type="button"
            onClick={() => navigate('/custom')}
            onMouseEnter={() => setCursor('CREATE CUSTOM', 'hover')}
            onMouseLeave={resetCursor}
            className="orion-arrival__secondary"
          >
            CREATE A CUSTOM FIGURE -&gt;
          </button>
        </motion.div>
      </section>

      <section
        id="world-discovery"
        className={`world-gate world-gate--${activeWorld.id}`}
        style={{ '--universe-accent': activeWorld.themeColor } as React.CSSProperties}
      >
        <div className="world-gate__texture" />
        <div className="world-gate__layout">
          <div className="world-gate__copy">
            <span>CHAPTER 02 / ENTER A WORLD</span>
            <div className="world-gate__titles" role="tablist" aria-label="Choose an Orion world">
              {WORLDS.map((world, index) => (
                <button
                  key={world.id}
                  type="button"
                  role="tab"
                  aria-selected={activeUniverse === index}
                  onClick={() => setActiveUniverse(index)}
                  onMouseEnter={() => setCursor(world.name, 'hover')}
                  onMouseLeave={resetCursor}
                  className={activeUniverse === index ? 'is-active' : ''}
                  style={{ '--tab-accent': world.themeColor } as React.CSSProperties}
                >
                  <em>{String(index + 1).padStart(2, '0')}</em>
                  {world.name}
                </button>
              ))}
            </div>
            <p>{activeWorld.subhead}</p>
            <div className="world-gate__facts">
              <span>{getFeaturedArtifacts().filter((artifact) => artifact.worldId === activeWorld.id).length || activeWorld.characterSlugs.length} artifacts</span>
              <span>Made to order</span>
            </div>
            <button
              type="button"
              onClick={() => navigate(`/world/${activeWorld.id}`)}
              onMouseEnter={() => setCursor('ENTER WORLD', 'hover')}
              onMouseLeave={resetCursor}
              className="orion-text-cta"
            >
              ENTER WORLD -&gt;
            </button>
          </div>

          <div className="world-gate__stage">
            <div className="world-gate__cut" />
            <img src={activeWorld.heroImage} alt={activeWorld.name} loading="lazy" />
            <div className="world-gate__ghosts">
              {supportingWorlds.map((world) => (
                <img key={world.id} src={world.heroImage} alt="" loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`artifact-encounter artifact-${activeCharacter.slug} image-mode-${activeCharacter.imageMode}`} style={{ '--artifact-accent': activeCharacter.accentColor } as React.CSSProperties}>
        <div className="artifact-encounter__figure">
          <img src={activeCharacter.heroImage} alt={activeCharacter.name} loading="lazy" />
        </div>
        <div className="artifact-encounter__copy">
          <span>ORION / ARTIFACT {String(activeArtifact + 1).padStart(3, '0')}</span>
          <h2>{activeCharacter.name}</h2>
          <div className="artifact-metadata">
            <span>{activeCharacter.worldName}</span>
            <span>{activeCharacter.metadata.edition}</span>
            <span>{activeCharacter.commerce.priceLabel}</span>
          </div>
          <dl className="artifact-spec-grid">
            <div>
              <dt>Height</dt>
              <dd>{activeCharacter.metadata.height}</dd>
            </div>
            <div>
              <dt>Material</dt>
              <dd>{activeCharacter.metadata.material}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{activeCharacter.metadata.printTimeHours}</dd>
            </div>
          </dl>
          <p>{activeCharacter.story}</p>
          <div className="commerce-strip">
            <span>{activeCharacter.commerce.availability}</span>
            <button
              type="button"
              onClick={() => setIsCommissionOpen(true)}
              onMouseEnter={() => setCursor(activeCharacter.commerce.primaryCta, 'hover')}
              onMouseLeave={resetCursor}
            >
              {activeCharacter.commerce.primaryCta}
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/character/${activeCharacter.slug}`)}
            onMouseEnter={() => setCursor('DISCOVER ARTIFACT', 'hover')}
            onMouseLeave={resetCursor}
            className="orion-text-cta"
          >
            DISCOVER ARTIFACT -&gt;
          </button>
        </div>
      </section>

      <section className="vault-chapter" style={{ '--artifact-accent': activeCharacter.accentColor } as React.CSSProperties}>
        <div className="vault-chapter__head">
          <span>CHAPTER 04 / THE VAULT</span>
          <h2>
            <FlipWord text="THE VAULT" accentColor={activeCharacter.accentColor} />
          </h2>
          <button
            type="button"
            onClick={() => navigate('/worlds')}
            onMouseEnter={() => setCursor('OPEN VAULT', 'hover')}
            onMouseLeave={resetCursor}
            className="orion-text-cta"
          >
            OPEN FULL VAULT -&gt;
          </button>
        </div>
        <div className="vault-chapter__commerce">
          <span>{String(activeArtifact + 1).padStart(2, '0')} / {vaultArtifacts.length}</span>
          <strong>{activeCharacter.name}</strong>
          <em>{activeCharacter.worldName}</em>
          <small>{activeCharacter.commerce.priceLabel} / {activeCharacter.commerce.availability}</small>
          <button
            type="button"
            onClick={() => setIsCommissionOpen(true)}
            onMouseEnter={() => setCursor(activeCharacter.commerce.primaryCta, 'hover')}
            onMouseLeave={resetCursor}
          >
            {activeCharacter.commerce.primaryCta}
          </button>
        </div>
        <div className="vault-chapter__rail" role="tablist" aria-label="Featured Orion artifacts">
          {vaultArtifacts.map((character, index) => (
            <button
              key={character.slug}
              type="button"
              role="tab"
              aria-selected={activeArtifact === index}
              onClick={() => setActiveArtifact(index)}
              onMouseEnter={() => setCursor(character.name, 'image')}
              onMouseLeave={resetCursor}
              className={`${activeArtifact === index ? 'is-active' : ''} artifact-${character.slug}`}
              style={{ '--artifact-accent': character.accentColor } as React.CSSProperties}
            >
              <img src={character.heroImage} alt="" loading="lazy" />
              <span>{character.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="reality-drag">
        <div className="reality-drag__copy">
          <span>CHAPTER 05 / DIGITAL TO PHYSICAL</span>
          <h2>
            DRAG <FlipWord text="FICTION" accentColor="#facc15" /> INTO REALITY
          </h2>
        </div>
        <div className="reality-drag__stage" style={{ '--split': `${realitySplit}%` } as React.CSSProperties}>
          <img src="/images/artifacts/3d%20print/marvel/deadpool.jpg" alt="Uploaded Deadpool artifact image" className="reality-drag__digital" loading="lazy" />
          <div className="reality-drag__physical">
            <img src="/images/studio_finishing.png" alt="Finished physical figure stage" loading="lazy" />
          </div>
          <div className="reality-drag__handle" />
          <input
            type="range"
            min="18"
            max="82"
            value={realitySplit}
            onChange={(event) => setRealitySplit(Number(event.target.value))}
            aria-label="Drag between digital sculpt and physical collectible"
          />
          <div className="reality-drag__labels">
            <span>DIGITAL SCULPT</span>
            <span>FINISHED PRINT</span>
          </div>
        </div>
        <p className="reality-drag__caption">Sculpt - Print - Hand Finish</p>
      </section>

      <section className="forge-tease">
        <span>CHAPTER 06 / THE FORGE</span>
        <h2>
          WHO DO YOU WANT<br />
          TO BRING INTO REALITY?
        </h2>
        <div className="forge-tease__choices" aria-label="Forge creation types">
          <button>A CHARACTER <small>Reference images</small></button>
          <button>YOURSELF <small>Portrait or avatar</small></button>
          <button>AN ORIGINAL CREATION <small>Concept brief</small></button>
        </div>
        <p className="forge-tease__note">Includes sculpt preview, one revision round, production estimate, and quote before payment.</p>
        <button
          type="button"
          onClick={() => navigate('/custom')}
          onMouseEnter={() => setCursor('ENTER THE FORGE', 'hover')}
          onMouseLeave={resetCursor}
          className="orion-text-cta"
        >
          ENTER THE FORGE -&gt;
        </button>
      </section>

      <section className="human-craft">
        <div>
          <span>CHAPTER 07 / HUMAN CRAFT</span>
          <h2>
            DIGITAL PRECISION.<br />
            HUMAN CRAFT.
          </h2>
          <p>Machines make the form. People give it soul through sanding, painting, assembly, and inspection.</p>
        </div>
        <div className="human-craft__images">
          <img src="/images/studio_printing.png" alt="Orion 3D printing process" loading="lazy" />
          <img src="/images/studio_finishing.png" alt="Orion physical finishing process" loading="lazy" />
        </div>
      </section>

      <section className="orion-finale">
        <span>FINAL CHAPTER</span>
        <h2>
          YOUR COLLECTION<br />
          ISN'T FINISHED.
        </h2>
        <div>
          <button type="button" onClick={() => navigate('/worlds')}>SHOP COLLECTIBLES -&gt;</button>
          <button type="button" onClick={() => navigate('/custom')}>START A CUSTOM PROJECT -&gt;</button>
        </div>
      </section>
    </div>
  );
};
