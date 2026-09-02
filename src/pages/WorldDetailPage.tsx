import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { CATALOGUE_WORLDS, countWorldProducts, getWorldBySlug, modelCountLabel, publicModelCountLabel } from '../data/catalogue';
import { FlipWord } from '../components/ui/FlipWord';
import { useCursor } from '../context/CursorContext';
import { FigureImage } from '../components/common/FigureImage';
import { PageMeta } from '../components/common/PageMeta';
import { StatusBadge } from '../components/common/StatusBadge';
import { NotFoundPage } from './NotFoundPage';

export const WorldDetailPage: React.FC = () => {
  const { worldId, worldSlug } = useParams<{ worldId: string; worldSlug: string }>();
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();
  const world = getWorldBySlug(worldSlug || worldId || '');
  const [seriesFilter, setSeriesFilter] = useState('all');
  const [characterFilter, setCharacterFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [finishFilter, setFinishFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState(10000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtersButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const products = useMemo(() => {
    if (!world) return [];

    return world.series
      .flatMap((series) => series.products.map((product) => ({ ...product, series })))
      .filter((product) => seriesFilter === 'all' || product.series.slug === seriesFilter)
      .filter((product) => product.name.toLowerCase().includes(characterFilter.toLowerCase()))
      .filter((product) => sizeFilter === 'all' || product.sizes.includes(sizeFilter))
      .filter((product) => finishFilter === 'all' || product.finishes.includes(finishFilter as never))
      .filter((product) => statusFilter === 'all' || product.status === statusFilter)
      .filter((product) => product.priceRange[0] <= priceFilter);
  }, [characterFilter, finishFilter, priceFilter, seriesFilter, sizeFilter, statusFilter, world]);

  const activeFilters = [
    seriesFilter !== 'all' ? ['Series', seriesFilter] : undefined,
    characterFilter ? ['Character', characterFilter] : undefined,
    sizeFilter !== 'all' ? ['Size', sizeFilter] : undefined,
    finishFilter !== 'all' ? ['Finish', finishFilter] : undefined,
    statusFilter !== 'all' ? ['Status', statusFilter] : undefined,
    priceFilter < 10000 ? ['Price', `Under INR ${priceFilter.toLocaleString('en-IN')}`] : undefined,
  ].filter(Boolean) as string[][];

  const clearFilters = () => {
    setSeriesFilter('all');
    setCharacterFilter('');
    setSizeFilter('all');
    setFinishFilter('all');
    setStatusFilter('all');
    setPriceFilter(10000);
  };

  const removeFilter = (name: string) => {
    if (name === 'Series') setSeriesFilter('all');
    if (name === 'Character') setCharacterFilter('');
    if (name === 'Size') setSizeFilter('all');
    if (name === 'Finish') setFinishFilter('all');
    if (name === 'Status') setStatusFilter('all');
    if (name === 'Price') setPriceFilter(10000);
  };

  useEffect(() => {
    if (!filtersOpen) return;

    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>('button, input, select, [tabindex]:not([tabindex="-1"])');
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFiltersOpen(false);
        filtersButtonRef.current?.focus();
      }

      if (event.key === 'Tab' && focusable && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [filtersOpen]);

  if (!world) {
    return <NotFoundPage title="WORLD UNCHARTED" message="This world is not available in the ORION catalogue." />;
  }

  const relatedWorlds = CATALOGUE_WORLDS.filter((item) => item.slug !== world.slug).slice(0, 4);
  const sizes = Array.from(new Set(world.series.flatMap((series) => series.products.flatMap((product) => product.sizes))));
  const worldModelCount = countWorldProducts(world);

  const renderFilterControls = () => (
    <>
      <label>Series<select value={seriesFilter} onChange={(event) => setSeriesFilter(event.target.value)}><option value="all">All series</option>{world.series.map((series) => <option key={series.slug} value={series.slug}>{series.name}</option>)}</select></label>
      <label>Character<input value={characterFilter} onChange={(event) => setCharacterFilter(event.target.value)} placeholder="Search name" /></label>
      <label>Size<select value={sizeFilter} onChange={(event) => setSizeFilter(event.target.value)}><option value="all">Any size</option>{sizes.map((size) => <option key={size} value={size}>{size}</option>)}</select></label>
      <label>Finish<select value={finishFilter} onChange={(event) => setFinishFilter(event.target.value)}><option value="all">Any finish</option><option value="painted">Painted</option><option value="unpainted">Unpainted</option></select></label>
      <label>Status<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">Any status</option><option value="made-to-order">Made to Order</option><option value="ready-to-ship">Ready to Ship</option><option value="concept-preview">Concept Preview</option><option value="coming-soon">Coming Soon</option></select></label>
      <label>Price range<span>Up to INR {priceFilter.toLocaleString('en-IN')}</span><input type="range" min="2000" max="10000" step="500" value={priceFilter} onChange={(event) => setPriceFilter(Number(event.target.value))} /></label>
    </>
  );

  return (
    <div className={`catalogue-page min-h-screen bg-transparent text-white pb-28 relative overflow-hidden`}>
      <PageMeta
        title={`${world.name} 3D Models | ORION 3D`}
        description={`${world.description} Browse available ${world.name} series and model previews in the ORION 3D catalogue.`}
        path={`/worlds/${world.slug}`}
        image={world.heroImage}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${world.bgGradient} opacity-85`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_76%_72%,rgba(125,211,252,0.10),transparent_34%)]" />

      <section className="catalogue-hero">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="catalogue-hero__copy">
          <span style={{ color: world.accentColor }}>ORION WORLD / {world.slug}</span>
          <h1><FlipWord text={world.headline} accentColor={world.accentColor} className="word-flip--clean" /></h1>
          <p>{world.description}</p>
          <div className="catalogue-hero__stats">
            <strong>{world.series.length}</strong><span>series</span>
            <strong>{worldModelCount === 0 ? world.emptyState : worldModelCount}</strong><span>{worldModelCount === 1 ? 'model' : worldModelCount === 0 ? 'status' : 'models'}</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="catalogue-hero__media" style={{ '--world-accent': world.accentColor } as React.CSSProperties}>
          <FigureImage src={world.heroImage} alt={`${world.name} featured model`} loading="eager" />
        </motion.div>
      </section>

      <main className="catalogue-main">
        <section className="series-rail" aria-label={`${world.name} series`}>
          <button type="button" aria-label="Scroll series left"><ChevronLeft size={18} /></button>
          <div>
            {world.series.map((series) => (
              <article key={series.slug} className="series-chip" style={{ '--world-accent': world.accentColor } as React.CSSProperties}>
                <FigureImage src={series.heroImage} alt="" loading="lazy" />
                <span>{publicModelCountLabel(series.products.length, series.products.length === 0 ? 'Coming Soon' : undefined)}</span>
                <h2>{series.name}</h2>
                <p>{series.description}</p>
                <button
                  type="button"
                  onClick={() => series.products.length === 1 ? navigate(`/artifacts/${world.slug}/${series.slug}/${series.products[0].slug}`) : navigate(`/worlds/${world.slug}/${series.slug}`)}
                  onMouseEnter={() => setCursor('OPEN', 'hover')}
                  onMouseLeave={resetCursor}
                >
                  OPEN SERIES -&gt;
                </button>
              </article>
            ))}
          </div>
          <button type="button" aria-label="Scroll series right"><ChevronRight size={18} /></button>
        </section>

        <section className="catalogue-workbench">
          <div className="mobile-filter-bar">
            <button ref={filtersButtonRef} type="button" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal size={16} /> FILTERS {activeFilters.length > 0 && <span>{activeFilters.length}</span>}
            </button>
            <strong>{modelCountLabel(products.length)} matching</strong>
          </div>
          {activeFilters.length > 0 && (
            <div className="filter-chips" aria-label="Selected filters">
              {activeFilters.map(([name, value]) => (
                <button key={name} type="button" onClick={() => removeFilter(name)}>
                  {name}: {value} <X size={12} />
                </button>
              ))}
            </div>
          )}
          <aside className="catalogue-filters" aria-label="Catalogue filters">
            <span>FILTERS</span>
            {renderFilterControls()}
          </aside>

          <div className="product-grid">
            {products.map((product) => (
              <button
                key={`${product.series.slug}-${product.slug}`}
                type="button"
                className="product-card"
                style={{ '--world-accent': product.accentColor } as React.CSSProperties}
                onClick={() => navigate(`/artifacts/${world.slug}/${product.series.slug}/${product.slug}`)}
                onMouseEnter={() => setCursor('VIEW', 'image')}
                onMouseLeave={resetCursor}
              >
                <span>{product.series.name}</span>
                <FigureImage src={product.image} alt={`${product.name} 3D model`} loading="lazy" />
                <strong>{product.name}</strong>
                <StatusBadge status={product.status} />
                <small>Size and pricing details reserved</small>
                <em>VIEW MODEL -&gt;</em>
              </button>
            ))}
            {products.length === 0 && (
              <div className="catalogue-empty catalogue-empty--world" style={{ '--world-accent': world.accentColor } as React.CSSProperties}>
                <span>{world.emptyState || 'COMING SOON'}</span>
                <h2>{world.name}</h2>
                <p>{worldModelCount === 0 ? world.atmosphere : 'No models match the current filters.'}</p>
                <button type="button" onClick={() => navigate(world.customLink || '/worlds')}>{world.emptyCta || 'DISCOVER MORE'} -&gt;</button>
              </div>
            )}
          </div>
        </section>

        {filtersOpen && (
          <div className="filter-drawer" role="dialog" aria-modal="true" aria-label="Catalogue filters">
            <button className="filter-drawer__scrim" type="button" aria-label="Close filters" onClick={() => { setFiltersOpen(false); filtersButtonRef.current?.focus(); }} />
            <div className="filter-drawer__panel" ref={drawerRef}>
              <div className="filter-drawer__head">
                <span>FILTERS</span>
                <strong>{modelCountLabel(products.length)} matching</strong>
                <button type="button" aria-label="Close filters" onClick={() => { setFiltersOpen(false); filtersButtonRef.current?.focus(); }}><X size={18} /></button>
              </div>
              <div className="catalogue-filters catalogue-filters--drawer">
                {renderFilterControls()}
              </div>
              <div className="filter-drawer__actions">
                <button type="button" onClick={clearFilters}>CLEAR ALL</button>
                <button type="button" onClick={() => { setFiltersOpen(false); filtersButtonRef.current?.focus(); }}>APPLY FILTERS</button>
              </div>
            </div>
          </div>
        )}

        <nav className="related-worlds" aria-label="Related worlds">
          {relatedWorlds.map((item) => (
            <button key={item.slug} type="button" onClick={() => navigate(`/worlds/${item.slug}`)} style={{ '--world-accent': item.accentColor } as React.CSSProperties}>
              {item.name} <span>-&gt;</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
};
