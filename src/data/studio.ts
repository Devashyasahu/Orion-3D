export interface StudioStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  image: string;
}

export const STUDIO_STEPS: StudioStep[] = [
  {
    step: '01',
    title: 'DIGITAL SCULPTING & ARCHITECTURE',
    tagline: 'EVERY MICRON STARTS AS DIGITAL POETRY.',
    description: 'Master sculptors work in 3D space, crafting tens of millions of polygons to achieve anatomical accuracy, dynamic fabric folds, and intricate armor joints.',
    details: [
      'Digital mesh optimization up to 45M polygons',
      'Structural weight balancing & key joint engineering',
      'Sub-millimeter volumetric stress simulation'
    ],
    image: '/images/custom_hero.png'
  },
  {
    step: '02',
    title: 'HIGH-PRECISION SLA RESIN PRINTING',
    tagline: 'ULTRAVIOLET LASERS SOLIDIFACTION AT 15 MICRONS.',
    description: 'Using high-resolution Stereolithography (SLA) printers, liquid photopolymer resin is solidifying layer by layer under concentrated 405nm UV laser beams.',
    details: [
      '15 to 25 micron Z-axis layer resolution',
      'Photopolymer tough resin matrix formulations',
      'Continuous light-curing bath process'
    ],
    image: '/images/studio_printing.png'
  },
  {
    step: '03',
    title: 'CHEMICAL BATH & MICRO-SANDING',
    tagline: 'ELIMINATING LAYER LINES TO PURE SILK SMOOTHNESS.',
    description: 'Printed components undergo ultra-sonic IPA washing to remove uncured resin, followed by multi-stage micro-sanding by hand to erase any trace of digital artifacting.',
    details: [
      'Ultrasonic chemical resin removal bath',
      'Hand micro-sanding from 800 to 3000 grit finish',
      'Thermal UV post-curing chamber treatment'
    ],
    image: '/images/studio_finishing.png'
  },
  {
    step: '04',
    title: 'ARTISANAL AIRBRUSHING & PATINA',
    tagline: 'COLORS THAT BREATHE LIFE INTO RESIN.',
    description: 'Master painters apply custom lacquer pigments, metallic powders, translucent gradients, and hand-burnished weathering patinas under optic magnification.',
    details: [
      'Multi-layer lacquer & enamel color layering',
      'Custom optic clear-coat UV protection',
      'Hand-painted iris & metal accent details'
    ],
    image: '/images/studio_finishing.png'
  },
  {
    step: '05',
    title: 'ASSEMBLY & EXHIBITION CERTIFICATION',
    tagline: 'READY FOR YOUR PRIVATE GALLERY.',
    description: 'Components are joined with precision stainless magnetic joints, inspected under 10x optical magnification, and packaged in custom foam vault cases.',
    details: [
      'Neodymium magnetic component locking system',
      'Individual laser-etched serial plaque',
      'Custom obsidian vault packaging with Certificate of Craftsmanship'
    ],
    image: '/images/batman.png'
  }
];
