import { MetadataRoute } from 'next';

const BASE_URL = 'https://arthcalc.vercel.app';

const CALCULATOR_IDS = [
  'fd', 'rd', 'tax-saver-fd', 'senior-citizen-fd', 'ppf', 'nsc', 'kvp', 'ssy',
  'epf', 'nps', 'sip', 't-bills', 'physical-gold', 'gold-etf', 'elss',
  'savings-account', 'mis', 'po-time-deposit', 'po-rd', 'scss', 'sgb',
  'g-sec', 'sdl', 'floating-rate-bonds', 'vpf', 'apy',
  'equity-mf', 'debt-mf', 'hybrid-mf', 'index-fund', 'liquid-fund',
  'international-fund', 'lumpsum', 'swp', 'stp',
  'equity-etf', 'silver-etf', 'bond-etf',
  'physical-silver', 'digital-gold', 'stocks', 'ipo', 'reit', 'invit', 'ulip',
];

const CATEGORY_SLUGS = [
  'bank-deposits', 'post-office', 'government-securities', 'retirement',
  'mutual-funds', 'investment-methods', 'etfs', 'precious-metals',
  'market-investments', 'insurance-linked',
];

const COMPARISON_SLUGS = [
  'fd-vs-sip', 'fd-vs-ppf', 'ppf-vs-nps', 'epf-vs-nps', 'ssy-vs-ppf',
  'fd-vs-rd', 'sip-vs-lumpsum', 'gold-etf-vs-sgb', 'elss-vs-ppf', 'nps-vs-epf',
];

const LEARN_SLUGS = [
  'compound-interest', 'inflation', 'sip', 'ppf', 'nps', 'epf',
  'tax-saving-80c', 'fd-vs-sip', 'goal-based-investing',
];

const STATIC_PAGES = [
  '', 'calculators', 'compare', 'investments', 'goal-planner',
  'journey-simulator', 'tax-saver', 'rates', 'learn',
  'about', 'contact', 'privacy', 'terms', 'disclaimer', 'search',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticEntries = STATIC_PAGES.map((page) => ({
    url: `${BASE_URL}/${page}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1.0 : 0.8,
  }));

  // Calculator pages
  const calculatorEntries = CALCULATOR_IDS.map((id) => ({
    url: `${BASE_URL}/calculators/${id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Comparison pages
  const comparisonEntries = COMPARISON_SLUGS.map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Category pages
  const categoryEntries = CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/investments/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Learn/blog pages
  const learnEntries = LEARN_SLUGS.map((slug) => ({
    url: `${BASE_URL}/learn/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...calculatorEntries,
    ...comparisonEntries,
    ...categoryEntries,
    ...learnEntries,
  ];
}
