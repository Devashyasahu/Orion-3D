import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSeriesBySlug, getWorldBySlug, publicModelCountLabel } from '../data/catalogue';
import { FlipWord } from '../components/ui/FlipWord';
import { useCursor } from '../context/CursorContext';
import { FigureImage } from '../components/common/FigureImage';
import { PageMeta } from '../components/common/PageMeta';
import { StatusBadge } from '../components/common/StatusBadge';
import { NotFoundPage } from './NotFoundPage';

export const SeriesPage: React.FC = () => {
  const { worldSlug = '', seriesSlug = '' } = useParams<{ worldSlug: string; seriesSlug: string }>();
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();
  const world = getWorldBySlug(worldSlug);
  const series = getSeriesBySlug(worldSlug, seriesSlug);

  if (!world || !series) {
    return <NotFoundPage title="SERIES UNCHARTED" message="This series is not available in the ORION catalogue." />;
  }

  return (
    <div className="series-page min-h-screen text-white relative overflow-hidden" style={{ '--world-accent': world.accentColor } as React.CSSProperties}>
      <PageMeta
        title={`${series.name} Collectibles | ORION 3D`}
        description={`${series.description} Explore ${publicModelCountLabel(series.products.length, 'coming soon')} in the ${world.name} world.`}
        path={`/worlds/${world.slug}/${series.slug}`}
        image={series.heroImage}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${world.bgGradient}`} />
      <section className="series-page__hero">
        <div>
          <span>{world.name} / SERIES</span>
          <h1><FlipWord text={series.name} accentColor={world.accentColor} className="word-flip--clean" /></h1>
          <p>{series.description}</p>
          <strong>{publicModelCountLabel(series.products.length, 'Coming Soon')}</strong>
          <button type="button" onClick={() => navigate(`/worlds/${world.slug}`)}>BACK TO {world.name.toUpperCase()} -&gt;</button>
        </div>
        <FigureImage src={series.heroImage} alt={`${series.name} featured 3D model`} loading="eager" />
      </section>

      <section className="series-page__grid" aria-label={`${series.name} models`}>
        {series.products.map((product) => (
          <button
            key={product.slug}
            type="button"
            className="product-card"
            style={{ '--world-accent': product.accentColor } as React.CSSProperties}
            onClick={() => navigate(`/artifacts/${world.slug}/${series.slug}/${product.slug}`)}
            onMouseEnter={() => setCursor('VIEW', 'image')}
            onMouseLeave={resetCursor}
          >
            <span>{world.name}</span>
            <FigureImage src={product.image} alt={`${product.name} 3D model`} loading="lazy" />
            <strong>{product.name}</strong>
            <StatusBadge status={product.status} />
            <small>Size and pricing details reserved</small>
            <em>VIEW MODEL -&gt;</em>
          </button>
        ))}
        {series.products.length === 0 && (
          <div className="catalogue-empty catalogue-empty--world">
            <span>COMING SOON</span>
            <h2>{series.name}</h2>
            <p>This series is reserved for future ORION model previews.</p>
          </div>
        )}
      </section>
    </div>
  );
};
