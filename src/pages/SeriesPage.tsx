import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSeriesBySlug, getWorldBySlug } from '../data/catalogue';
import { FlipWord } from '../components/ui/FlipWord';
import { useCursor } from '../context/CursorContext';

export const SeriesPage: React.FC = () => {
  const { worldSlug = '', seriesSlug = '' } = useParams<{ worldSlug: string; seriesSlug: string }>();
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();
  const world = getWorldBySlug(worldSlug);
  const series = getSeriesBySlug(worldSlug, seriesSlug);

  if (!world || !series) {
    return (
      <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-space font-bold uppercase">SERIES UNCHARTED</h1>
        <button onClick={() => navigate('/worlds')} className="mt-6 text-xs font-space tracking-[0.2em] text-cyan-300 uppercase">
          RETURN TO WORLDS -&gt;
        </button>
      </div>
    );
  }

  return (
    <div className="series-page min-h-screen text-white relative overflow-hidden" style={{ '--world-accent': world.accentColor } as React.CSSProperties}>
      <div className={`absolute inset-0 bg-gradient-to-br ${world.bgGradient}`} />
      <section className="series-page__hero">
        <div>
          <span>{world.name} / SERIES</span>
          <h1><FlipWord text={series.name} accentColor={world.accentColor} /></h1>
          <p>{series.description}</p>
          <button type="button" onClick={() => navigate(`/worlds/${world.slug}`)}>BACK TO {world.name.toUpperCase()} -&gt;</button>
        </div>
        <img src={series.heroImage} alt={`${series.name} featured 3D model`} />
      </section>

      <section className="series-page__grid" aria-label={`${series.name} models`}>
        {series.products.map((product) => (
          <button
            key={product.slug}
            type="button"
            className="product-card"
            style={{ '--world-accent': product.accentColor } as React.CSSProperties}
            onClick={() => navigate(`/artifacts/${world.slug}/${series.slug}/${product.slug}`)}
            onMouseEnter={() => setCursor(product.name, 'image')}
            onMouseLeave={resetCursor}
          >
            <span>{world.name}</span>
            <img src={product.image} alt={`${product.name} 3D model`} loading="lazy" />
            <strong>{product.name}</strong>
            <em>{product.status.replaceAll('-', ' ')}</em>
          </button>
        ))}
        {series.products.length === 0 && <div className="catalogue-empty">This series is reserved for future models.</div>}
      </section>
    </div>
  );
};
