export interface AnimeFilm {
  id: string;
  title: string;
  japaneseTitle?: string;
  director: string;
  releaseYear: string;
  atmosphere: string;
  quote: string;
  description: string;
  heroImage: string;
  accentColor: string;
  aspectRatio: string;
}

export const ANIME_FILMS: AnimeFilm[] = [
  {
    id: 'your-name',
    title: 'YOUR NAME',
    japaneseTitle: '君の名は。',
    director: 'Makoto Shinkai',
    releaseYear: '2016',
    atmosphere: 'Twilight sky, falling comet, deep indigo, violet & sunset orange haze.',
    quote: 'I feel like I am always searching for someone, or something.',
    description: 'A monument of emotional animation. We capture the iconic staircase encounter and comet twilight in semi-translucent gradient resin collectibles.',
    heroImage: '/images/anime_movie_your_name.png',
    accentColor: '#818cf8',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: '5cm-per-second',
    title: '5 CENTIMETERS PER SECOND',
    japaneseTitle: '秒速5センチメートル',
    director: 'Makoto Shinkai',
    releaseYear: '2007',
    atmosphere: 'Snow-dusted train tracks, falling cherry blossoms, soft pink & dusk blue.',
    quote: 'At what speed must I live to see you again?',
    description: 'Exploring distance, time, and human memory. Rendered as a quiet winter night scene with micro-fine blossom particle resin.',
    heroImage: '/images/anime_movie_5cm.png',
    accentColor: '#f472b6',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    id: 'i-want-to-eat-your-pancreas',
    title: 'I WANT TO EAT YOUR PANCREAS',
    japaneseTitle: '君の膵臓をたべたい',
    director: 'Shinichiro Ushijima',
    releaseYear: '2018',
    atmosphere: 'Hospital window sunlight, flying hospital diary pages, soft sakura air.',
    quote: 'We chose our paths by the decisions we made.',
    description: 'A delicate story of life, gratitude, and fleeting moments. Sculpted with high translucency resin elements capturing golden hour sunlight.',
    heroImage: '/images/goku.png',
    accentColor: '#f9a8d4',
    aspectRatio: 'aspect-[16/9]',
  },
  {
    id: 'a-silent-voice',
    title: 'A SILENT VOICE',
    japaneseTitle: '聲の形',
    director: 'Naoko Yamada',
    releaseYear: '2016',
    atmosphere: 'River bridge ripples, paper carp streamers, soft teal & lavender sky.',
    quote: 'I wanted to tell you that I listened.',
    description: 'A masterpiece of empathy and redemption. Staged with water-reflection base optics and soft pastel ceramic finishing.',
    heroImage: '/images/naruto.png',
    accentColor: '#38bdf8',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 'weathering-with-you',
    title: 'WEATHERING WITH YOU',
    japaneseTitle: '天気の子',
    director: 'Makoto Shinkai',
    releaseYear: '2019',
    atmosphere: 'Rainy Tokyo rooftops, parting cloud sunlight, sky fish water droplets.',
    quote: 'Who cares if we never see the sun again? I want you more than any blue sky.',
    description: 'Rain, light, and sky spirits transformed into clear optic resin figure compositions with suspended water drop effects.',
    heroImage: '/images/custom_hero.png',
    accentColor: '#06b6d4',
    aspectRatio: 'aspect-[16/10]',
  },
  {
    id: 'spirited-away',
    title: 'SPIRITED AWAY',
    japaneseTitle: '千と千尋の神隠し',
    director: 'Hayao Miyazaki',
    releaseYear: '2001',
    atmosphere: 'Spirited bathhouse lanterns, night sea railway, emerald mist & gold glow.',
    quote: 'Once you’ve met someone you never really forget them.',
    description: 'Studio Ghibli magic in physical form. Hand-sculpted bathhouse architecture and translucent dragon spirit detailing.',
    heroImage: '/images/harry_potter.png',
    accentColor: '#10b981',
    aspectRatio: 'aspect-[4/5]',
  },
];
