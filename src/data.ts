import { Treatment, Review, WellnessPackage } from './types';
import img1 from '../assets/images/premium-spa-massage-therapy.webp';
import img2 from '../assets/images/tranquil-spa-room-environment.webp';
import img3 from '../assets/images/luxury-spa-wellness-amenities.webp';
import img4 from '../assets/images/holistic-healing-spa-treatment.webp';
import img5 from '../assets/images/aromatherapy-essential-oils-session.webp';
import img6 from '../assets/images/deep-tissue-massage-therapy.webp';
import img7 from '../assets/images/private-couple-spa-suite.webp';
import img8 from '../assets/images/refreshing-spa-ambiance.webp';

export const HERO_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD37L9DKqkWGlB5lcUl8mU0_KAwV-ZM70pdCruFDeh10eU0c0_mI9qlZv4Y-5dfQgtduY_9oas4SKpAhj7hwimeMqJq2M_2z8rEEuOQZLIuZYkHMAQgxZi7fafKVkueh-A9VjlptpVqw7NNBTLxvDSXwvnfHzo8woxIXbqIhCjqCsCwnZ6xnK9it_lw_mBso_d_DDQPbT6Cm9JGtAm_HlbqYS1hfOOdBk-wziYo81QUbP25Jmk7XbXzAQJ2D8zz9yRhIGuSh2okN3Ml';

export const ABOUT_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAghpb9SfmTBe3BPrUeh11N9AqAN078kplQZcDSK4qEuPYweiVKXASR70MkaTPxwWBMFw6ysnTtzhLfyQexKpqAVfVdCSe9WZwn2NzwX8G4NX5ShQRoRwcr6LGpQrTTLSmN9YNX73NLiptkkmJRSYjf88nRssGX8ogMKR4kL8EYV8S-b44He10xUgVsJwxDQVTV3HHoBFCLthdCA0FBGx740ZD8EmUt9OA7PTwkHS-znxmeR516PhTFi-GJ1LKT7vUxsAO4dV2HekUG';

export const STATIC_MAP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCHqmpo_s5CEhYhpP85NtYDETZQXbpHtR02nwRCzsv0s4K2Zk_H6ZgJDQ4yPRv12d4IC72tso0gRdMD085_16-LRfcW1eOjkbsgmHapt3A2C1QMkcbQCzgPSN5IBPDHgvota85MxxB_28uhOBtUBxPfQsgiBDWNoRfH9drjJYi4piQ-GE00jFainwswtFcOTbxr4d5hL3Lxb9JCPt6_iCLFRzMGbgtX9ijPGQW-zmribrLgOKpca0dKU56VZWpEcWHQzrHQqYoR0wm';

export const GALLERY_IMAGES = [
  {
    url: img1,
    title: 'Premium Spa Therapy',
    description: 'A skilled therapist performing a deeply relaxing massage therapy session.'
  },
  {
    url: img2,
    title: 'Tranquil Environment',
    description: 'Experience pure tranquility in our beautifully designed spa rooms.'
  },
  {
    url: img3,
    title: 'Luxury Amenities',
    description: 'Enjoy our state-of-the-art facilities and premium wellness amenities.'
  },
  {
    url: img4,
    title: 'Holistic Healing',
    description: 'Discover the ultimate relaxation through our holistic wellness approach.'
  },
  {
    url: img5,
    title: 'Aromatherapy Session',
    description: 'Rejuvenate your senses with our custom essential oil blends.'
  },
  {
    url: img6,
    title: 'Deep Tissue Massage',
    description: 'Relieve chronic muscle tension with focused therapeutic techniques.'
  },
  {
    url: img7,
    title: 'Couple Spa Suite',
    description: 'Share a memorable and relaxing experience in our private couple suites.'
  },
  {
    url: img8,
    title: 'Refreshing Ambiance',
    description: 'Step into a world of calm and let your stress melt away.'
  }
];

export const SERVICES: Treatment[] = [
  {
    id: 'swedish',
    name: 'Swedish Massage',
    description: 'Long, gliding strokes combined with rhythmic circular movements to improve blood circulation and release physical surface tension.',
    duration: 60,
    price: 1499,
    category: 'Massage Therapy',
    iconName: 'Waves'
  },
  {
    id: 'deep-tissue',
    name: 'Deep Tissue Massage',
    description: 'Intense and firm pressure targeting the deepest layers of muscles and connective fascia. Ideal for active lifestyles and chronic stiffness.',
    duration: 90,
    price: 1999,
    category: 'Intense Therapy',
    iconName: 'Activity'
  },
  {
    id: 'arora',
    name: 'Aroma Therapy',
    description: 'Infused with customized premium organic essential oils (lavender, eucalyptus, lemongrass) to calm the mind and soothe central nervous systems.',
    duration: 60,
    price: 1699,
    category: 'Sensory Healing',
    iconName: 'Leaf'
  },
  {
    id: 'couple',
    name: 'Couple Spa Experience',
    description: 'Embark on a shared tranquil journey of sensory relaxation with side-by-side treatments inside our private candlelit VIP couples suite.',
    duration: 120,
    price: 3499,
    category: 'Premium Packages',
    iconName: 'Heart'
  },
  {
    id: 'body-spa',
    name: 'Exfoliating Body Spa',
    description: 'Full body walnut exfoliation scrub followed by deep hydration with customized essential lotions, leaving the skin glowing and soft.',
    duration: 60,
    price: 1599,
    category: 'Exfoliation & Skincare',
    iconName: 'Sparkles'
  },
  {
    id: 'steam',
    name: 'Aromatic Steam Bath',
    description: 'Detoxify your respiratory tract, stimulate circulation, and open skin pores inside our customized, state-of-the-art steam chambers.',
    duration: 30,
    price: 499,
    category: 'Add-on Treatment',
    iconName: 'Droplet'
  }
];

export const WELLNESS_PACKAGES: WellnessPackage[] = [
  {
    id: 'package-relax',
    name: 'RELAXATION BUNDLE',
    price: 1999,
    features: [
      '60 Min Swedish Massage',
      '15 Min Steam Bath',
      'Aromatic Herbal Green Tea',
      'Complimentary Sanitized Foot slippers'
    ],
    treatmentIds: ['swedish', 'steam']
  },
  {
    id: 'package-escape',
    name: 'THERAPEUTIC ESCAPE',
    price: 2999,
    badge: 'MOST POPULAR',
    features: [
      '90 Min Deep Tissue Massage',
      '30 Min Warm Salt Foot Reflexology',
      'Full Body Walnut Honey Scrub',
      'Access to VIP Private Suite'
    ],
    treatmentIds: ['deep-tissue', 'body-spa']
  },
  {
    id: 'package-indulge',
    name: 'COUPLE INDULGENCE',
    price: 4999,
    features: [
      '90 Min Aroma Therapy (for 2 guests)',
      'Private Premium Steam & Double Showers',
      'Relaxation Lounge Sparkling Berries Drink & Dates',
      'Scented wax candles ambiance'
    ],
    treatmentIds: ['couple', 'steam']
  }
];

export const WHY_CHOOSE_US = [
  { icon: 'Award', title: 'Certified Therapists', desc: 'Expert trained professionals with years of experience.' },
  { icon: 'Lock', title: 'Private Suites', desc: 'Completely private, soundproof, and cozy therapy rooms.' },
  { icon: 'ShieldCheck', title: '100% Hygiene', desc: 'Premium single-use linens, sterile robes, and deep-cleaned rooms.' },
  { icon: 'Sparkles', title: 'Premium Ambience', desc: 'Calming luxury low-light scent of pure lavender oil.' },
  { icon: 'Leaf', title: 'Organic Oils', desc: 'Non-greasy, authentic cold-pressed botanical essential oils.' },
  { icon: 'MapPin', title: 'Prime Location', desc: 'Easily accessible premium point close to Phoenix Marketcity, Viman Nagar.' },
  { icon: 'Clock', title: 'Flexible Slots', desc: 'Available late night appointments for high-intensity workdays.' },
  { icon: 'Coffee', title: 'Welcome Drink', desc: 'Complimentary traditional kokum sherbet or herbal immunity infusion tea.' }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Anjali Sharma',
    comment: 'Easily the absolute best wellness spa in Viman Nagar. The hygiene levels are outstanding and the therapist knew exactly where my shoulder tension spots were. Extremely polished environment! Highly recommend the deep tissue massage.',
    rating: 5,
    source: 'Google Review',
    date: '2 weeks ago'
  },
  {
    id: 'rev-2',
    author: 'Rohan Mehta',
    comment: 'The couples spa is an incredible, premium treat. Complete sound isolation, wonderful candles scent, and very respectful, professionally trained therapists. The aromatherapy helped me sleep amazingly after a grueling flight.',
    rating: 5,
    source: 'Verified Customer',
    date: '3 weeks ago'
  },
  {
    id: 'rev-3',
    author: 'Priya K.',
    comment: 'Extremely spotless and well-maintained. The private aromatic steam bath after the walnut scrub scrub and Swedish massage was physical bliss. The receptionists are super humble and polite.',
    rating: 5,
    source: 'Local Guide',
    date: '1 month ago'
  }
];
