export type ProductStatus = 'made-to-order' | 'ready-to-ship' | 'concept-preview' | 'coming-soon';
export type ProductFinish = 'painted' | 'unpainted';

export interface CatalogueProduct {
  id: string;
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  description: string;
  sizes: string[];
  finishes: ProductFinish[];
  status: ProductStatus;
  priceRange: [number, number];
  showPrice?: boolean;
  accentColor: string;
  tags?: string[];
}

export interface CatalogueSeries {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  products: CatalogueProduct[];
}

export interface CatalogueWorld {
  id: string;
  name: string;
  slug: string;
  accentColor: string;
  headline: string;
  description: string;
  atmosphere: string;
  bgGradient: string;
  heroImage: string;
  emptyState?: string;
  emptyCta?: string;
  customLink?: string;
  series: CatalogueSeries[];
}

const asset = (path: string) => `/images/artifacts/3d%20print/${path}`;
const gallery = (image: string) => [image, image, image, image];

const product = (
  id: string,
  name: string,
  image: string,
  description: string,
  accentColor: string,
  priceRange: [number, number] = [2499, 8999],
): CatalogueProduct => ({
  id,
  name,
  slug: id,
  image,
  gallery: gallery(image),
  description,
  sizes: ['15 cm desk scale', '22 cm display scale', '32 cm centerpiece scale'],
  finishes: ['painted', 'unpainted'],
  status: 'made-to-order',
  priceRange,
  showPrice: false,
  accentColor,
});

export const modelCountLabel = (count: number) => `${count} ${count === 1 ? 'model' : 'models'}`;

export const publicModelCountLabel = (count: number, emptyState?: string) =>
  count === 0 ? (emptyState || 'Coming Soon') : modelCountLabel(count);

export const getStatusMeta = (status: ProductStatus) => {
  const meta: Record<ProductStatus, { label: string; tone: string }> = {
    'made-to-order': { label: 'Made to Order', tone: 'cyan' },
    'ready-to-ship': { label: 'Ready to Ship', tone: 'green' },
    'concept-preview': { label: 'Concept Preview', tone: 'violet' },
    'coming-soon': { label: 'Coming Soon', tone: 'amber' },
  };

  return meta[status];
};

export const formatStatus = (status: ProductStatus) => getStatusMeta(status).label;

export const canonicalProductPath = (worldSlug: string, seriesSlug: string, productSlug: string) =>
  `/artifacts/${worldSlug}/${seriesSlug}/${productSlug}`;

export const CATALOGUE_WORLDS: CatalogueWorld[] = [
  {
    id: 'anime',
    name: 'Anime',
    slug: 'anime',
    accentColor: '#ef4444',
    headline: 'ENTER THE ANIME WORLD',
    description: 'Manga silhouettes, cinematic poses, and shelf-ready character artifacts staged with sharp editorial contrast.',
    atmosphere: 'Ink-black staging, warm highlights, red cuts, and character-forward motion.',
    bgGradient: 'from-red-950/48 via-zinc-950/72 to-[#050507]',
    heroImage: asset('one%20peace/Zoro.jpg'),
    series: [
      {
        id: 'one-piece',
        name: 'One Piece',
        slug: 'one-piece',
        description: 'Adventure figures with swords, motion, amber light, and display-base presence.',
        heroImage: asset('one%20peace/Zoro.jpg'),
        products: [
          product('roronoa-zoro', 'Roronoa Zoro', asset('one%20peace/Zoro.jpg'), 'A sword-forward collectible posed for a dramatic anime shelf composition.', '#16a34a'),
          product('monkey-d-luffy', 'Monkey D. Luffy', asset('one%20peace/Luffy.jpg'), 'A bright, kinetic adventure figure with strong red and amber shelf energy.', '#f97316'),
          product('sanji', 'Sanji', asset('one%20peace/sanji.jpg'), 'A clean lineup figure designed for a balanced crew display.', '#fde047'),
          { ...product('nami', 'Nami', asset('one%20peace/Luffy.jpg'), 'Placeholder slot for the upcoming Nami model image.', '#fb7185'), status: 'concept-preview' },
        ],
      },
      {
        id: 'death-note',
        name: 'Death Note',
        slug: 'death-note',
        description: 'Psychological figures with black staging, white-paper contrast, and restrained red tension.',
        heroImage: asset('deathnote/god%20of%20death%202.jpg'),
        products: [
          product('ryuk', 'Ryuk', asset('deathnote/god%20of%20death%202.jpg'), 'A supernatural figure framed with near-black atmosphere and winged silhouette.', '#991b1b'),
          product('el', 'L', asset('deathnote/el.jpg'), 'A quiet investigative collectible with cold light and negative space.', '#e5e7eb'),
          product('light-yagami', 'Light Yagami', asset('deathnote/light%20yagami.jpg'), 'A minimal, focused character piece for a darker display scene.', '#dc2626'),
        ],
      },
      {
        id: 'chainsaw-man',
        name: 'Chainsaw Man',
        slug: 'chainsaw-man',
        description: 'Hard manga-panel framing, controlled crimson, and compact figures with sharp attitude.',
        heroImage: asset('chainsaw%20man/makima.jpg'),
        products: [
          product('makima', 'Makima', asset('chainsaw%20man/makima.jpg'), 'A restrained editorial figure with black, cream, and red visual language.', '#b91c1c'),
          product('denji', 'Denji', asset('chainsaw%20man/denji.jpg'), 'A kinetic support figure for hard red-black world staging.', '#ef4444'),
          product('power', 'Power', asset('chainsaw%20man/power.jpg'), 'A compact attitude-heavy figure for a manga-inspired lineup.', '#f97316'),
          product('aki-hayakawa', 'Aki Hayakawa', asset('chainsaw%20man/aki%20hayakawa.jpg'), 'A clean upright figure suited for lineup and collection views.', '#94a3b8'),
        ],
      },
    ],
  },
  {
    id: 'marvel',
    name: 'Marvel',
    slug: 'marvel',
    accentColor: '#ef4444',
    headline: 'ENTER THE MARVEL WORLD',
    description: 'Red-black impact, metal highlights, and iconic silhouettes staged as premium collectibles.',
    atmosphere: 'Concrete pedestals, hard spotlights, comic-book energy, and glossy shadows.',
    bgGradient: 'from-red-950/58 via-zinc-950/62 to-[#050505]',
    heroImage: asset('marvel/deadpool.jpg'),
    series: [
      { id: 'deadpool', name: 'Deadpool', slug: 'deadpool', description: 'A focused red-black arrival artifact with strong shelf attitude.', heroImage: asset('marvel/deadpool.jpg'), products: [product('deadpool', 'Deadpool', asset('marvel/deadpool.jpg'), 'A red-black figure with enough silhouette weight to lead a display scene.', '#ef4444', [2999, 9999])] },
      { id: 'spider-man', name: 'Spider-Man', slug: 'spider-man', description: 'Future Spider-Man models will live here.', heroImage: asset('marvel/deadpool.jpg'), products: [] },
      { id: 'iron-man', name: 'Iron Man', slug: 'iron-man', description: 'Future Iron Man models will live here.', heroImage: '/images/mcu_iron_hero.png', products: [] },
    ],
  },
  {
    id: 'dc',
    name: 'DC',
    slug: 'dc',
    accentColor: '#64748b',
    headline: 'ENTER THE DC WORLD',
    description: 'Graphite museum light, heroic profiles, theatrical villains, and character-specific color accents.',
    atmosphere: 'Rain gloss, graphite darkness, focused spotlights, and deep architectural shadow.',
    bgGradient: 'from-slate-950/80 via-zinc-900/45 to-[#05070d]',
    heroImage: asset('dc/batman.jpg'),
    series: [
      { id: 'batman', name: 'Batman', slug: 'batman', description: 'A dark cape-led collectible chapter.', heroImage: asset('dc/batman.jpg'), products: [product('batman', 'Batman', asset('dc/batman.jpg'), 'A museum-lit graphite figure with cape mass and armor texture.', '#64748b', [2999, 9999])] },
      { id: 'joker', name: 'Joker', slug: 'joker', description: 'Theatrical villain display pieces.', heroImage: asset('dc/joker.jpg'), products: [product('joker', 'Joker', asset('dc/joker.jpg'), 'A theatrical artifact with purple-green contrast and character menace.', '#22c55e', [2999, 9999])] },
      { id: 'superman', name: 'Superman', slug: 'superman', description: 'Bright DC figures with heroic posture.', heroImage: asset('dc/superman.jpg'), products: [product('superman', 'Superman', asset('dc/superman.jpg'), 'A brighter DC artifact with a clean heroic silhouette.', '#2563eb', [2999, 9999])] },
    ],
  },
  {
    id: 'wizarding-world',
    name: 'Wizarding World',
    slug: 'wizarding-world',
    accentColor: '#22c55e',
    headline: 'ENTER THE WIZARDING WORLD',
    description: 'Smoke, stone, parchment warmth, and dark-green magic for character artifacts.',
    atmosphere: 'Candle warmth, stone corridors, green smoke, and magical artifact light.',
    bgGradient: 'from-emerald-950/62 via-stone-900/42 to-[#080908]',
    heroImage: asset('harrypotter/harrypotter.jpg'),
    series: [
      {
        id: 'harry-potter',
        name: 'Harry Potter',
        slug: 'harry-potter',
        description: 'Wands, robes, creature-scale forms, and magical display pieces.',
        heroImage: asset('harrypotter/harrypotter.jpg'),
        products: [
          product('harry-potter', 'Harry Potter', asset('harrypotter/harrypotter.jpg'), 'A cinematic Harry figure for magical collection storytelling.', '#facc15'),
          product('voldemort', 'Voldemort', asset('harrypotter/voldermort.jpg'), 'A dark green magical figure with smoke, stone, and theatrical light.', '#22c55e'),
          product('dumbledore', 'Dumbledore', asset('harrypotter/dumbledore.jpg'), 'A parchment-warm magical portrait for a wizarding display.', '#facc15'),
          product('ron-weasley', 'Ron Weasley', asset('harrypotter/ronn%20weasly.jpg'), 'A supporting figure for the Wizarding World collection.', '#f97316'),
          product('hermione', 'Hermione', asset('harrypotter/harminee.jpg'), 'A clean magical support image for the Wizarding World collection.', '#f59e0b'),
        ],
      },
    ],
  },
  {
    id: 'dark-fantasy',
    name: 'Dark Fantasy',
    slug: 'dark-fantasy',
    accentColor: '#a855f7',
    headline: 'ENTER THE DARK FANTASY WORLD',
    description: 'Gothic school-night energy, strange-light portraits, and eerie original display figures.',
    atmosphere: 'Violet haze, black glass, moonlit texture, and theatrical shadows.',
    bgGradient: 'from-purple-950/44 via-zinc-950/70 to-[#050507]',
    heroImage: '/images/custom_hero.png',
    emptyState: 'WORLD FORMING',
    emptyCta: 'PREVIEW WORLD',
    series: [
      { id: 'wednesday', name: 'Wednesday', slug: 'wednesday', description: 'A reserved category for future Wednesday-inspired collectible models.', heroImage: '/images/custom_hero.png', products: [] },
      { id: 'stranger-things-inspired', name: 'Stranger Things-inspired models', slug: 'stranger-things-inspired', description: 'A future chapter for eerie supernatural shelf pieces.', heroImage: '/images/custom_hero_1787236824668.png', products: [] },
    ],
  },
  {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    accentColor: '#06b6d4',
    headline: 'ENTER THE GAMING WORLD',
    description: 'Boss-scale silhouettes, mecha forms, and future game-character display builds.',
    atmosphere: 'Cyan scan light, black metal, display-grid glow, and arcade motion.',
    bgGradient: 'from-cyan-950/38 via-zinc-950/74 to-[#05070d]',
    heroImage: '/images/gaming_mecha_collectible_1787236843739.png',
    emptyState: 'COMING SOON',
    emptyCta: 'PREVIEW WORLD',
    series: [
      { id: 'future-gaming-characters', name: 'Future gaming characters', slug: 'future-gaming-characters', description: 'A ready home for upcoming gaming models.', heroImage: '/images/gaming_mecha.png', products: [] },
    ],
  },
  {
    id: 'custom-creations',
    name: 'Custom Creations',
    slug: 'custom-creations',
    accentColor: '#facc15',
    headline: 'ENTER CUSTOM CREATIONS',
    description: 'Personal portraits, original characters, and custom figures built from references.',
    atmosphere: 'Studio light, material texture, warm highlights, and human craft.',
    bgGradient: 'from-yellow-950/22 via-zinc-950/76 to-[#060607]',
    heroImage: '/images/custom_hero.png',
    emptyState: 'BUILT FROM YOUR IDEA',
    emptyCta: 'DISCOVER MORE',
    customLink: '/custom',
    series: [
      { id: 'customer-portraits', name: 'Customer portraits', slug: 'customer-portraits', description: 'Future personalized portrait builds.', heroImage: '/images/custom_hero.png', products: [] },
      { id: 'original-characters', name: 'Original characters', slug: 'original-characters', description: 'Original character concepts and display figures.', heroImage: '/images/anime_art_sculpture.png', products: [] },
      { id: 'personalized-figures', name: 'Personalized figures', slug: 'personalized-figures', description: 'Customizable figures built from a personal brief.', heroImage: '/images/studio_finishing.png', products: [] },
    ],
  },
];

export const getWorldBySlug = (slug: string) => CATALOGUE_WORLDS.find((world) => world.slug === slug || world.id === slug);

export const getSeriesBySlug = (worldSlug: string, seriesSlug: string) =>
  getWorldBySlug(worldSlug)?.series.find((series) => series.slug === seriesSlug || series.id === seriesSlug);

export const getAllProducts = () =>
  CATALOGUE_WORLDS.flatMap((world) =>
    world.series.flatMap((series) =>
      series.products.map((item) => ({ ...item, world, series })),
    ),
  );

export const getProductByPath = (worldSlug: string, seriesSlug: string, productSlug: string) =>
  getAllProducts().find((item) => item.world.slug === worldSlug && item.series.slug === seriesSlug && item.slug === productSlug);

export const getProductByLegacySlug = (slug: string) => {
  const aliases: Record<string, string> = {
    zoro: 'roronoa-zoro',
    luffy: 'monkey-d-luffy',
  };

  return getAllProducts().find((item) => item.slug === (aliases[slug] || slug));
};

export const getCanonicalProduct = (slug: string) => {
  const product = getProductByLegacySlug(slug);
  return product ? { product, path: canonicalProductPath(product.world.slug, product.series.slug, product.slug) } : undefined;
};

export const countWorldProducts = (world: CatalogueWorld) =>
  world.series.reduce((sum, series) => sum + series.products.length, 0);

export const getWorldLeadProducts = (world: CatalogueWorld) =>
  world.series.flatMap((series) => series.products.map((item) => ({ ...item, series }))).slice(0, 3);
