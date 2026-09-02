import { CATALOGUE_WORLDS, countWorldProducts, getWorldBySlug } from './catalogue';

export interface World {
  id: string;
  name: string;
  headline: string;
  subhead: string;
  description: string;
  atmosphere: string;
  themeColor: string;
  bgGradient: string;
  heroImage: string;
  characterSlugs: string[];
}

export const WORLDS: World[] = CATALOGUE_WORLDS.map((world) => ({
  id: world.slug,
  name: world.name.toUpperCase(),
  headline: world.headline,
  subhead: world.description,
  description: world.description,
  atmosphere: world.atmosphere,
  themeColor: world.accentColor,
  bgGradient: world.bgGradient,
  heroImage: world.heroImage,
  characterSlugs: world.series.flatMap((series) => series.products.map((product) => product.slug)),
}));

export function getWorldById(id: string): World | undefined {
  const world = getWorldBySlug(id);

  if (!world) return undefined;

  return {
    id: world.slug,
    name: world.name.toUpperCase(),
    headline: world.headline,
    subhead: world.description,
    description: world.description,
    atmosphere: world.atmosphere,
    themeColor: world.accentColor,
    bgGradient: world.bgGradient,
    heroImage: world.heroImage,
    characterSlugs: world.series.flatMap((series) => series.products.map((product) => product.slug)),
  };
}

export function getWorldModelCount(id: string) {
  const world = getWorldBySlug(id);
  return world ? countWorldProducts(world) : 0;
}
