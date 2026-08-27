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

export const WORLDS: World[] = [
  {
    id: 'chainsaw-man',
    name: 'CHAINSAW MAN',
    headline: 'MANGA CUTS, RESTRAINED RED, AND HARD EDITORIAL SHADOW.',
    subhead: 'Makima leads a black, cream, and blood-red character chapter.',
    description: 'Chainsaw Man in Orion is not a normal category. It is hard panel framing, controlled crimson, clean negative space, and figures staged like collectible manga artifacts.',
    atmosphere: 'Black ink, cream paper, restrained red, manga cuts, and sharp editorial light.',
    themeColor: '#b91c1c',
    bgGradient: 'from-stone-950/80 via-red-950/28 to-[#070707]',
    heroImage: '/images/artifacts/3d%20print/chainsaw%20man/makima.jpg',
    characterSlugs: ['makima', 'denji', 'power', 'aki-hayakawa'],
  },
  {
    id: 'dc',
    name: 'DC',
    headline: 'GRAPHITE MUSEUM LIGHT, ICONIC SILHOUETTES, CHARACTER SHADOW.',
    subhead: 'Batman and Joker lead a darker collectible exhibition.',
    description: 'DC in Orion is a gallery of icons, not one identical Gotham filter. Batman, Joker, Superman, Flash, Green Lantern, and Krypto each receive character-specific lighting.',
    atmosphere: 'Graphite darkness, museum spotlights, rain, theatrical color accents, and deep shadow.',
    themeColor: '#64748b',
    bgGradient: 'from-slate-950/80 via-zinc-900/45 to-[#05070d]',
    heroImage: '/images/artifacts/3d%20print/dc/batman.jpg',
    characterSlugs: ['batman', 'joker', 'superman', 'flash', 'green-lantern', 'krypto'],
  },
  {
    id: 'death-note',
    name: 'DEATH NOTE',
    headline: 'BLACK FEATHERS, WHITE PAPER, AND BLOOD-RED SILENCE.',
    subhead: 'Ryuk dominates a psychological collectible world.',
    description: 'Death Note in Orion is elegant and unsettling: nearly black staging, off-white contrast, drifting paper, feather-like atmosphere, and restrained red details.',
    atmosphere: 'Nearly black, paper white, crimson cuts, wet quiet, and supernatural feather shadow.',
    themeColor: '#991b1b',
    bgGradient: 'from-black via-red-950/22 to-[#08080a]',
    heroImage: '/images/artifacts/3d%20print/deathnote/god%20of%20death%202.jpg',
    characterSlugs: ['ryuk', 'el', 'light-yagami', 'misa'],
  },
  {
    id: 'one-piece',
    name: 'ONE PIECE',
    headline: 'WARM ADVENTURE LIGHT, STEEL, AMBER, AND MOTION.',
    subhead: 'Zoro leads a brighter cinematic world with Luffy and Sanji in support.',
    description: 'One Piece in Orion feels warmer and more adventurous than the darker chapters: lanterns, black-green shadow, red fabric, amber light, and sword-forward motion.',
    atmosphere: 'Amber warmth, red accents, black-green shadow, wood, lanterns, and open adventure air.',
    themeColor: '#16a34a',
    bgGradient: 'from-emerald-950/60 via-red-950/24 to-[#100c08]',
    heroImage: '/images/artifacts/3d%20print/one%20peace/Zoro.jpg',
    characterSlugs: ['zoro', 'luffy', 'sanji'],
  },
  {
    id: 'wizarding-world',
    name: 'WIZARDING WORLD',
    headline: 'SMOKE, STONE, PARCHMENT WARMTH, AND DARK GREEN MAGIC.',
    subhead: 'Voldemort and Dumbledore anchor a magical artifact collection.',
    description: 'The Wizarding World chapter uses smoke, stone, dark green, parchment warmth, and candle-like light. Visually inconsistent source images are treated as editorial and collection assets intentionally.',
    atmosphere: 'Dark green smoke, stone corridors, parchment warmth, candles, and magical atmosphere.',
    themeColor: '#22c55e',
    bgGradient: 'from-emerald-950/62 via-stone-900/42 to-[#080908]',
    heroImage: '/images/artifacts/3d%20print/harrypotter/voldermort.jpg',
    characterSlugs: ['voldemort', 'dumbledore', 'harry-potter', 'hermione', 'ron-weasley', 'hagrid', 'wizarding-trio'],
  },
  {
    id: 'marvel',
    name: 'MARVEL',
    headline: 'RED BLACK IMPACT, DRAMATIC LIGHT, AND COLLECTIBLE ATTITUDE.',
    subhead: 'Deadpool is the strongest uploaded arrival artifact.',
    description: 'Marvel currently begins with Deadpool as a focused featured artifact. The page is structured for future Marvel additions without inventing unavailable product facts.',
    atmosphere: 'Red-black impact, concrete pedestal, comic menace, and sharp spotlight.',
    themeColor: '#ef4444',
    bgGradient: 'from-red-950/58 via-zinc-950/62 to-[#050505]',
    heroImage: '/images/artifacts/3d%20print/marvel/deadpool.jpg',
    characterSlugs: ['deadpool'],
  },
];

export function getWorldById(id: string): World | undefined {
  return WORLDS.find((w) => w.id === id);
}
