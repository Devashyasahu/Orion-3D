import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatStatus, getAllProducts, getProductByLegacySlug, getProductByPath } from '../data/catalogue';
import { CommissionModal } from '../components/common/CommissionModal';
import { FlipWord } from '../components/ui/FlipWord';
import { useCursor } from '../context/CursorContext';
import { FigureImage } from '../components/common/FigureImage';
import { PageMeta } from '../components/common/PageMeta';
import { StatusBadge } from '../components/common/StatusBadge';
import { NotFoundPage } from './NotFoundPage';

export const CharacterDetailPage: React.FC = () => {
  const { slug, worldSlug, seriesSlug, productSlug } = useParams<{ slug: string; worldSlug: string; seriesSlug: string; productSlug: string }>();
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const product = worldSlug && seriesSlug && productSlug
    ? getProductByPath(worldSlug, seriesSlug, productSlug)
    : getProductByLegacySlug(slug || '');
  const [activeImage, setActiveImage] = useState(0);

  const related = useMemo(() => {
    if (!product) return [];
    return getAllProducts()
      .filter((item) => item.slug !== product.slug && (item.world.slug === product.world.slug || item.series.slug === product.series.slug))
      .slice(0, 8);
  }, [product]);

  if (!product) {
    return <NotFoundPage title="MODEL UNFOUND" message="This product URL does not match a published ORION model." />;
  }

  const gallery = product.gallery.length ? product.gallery : [product.image];
  const galleryLabels = ['Complete model', 'Front placeholder', 'Side placeholder', 'Rear placeholder', 'Detail placeholder'];
  const showNextImage = () => setActiveImage((activeImage + 1) % gallery.length);
  const showPreviousImage = () => setActiveImage((activeImage + gallery.length - 1) % gallery.length);

  const handleGalleryPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const startX = event.clientX;
    const startY = event.clientY;
    const target = event.currentTarget;
    target.setPointerCapture(event.pointerId);

    const onPointerUp = (upEvent: PointerEvent) => {
      const deltaX = upEvent.clientX - startX;
      const deltaY = upEvent.clientY - startY;
      if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
        if (deltaX < 0) showNextImage();
        else showPreviousImage();
      }
      target.removeEventListener('pointerup', onPointerUp);
      target.removeEventListener('pointercancel', onPointerUp);
    };

    target.addEventListener('pointerup', onPointerUp);
    target.addEventListener('pointercancel', onPointerUp);
  };

  return (
    <div className="product-page min-h-screen bg-transparent text-white pb-24 relative overflow-hidden" style={{ '--world-accent': product.accentColor } as React.CSSProperties}>
      <PageMeta
        title={`${product.name} 3D Figure | ORION 3D`}
        description={`${product.description} View size, finish, gallery, and reservation options for this ORION 3D figure.`}
        path={`/artifacts/${product.world.slug}/${product.series.slug}/${product.slug}`}
        image={product.image}
      />
      <CommissionModal isOpen={isCommissionOpen} onClose={() => setIsCommissionOpen(false)} characterName={product.name} />
      <div className={`absolute inset-0 bg-gradient-to-br ${product.world.bgGradient} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_32%,rgba(125,211,252,0.12),transparent_34%),radial-gradient(circle_at_18%_80%,rgba(255,255,255,0.08),transparent_30%)]" />

      <main className="product-shell">
        <section className="product-hero">
          <div className="product-gallery" aria-label={`${product.name} image gallery`}>
            <div className="product-gallery__stage" onPointerDown={handleGalleryPointerDown}>
              <FigureImage src={gallery[activeImage] || product.image} alt={`${product.name} complete 3D model`} loading="eager" />
            </div>
            <div className="product-gallery__controls">
              <button type="button" aria-label="Previous image" onClick={showPreviousImage}><ChevronLeft size={18} /></button>
              <div>
                {galleryLabels.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    className={activeImage === index % gallery.length ? 'is-active' : ''}
                    onClick={() => setActiveImage(index % gallery.length)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button type="button" aria-label="Next image" onClick={showNextImage}><ChevronRight size={18} /></button>
            </div>
            <div className="product-gallery__dots" aria-label="Gallery position">
              {gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={activeImage === index ? 'is-active' : ''}
                  aria-label={`Show image ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </div>

          <div className="product-copy">
            <span>{product.world.name} / {product.series.name}</span>
            <h1><FlipWord text={product.name} accentColor={product.accentColor} className="word-flip--clean" /></h1>
            <StatusBadge status={product.status} />
            <p>{product.description}</p>
            <div className="product-options">
              <fieldset>
                <legend>Size options</legend>
                {product.sizes.map((size) => <label key={size}><input type="radio" name="size" defaultChecked={size === product.sizes[0]} />{size}</label>)}
              </fieldset>
              <fieldset>
                <legend>Finish options</legend>
                {product.finishes.map((finish) => <label key={finish}><input type="radio" name="finish" defaultChecked={finish === product.finishes[0]} />{finish}</label>)}
              </fieldset>
            </div>
            <div className="product-actions">
              <button type="button" onClick={() => setIsCommissionOpen(true)}>RESERVE THIS BUILD</button>
              <button type="button" onClick={() => navigate('/custom')}>CREATE YOUR VERSION</button>
            </div>
          </div>
        </section>

        <section className="product-specs" aria-label="Model specifications">
          <div><span>World</span><strong>{product.world.name}</strong></div>
          <div><span>Series</span><strong>{product.series.name}</strong></div>
          <div><span>Status</span><strong>{formatStatus(product.status)}</strong></div>
          <div><span>Pricing</span><strong>Reserved for final studio pricing</strong></div>
          <div><span>Media</span><strong>Front, side, rear, and detail slots ready</strong></div>
        </section>

        <section className="related-products" aria-label="Related products">
          <div className="related-products__head">
            <span>RELATED CHARACTERS / SERIES</span>
            <button type="button" onClick={() => navigate(`/worlds/${product.world.slug}/${product.series.slug}`)}>OPEN SERIES -&gt;</button>
          </div>
          <div className="related-products__row">
            {[...related, ...related].map((item, index) => (
              <button
                key={`${item.slug}-${index}`}
                type="button"
                onClick={() => navigate(`/artifacts/${item.world.slug}/${item.series.slug}/${item.slug}`)}
                onMouseEnter={() => setCursor('VIEW', 'image')}
                onMouseLeave={resetCursor}
                tabIndex={index >= related.length ? -1 : 0}
                aria-hidden={index >= related.length}
              >
                <FigureImage src={item.image} alt={`${item.name} 3D model`} loading="lazy" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
