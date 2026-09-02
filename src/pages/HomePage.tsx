import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FlipWord } from '../components/ui/FlipWord';
import { CATALOGUE_WORLDS, countWorldProducts, getWorldLeadProducts } from '../data/catalogue';
import { getFeaturedArtifacts } from '../data/characters';
import { useCursor } from '../context/CursorContext';
import { CommissionModal } from '../components/common/CommissionModal';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const [activeArtifact, setActiveArtifact] = useState(0);
  const [realitySplit, setRealitySplit] = useState(54);
  const { scrollY } = useScroll();

  const heroOpacity = useTransform(scrollY, [0, 760], [1, 0.08]);
  const vaultArtifacts = getFeaturedArtifacts();
  const activeCharacter = vaultArtifacts[activeArtifact] || vaultArtifacts[0];
  const firstWorldRow = CATALOGUE_WORLDS;
  const secondWorldRow = [...CATALOGUE_WORLDS].reverse();
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

  const handleGridPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const grid = gridRef.current;
    if (!grid) return;

    const pointerStart = event.clientX;
    const scrollStart = grid.scrollLeft;
    grid.setPointerCapture(event.pointerId);
    grid.dataset.dragging = 'true';

    const onPointerMove = (moveEvent: PointerEvent) => {
      grid.scrollLeft = scrollStart - (moveEvent.clientX - pointerStart);
    };

    const stopDragging = () => {
      grid.dataset.dragging = 'false';
      grid.removeEventListener('pointermove', onPointerMove);
      grid.removeEventListener('pointerup', stopDragging);
      grid.removeEventListener('pointercancel', stopDragging);
    };

    grid.addEventListener('pointermove', onPointerMove);
    grid.addEventListener('pointerup', stopDragging);
    grid.addEventListener('pointercancel', stopDragging);
  };

  const renderWorldCard = (world: (typeof CATALOGUE_WORLDS)[number], duplicateIndex: number) => {
    const products = getWorldLeadProducts(world);
    const lead = products[0];
    const supporting = products.slice(1, 3);

    return (
      <article
        key={`${world.slug}-${duplicateIndex}`}
        className="world-marquee-card"
        style={{ '--world-accent': world.accentColor } as React.CSSProperties}
      >
        <button
          type="button"
          className="world-marquee-card__hit"
          onClick={() => navigate(`/worlds/${world.slug}`)}
          onMouseEnter={() => setCursor(`ENTER ${world.name}`, 'hover')}
          onMouseLeave={resetCursor}
          aria-label={`Explore ${world.name}`}
        />
        <div className="world-marquee-card__media">
          <div className="world-marquee-card__glow" />
          <img
            src={lead?.image || world.heroImage}
            alt=""
            className="world-marquee-card__lead"
            loading={duplicateIndex === 0 ? 'eager' : 'lazy'}
          />
          {supporting.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              className={`world-marquee-card__support world-marquee-card__support--${index + 1}`}
              aria-label={`Open ${item.name}`}
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/artifacts/${world.slug}/${item.series.slug}/${item.slug}`);
              }}
              onMouseEnter={() => setCursor(item.name, 'image')}
              onMouseLeave={resetCursor}
            >
              <img src={item.image} alt={`${item.name} 3D model`} loading="lazy" />
            </button>
          ))}
        </div>
        <div className="world-marquee-card__copy">
          <span>{countWorldProducts(world)} models</span>
          <h3>{world.name}</h3>
          <p>{world.description}</p>
          <strong>EXPLORE WORLD -&gt;</strong>
        </div>
      </article>
    );
  };

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

      <section id="world-discovery" className="world-marquee-section" aria-labelledby="choose-world-title">
        <div className="world-marquee-section__head">
          <span>CHAPTER 02 / ENTER A WORLD</span>
          <h2 id="choose-world-title">CHOOSE YOUR WORLD</h2>
          <p>Start with a universe, move into a series, then open the individual model page.</p>
        </div>

        <div
          ref={gridRef}
          className="world-marquee"
          onPointerDown={handleGridPointerDown}
          aria-label="Scrollable Orion worlds"
        >
          <div className="world-marquee__row world-marquee__row--left">
            {[...firstWorldRow, ...firstWorldRow].map(renderWorldCard)}
          </div>
          <div className="world-marquee__row world-marquee__row--right">
            {[...secondWorldRow, ...secondWorldRow].map(renderWorldCard)}
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
