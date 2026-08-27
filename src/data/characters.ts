export interface Artifact {
  id: string;
  slug: string;
  name: string;
  franchise: string;
  world: string;
  worldId: string;
  image: string;
  gallery?: string[];
  featured?: boolean;
  heroPriority?: number;
  price?: number;
  currency?: string;
  scale?: string;
  dimensions?: string;
  material?: string;
  edition?: string;
  availability?: string;
  stock?: number;
  description?: string;
  accentColor: string;
  imageMode?: 'hero-cutout' | 'full-bleed' | 'museum-plate';
}

export interface Character {
  slug: string;
  name: string;
  worldId: string;
  worldName: string;
  tagline: string;
  description: string;
  story: string;
  environment: string;
  heroImage: string;
  gallery: string[];
  metadata: {
    height: string;
    material: string;
    finish: string;
    edition: string;
    printTimeHours: string;
    layerResolution: string;
    weight: string;
  };
  craftsmanshipHighlights: string[];
  accentColor: string;
  imageMode: 'hero-cutout' | 'full-bleed' | 'museum-plate';
  commerce: {
    priceLabel: string;
    availability: string;
    primaryCta: string;
  };
}

const asset = (path: string) => `/images/artifacts/3d%20print/${path}`;

export const ARTIFACTS: Artifact[] = [
  {
    id: 'marvel-deadpool',
    slug: 'deadpool',
    name: 'DEADPOOL',
    franchise: 'Marvel',
    world: 'Marvel',
    worldId: 'marvel',
    image: asset('marvel/deadpool.jpg'),
    featured: true,
    heroPriority: 1,
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A strong red-black figure with enough silhouette weight to carry the ORION arrival scene.',
    accentColor: '#ef4444',
    imageMode: 'hero-cutout',
  },
  {
    id: 'chainsaw-makima',
    slug: 'makima',
    name: 'MAKIMA',
    franchise: 'Chainsaw Man',
    world: 'Chainsaw Man',
    worldId: 'chainsaw-man',
    image: asset('chainsaw%20man/makima.jpg'),
    featured: true,
    heroPriority: 2,
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A restrained editorial figure with black, cream, and red visual language.',
    accentColor: '#b91c1c',
    imageMode: 'hero-cutout',
  },
  {
    id: 'one-piece-zoro',
    slug: 'zoro',
    name: 'RORONOA ZORO',
    franchise: 'One Piece',
    world: 'One Piece',
    worldId: 'one-piece',
    image: asset('one%20peace/Zoro.jpg'),
    featured: true,
    heroPriority: 3,
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A cinematic sword-forward collectible with warm lantern atmosphere and deep green shadow.',
    accentColor: '#16a34a',
    imageMode: 'hero-cutout',
  },
  {
    id: 'dc-batman',
    slug: 'batman',
    name: 'BATMAN',
    franchise: 'DC',
    world: 'DC',
    worldId: 'dc',
    image: asset('dc/batman.jpg'),
    featured: true,
    heroPriority: 4,
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A museum-lit graphite figure with cape mass, armor texture, and strong shelf presence.',
    accentColor: '#64748b',
    imageMode: 'museum-plate',
  },
  {
    id: 'dc-joker',
    slug: 'joker',
    name: 'JOKER',
    franchise: 'DC',
    world: 'DC',
    worldId: 'dc',
    image: asset('dc/joker.jpg'),
    featured: true,
    heroPriority: 5,
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A theatrical DC artifact with purple-green contrast and character-specific menace.',
    accentColor: '#22c55e',
    imageMode: 'museum-plate',
  },
  {
    id: 'deathnote-ryuk',
    slug: 'ryuk',
    name: 'RYUK',
    franchise: 'Death Note',
    world: 'Death Note',
    worldId: 'death-note',
    image: asset('deathnote/god%20of%20death%202.jpg'),
    featured: true,
    heroPriority: 6,
    availability: 'PRODUCT DETAILS PENDING',
    description: 'An unsettling winged figure suited for nearly black editorial scenes and feather-like atmosphere.',
    accentColor: '#991b1b',
    imageMode: 'hero-cutout',
  },
  {
    id: 'wizarding-voldemort',
    slug: 'voldemort',
    name: 'VOLDEMORT',
    franchise: 'Wizarding World',
    world: 'Wizarding World',
    worldId: 'wizarding-world',
    image: asset('harrypotter/voldermort.jpg'),
    featured: true,
    heroPriority: 7,
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A dark green magical figure with smoke, stone, and restrained theatrical light.',
    accentColor: '#22c55e',
    imageMode: 'hero-cutout',
  },
  {
    id: 'one-piece-luffy',
    slug: 'luffy',
    name: 'MONKEY D. LUFFY',
    franchise: 'One Piece',
    world: 'One Piece',
    worldId: 'one-piece',
    image: asset('one%20peace/Luffy.jpg'),
    featured: true,
    heroPriority: 8,
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A bright adventure figure with red, amber, black, and open-sky energy.',
    accentColor: '#f97316',
    imageMode: 'full-bleed',
  },
  {
    id: 'wizarding-dumbledore',
    slug: 'dumbledore',
    name: 'DUMBLEDORE',
    franchise: 'Wizarding World',
    world: 'Wizarding World',
    worldId: 'wizarding-world',
    image: asset('harrypotter/dumbledore.jpg'),
    featured: true,
    heroPriority: 9,
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A parchment-warm magical portrait useful as a secondary Wizarding World lead.',
    accentColor: '#facc15',
    imageMode: 'full-bleed',
  },
  {
    id: 'chainsaw-denji',
    slug: 'denji',
    name: 'DENJI',
    franchise: 'Chainsaw Man',
    world: 'Chainsaw Man',
    worldId: 'chainsaw-man',
    image: asset('chainsaw%20man/denji.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A kinetic support figure for hard manga cuts and red-black world staging.',
    accentColor: '#ef4444',
    imageMode: 'museum-plate',
  },
  {
    id: 'chainsaw-power',
    slug: 'power',
    name: 'POWER',
    franchise: 'Chainsaw Man',
    world: 'Chainsaw Man',
    worldId: 'chainsaw-man',
    image: asset('chainsaw%20man/power.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A clean support figure with strong attitude and compact composition.',
    accentColor: '#f97316',
    imageMode: 'hero-cutout',
  },
  {
    id: 'chainsaw-aki',
    slug: 'aki-hayakawa',
    name: 'AKI HAYAKAWA',
    franchise: 'Chainsaw Man',
    world: 'Chainsaw Man',
    worldId: 'chainsaw-man',
    image: asset('chainsaw%20man/aki%20hayakawa.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A clean upright figure best suited for supporting collection and lineup views.',
    accentColor: '#94a3b8',
    imageMode: 'museum-plate',
  },
  {
    id: 'dc-superman',
    slug: 'superman',
    name: 'SUPERMAN',
    franchise: 'DC',
    world: 'DC',
    worldId: 'dc',
    image: asset('dc/superman.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A brighter DC artifact that should not share Batman’s exact Gotham treatment.',
    accentColor: '#2563eb',
    imageMode: 'full-bleed',
  },
  {
    id: 'dc-flash',
    slug: 'flash',
    name: 'FLASH',
    franchise: 'DC',
    world: 'DC',
    worldId: 'dc',
    image: asset('dc/flash.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A motion-heavy DC support image suited for energetic collection moments.',
    accentColor: '#f59e0b',
    imageMode: 'full-bleed',
  },
  {
    id: 'dc-green-lantern',
    slug: 'green-lantern',
    name: 'GREEN LANTERN',
    franchise: 'DC',
    world: 'DC',
    worldId: 'dc',
    image: asset('dc/green%20lantern.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'An electric green DC figure for focused Vault browsing.',
    accentColor: '#22c55e',
    imageMode: 'full-bleed',
  },
  {
    id: 'dc-krypto',
    slug: 'krypto',
    name: 'KRYPTO',
    franchise: 'DC',
    world: 'DC',
    worldId: 'dc',
    image: asset('dc/krypto.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A smaller supporting DC artifact best used in collection context.',
    accentColor: '#f8fafc',
    imageMode: 'museum-plate',
  },
  {
    id: 'deathnote-el',
    slug: 'el',
    name: 'EL',
    franchise: 'Death Note',
    world: 'Death Note',
    worldId: 'death-note',
    image: asset('deathnote/el.jpg'),
    featured: true,
    heroPriority: 10,
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A seated investigative figure with cold light, off-white contrast, and psychological quiet.',
    accentColor: '#e5e7eb',
    imageMode: 'full-bleed',
  },
  {
    id: 'deathnote-light',
    slug: 'light-yagami',
    name: 'LIGHT YAGAMI',
    franchise: 'Death Note',
    world: 'Death Note',
    worldId: 'death-note',
    image: asset('deathnote/light%20yagami.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A minimal Light figure suited for supporting narrative and related-artifact views.',
    accentColor: '#dc2626',
    imageMode: 'museum-plate',
  },
  {
    id: 'deathnote-misa',
    slug: 'misa',
    name: 'MISA',
    franchise: 'Death Note',
    world: 'Death Note',
    worldId: 'death-note',
    image: asset('deathnote/girlfriend%20of%20light.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A secondary Death Note artifact for the full Vault and world detail pages.',
    accentColor: '#f472b6',
    imageMode: 'full-bleed',
  },
  {
    id: 'wizarding-harry',
    slug: 'harry-potter',
    name: 'HARRY POTTER',
    franchise: 'Wizarding World',
    world: 'Wizarding World',
    worldId: 'wizarding-world',
    image: asset('harrypotter/harrypotter.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A cinematic Harry image that works best in editorial storytelling and supporting artifact views.',
    accentColor: '#facc15',
    imageMode: 'full-bleed',
  },
  {
    id: 'wizarding-hermione',
    slug: 'hermione',
    name: 'HERMIONE',
    franchise: 'Wizarding World',
    world: 'Wizarding World',
    worldId: 'wizarding-world',
    image: asset('harrypotter/harminee.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A clean magical support image for the Wizarding World collection.',
    accentColor: '#f59e0b',
    imageMode: 'museum-plate',
  },
  {
    id: 'wizarding-ron',
    slug: 'ron-weasley',
    name: 'RON WEASLEY',
    franchise: 'Wizarding World',
    world: 'Wizarding World',
    worldId: 'wizarding-world',
    image: asset('harrypotter/ronn%20weasly.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A supporting Wizarding World figure image with clean white-background utility.',
    accentColor: '#f97316',
    imageMode: 'museum-plate',
  },
  {
    id: 'wizarding-hagrid',
    slug: 'hagrid',
    name: 'HAGRID',
    franchise: 'Wizarding World',
    world: 'Wizarding World',
    worldId: 'wizarding-world',
    image: asset('harrypotter/hagrid.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A characterful support asset with strong texture and human warmth.',
    accentColor: '#a16207',
    imageMode: 'museum-plate',
  },
  {
    id: 'wizarding-trio',
    slug: 'wizarding-trio',
    name: 'THE TRIO',
    franchise: 'Wizarding World',
    world: 'Wizarding World',
    worldId: 'wizarding-world',
    image: asset('harrypotter/trio.jpg'),
    availability: 'EDITORIAL IMAGE',
    description: 'A story/reference image better suited to editorial atmosphere than product uniformity.',
    accentColor: '#facc15',
    imageMode: 'full-bleed',
  },
  {
    id: 'one-piece-sanji',
    slug: 'sanji',
    name: 'SANJI',
    franchise: 'One Piece',
    world: 'One Piece',
    worldId: 'one-piece',
    image: asset('one%20peace/sanji.jpg'),
    availability: 'PRODUCT DETAILS PENDING',
    description: 'A clean support figure for One Piece lineup and Vault browsing.',
    accentColor: '#fde047',
    imageMode: 'museum-plate',
  },
];

const pendingMetadata = (artifact: Artifact): Character['metadata'] => ({
  height: artifact.dimensions || 'PENDING STUDIO SPEC',
  material: artifact.material || 'PENDING MATERIAL SPEC',
  finish: 'PENDING FINISH SPEC',
  edition: artifact.edition || artifact.availability || 'PRODUCT DETAILS PENDING',
  printTimeHours: 'PENDING STUDIO SPEC',
  layerResolution: 'PENDING STUDIO SPEC',
  weight: 'PENDING STUDIO SPEC',
});

export const CHARACTERS: Character[] = ARTIFACTS.map((artifact) => ({
  slug: artifact.slug,
  name: artifact.name,
  worldId: artifact.worldId,
  worldName: artifact.world.toUpperCase(),
  tagline: artifact.featured ? 'FEATURE ARTIFACT' : 'COLLECTION ARTIFACT',
  description: artifact.description || 'Uploaded Orion artifact image awaiting final product copy.',
  story: artifact.description || 'Uploaded Orion artifact image awaiting final product copy.',
  environment: `${artifact.franchise} artifact imagery from the uploaded 3D print archive.`,
  heroImage: artifact.image,
  gallery: artifact.gallery || [artifact.image],
  metadata: pendingMetadata(artifact),
  craftsmanshipHighlights: [
    artifact.availability || 'Product details pending',
    'Real uploaded artifact image integrated',
    'Final ecommerce specifications awaiting studio data',
  ],
  accentColor: artifact.accentColor,
  imageMode: artifact.imageMode || 'hero-cutout',
  commerce: {
    priceLabel: artifact.price && artifact.currency ? `${artifact.currency} ${artifact.price.toLocaleString()}` : 'Price on request',
    availability: artifact.availability || 'Availability pending',
    primaryCta: 'ADD TO COLLECTION',
  },
}));

export function getCharacterBySlug(slug: string): Character | undefined {
  return CHARACTERS.find((c) => c.slug === slug);
}

export function getCharactersByWorld(worldId: string): Character[] {
  return CHARACTERS.filter((c) => c.worldId === worldId);
}

export function getFeaturedArtifacts(): Character[] {
  return CHARACTERS
    .filter((character) => ARTIFACTS.find((artifact) => artifact.slug === character.slug)?.featured)
    .sort((a, b) => {
      const artifactA = ARTIFACTS.find((artifact) => artifact.slug === a.slug);
      const artifactB = ARTIFACTS.find((artifact) => artifact.slug === b.slug);
      return (artifactA?.heroPriority || 99) - (artifactB?.heroPriority || 99);
    });
}
