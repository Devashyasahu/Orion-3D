export interface ArtistFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  quote: string;
}

export const ARTIST_SHOWCASE: ArtistFeature[] = [
  {
    id: 'mosogete-style',
    title: 'THE MOSOGETE AESTHETIC',
    subtitle: 'Dynamic Proportions, Sculptural Flow, and Character Soul',
    description: 'We draw inspiration from world-renowned 3D figure artists like Mosogete and master sculptors who elevate anime characters into high-art museum physical collectibles. Every muscle curve, cape ripple, and face plane is designed with mathematical balance and artistic weight.',
    highlights: [
      'Anatomical accuracy blended with exaggerated anime gesture dynamics',
      'Multi-plane shadow trapping to create dramatic depth under room lights',
      'Seamless keying and tolerance fitting for invisible print assembly lines',
      'Studio-grade volumetric lighting test renders before physical printing'
    ],
    image: '/images/anime_art_sculpture.png',
    quote: '3D printing is not just production—it is the translation of digital spirit into physical bronze and resin.'
  },
  {
    id: 'sculpt-craftsmanship',
    title: 'STUDIO-GRADE 3D SCULPTING',
    subtitle: 'From Sub-Millimeter Polygons to Tactile Masterpieces',
    description: 'Our digital atelier sculpts characters at up to 15 million polygon density. This enables micro-details down to 15-micron print layer height, capturing cloth grain, armor battle wear, skin pores, and hair flow that can be felt by human touch.',
    highlights: [
      'Sub-millimeter mesh resolution for micro-surface textures',
      'Custom optic clear resin formulations for energy aura elements',
      'Hand-burnished metallic patinas and multi-layer airbrush glazing'
    ],
    image: '/images/cyberpunk_ronin.png',
    quote: 'When you touch an Orion piece, you feel the sculptors intent in every surface.'
  }
];
