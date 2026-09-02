import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllProducts, getProductByLegacySlug, getProductByPath } from '../data/catalogue';
import { CommissionModal } from '../components/common/CommissionModal';
import { FlipWord } from '../components/ui/FlipWord';
import { useCursor } from '../context/CursorContext';

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
    return (
      <div className="min-h-screen bg-[#040406] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-space font-bold uppercase">MODEL UNFOUND</h1>
        <button onClick={() => navigate('/worlds')} className="mt-6 text-xs font-space tracking-[0.2em] text-cyan-300 hover:underline uppercase">
          EXPLORE WORLDS -&gt;
        </button>
      </div>
    );
  }

  const gallery = product.gallery.length ? product.gallery : [product.image];
  const galleryLabels = ['Complete model', 'Front placeholder', 'Side placeholder', 'Rear placeholder', 'Detail placeholder'];

  return (
    <div className="product-page min-h-screen bg-transparent text-white pb-24 relative overflow-hidden" style={{ '--world-accent': product.accentColor } as React.CSSProperties}>
      <CommissionModal isOpen={isCommissionOpen} onClose={() => setIsCommissionOpen(false)} characterName={product.name} />
      <div className={`absolute inset-0 bg-gradient-to-br ${product.world.bgGradient} opacity-90`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_32%,rgba(125,211,252,0.12),transparent_34%),radial-gradient(circle_at_18%_80%,rgba(255,255,255,0.08),transparent_30%)]" />

      <main className="product-shell">
        <section className="product-hero">
          <div className="product-gallery" aria-label={`${product.name} image gallery`}>
            <div className="product-gallery__stage">
              <img src={gallery[activeImage] || product.image} alt={`${product.name} complete 3D model`} />
            </div>
            <div className="product-gallery__controls">
              <button type="button" aria-label="Previous image" onClick={() => setActiveImage((activeImage + gallery.length - 1) % gallery.length)}><ChevronLeft size={18} /></button>
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
              <button type="button" aria-label="Next image" onClick={() => setActiveImage((activeImage + 1) % gallery.length)}><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className="product-copy">
            <span>{product.world.name} / {product.series.name}</span>
            <h1><FlipWord text={product.name} accentColor={product.accentColor} /></h1>
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
          <div><span>Status</span><strong>{product.status.replaceAll('-', ' ')}</strong></div>
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
                onMouseEnter={() => setCursor(item.name, 'image')}
                onMouseLeave={resetCursor}
              >
                <img src={item.image} alt={`${item.name} 3D model`} loading="lazy" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
