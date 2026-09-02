import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATALOGUE_WORLDS, getWorldBySlug } from '../data/catalogue';
import { FlipWord } from '../components/ui/FlipWord';
import { useCursor } from '../context/CursorContext';

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

  if (!world) {
    return (
      <div className="min-h-screen bg-[#070e1b] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-syne font-bold uppercase tracking-tight">WORLD UNCHARTED</h1>
        <button onClick={() => navigate('/worlds')} className="mt-6 text-xs font-space tracking-[0.2em] text-cyan-300 hover:underline uppercase font-semibold">
          RETURN TO WORLDS -&gt;
        </button>
      </div>
    );
  }

  const relatedWorlds = CATALOGUE_WORLDS.filter((item) => item.slug !== world.slug).slice(0, 4);
  const sizes = Array.from(new Set(world.series.flatMap((series) => series.products.flatMap((product) => product.sizes))));

  return (
    <div className={`catalogue-page min-h-screen bg-transparent text-white pb-28 relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${world.bgGradient} opacity-85`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_76%_72%,rgba(125,211,252,0.10),transparent_34%)]" />

      <section className="catalogue-hero">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="catalogue-hero__copy">
          <span style={{ color: world.accentColor }}>ORION WORLD / {world.slug}</span>
          <h1><FlipWord text={world.headline} accentColor={world.accentColor} /></h1>
          <p>{world.description}</p>
          <div className="catalogue-hero__stats">
            <strong>{world.series.length}</strong><span>series</span>
            <strong>{world.series.reduce((sum, series) => sum + series.products.length, 0)}</strong><span>models</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="catalogue-hero__media" style={{ '--world-accent': world.accentColor } as React.CSSProperties}>
          <img src={world.heroImage} alt={`${world.name} featured model`} />
        </motion.div>
      </section>

      <main className="catalogue-main">
        <section className="series-rail" aria-label={`${world.name} series`}>
          <button type="button" aria-label="Scroll series left"><ChevronLeft size={18} /></button>
          <div>
            {world.series.map((series) => (
              <article key={series.slug} className="series-chip" style={{ '--world-accent': world.accentColor } as React.CSSProperties}>
                <img src={series.heroImage} alt="" loading="lazy" />
                <span>{series.products.length || 'Future'} models</span>
                <h2>{series.name}</h2>
                <p>{series.description}</p>
                <button
                  type="button"
                  onClick={() => series.products.length === 1 ? navigate(`/artifacts/${world.slug}/${series.slug}/${series.products[0].slug}`) : navigate(`/worlds/${world.slug}/${series.slug}`)}
                  onMouseEnter={() => setCursor(series.name, 'hover')}
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
          <aside className="catalogue-filters" aria-label="Catalogue filters">
            <span>FILTERS</span>
            <label>Series<select value={seriesFilter} onChange={(event) => setSeriesFilter(event.target.value)}><option value="all">All series</option>{world.series.map((series) => <option key={series.slug} value={series.slug}>{series.name}</option>)}</select></label>
            <label>Character<input value={characterFilter} onChange={(event) => setCharacterFilter(event.target.value)} placeholder="Search name" /></label>
            <label>Size<select value={sizeFilter} onChange={(event) => setSizeFilter(event.target.value)}><option value="all">Any size</option>{sizes.map((size) => <option key={size} value={size}>{size}</option>)}</select></label>
            <label>Finish<select value={finishFilter} onChange={(event) => setFinishFilter(event.target.value)}><option value="all">Any finish</option><option value="painted">Painted</option><option value="unpainted">Unpainted</option></select></label>
            <label>Status<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">Any status</option><option value="made-to-order">Made to order</option><option value="ready-to-ship">Ready to ship</option><option value="concept">Concept</option></select></label>
            <label>Price range<span>Up to INR {priceFilter.toLocaleString('en-IN')}</span><input type="range" min="2000" max="10000" step="500" value={priceFilter} onChange={(event) => setPriceFilter(Number(event.target.value))} /></label>
          </aside>

          <div className="product-grid">
            {products.map((product) => (
              <button
                key={`${product.series.slug}-${product.slug}`}
                type="button"
                className="product-card"
                style={{ '--world-accent': product.accentColor } as React.CSSProperties}
                onClick={() => navigate(`/artifacts/${world.slug}/${product.series.slug}/${product.slug}`)}
                onMouseEnter={() => setCursor(product.name, 'image')}
                onMouseLeave={resetCursor}
              >
                <span>{product.series.name}</span>
                <img src={product.image} alt={`${product.name} 3D model`} loading="lazy" />
                <strong>{product.name}</strong>
                <em>{product.status.replaceAll('-', ' ')}</em>
              </button>
            ))}
            {products.length === 0 && <div className="catalogue-empty">No models match the current filters.</div>}
          </div>
        </section>

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
