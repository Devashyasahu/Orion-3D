import { useEffect } from 'react';

const SITE_URL = 'https://orion-3-d.vercel.app';
const FALLBACK_IMAGE = '/images/orion-hero-materializing.png';

type MetaName = 'description' | 'twitter:card' | 'twitter:title' | 'twitter:description' | 'twitter:image';
type MetaProperty = 'og:title' | 'og:description' | 'og:image' | 'og:url' | 'og:type';

interface PageMetaProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const absoluteUrl = (pathOrUrl: string) => {
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
};

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");

  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }

  element.href = href;
};

export function PageMeta({ title, description, path = '/', image = FALLBACK_IMAGE }: PageMetaProps) {
  useEffect(() => {
    const canonical = absoluteUrl(path);
    const shareImage = absoluteUrl(image || FALLBACK_IMAGE);
    document.title = title;

    const nameMeta: Record<MetaName, string> = {
      description,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': shareImage,
    };

    const propertyMeta: Record<MetaProperty, string> = {
      'og:title': title,
      'og:description': description,
      'og:image': shareImage,
      'og:url': canonical,
      'og:type': 'website',
    };

    Object.entries(nameMeta).forEach(([name, content]) => upsertMeta(`meta[name='${name}']`, { name, content }));
    Object.entries(propertyMeta).forEach(([property, content]) => upsertMeta(`meta[property='${property}']`, { property, content }));
    upsertCanonical(canonical);
  }, [description, image, path, title]);

  return null;
}
