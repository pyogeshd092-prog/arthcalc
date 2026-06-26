/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://arthcalc.wealth',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin', '/api/*', '/dashboard'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api/', '/dashboard'] },
    ],
    additionalSitemaps: [
      'https://arthcalc.wealth/sitemap.xml',
    ],
  },
  additionalPaths: async (config) => {
    const { INVESTMENT_CATEGORIES, INVESTMENTS } = require('./lib/data/investments');
    const paths = [];

    // Category pages
    for (const cat of INVESTMENT_CATEGORIES) {
      paths.push({ loc: `/investments/${cat.slug}`, changefreq: 'weekly', priority: 0.8 });
      // Option pages
      for (const inv of INVESTMENTS.filter(i => i.categoryId === cat.id)) {
        paths.push({ loc: `/investments/${cat.slug}/${inv.slug}`, changefreq: 'weekly', priority: 0.9 });
      }
    }

    // Calculator pages
    for (const inv of INVESTMENTS) {
      paths.push({ loc: `/calculators/${inv.id}`, changefreq: 'weekly', priority: 0.9 });
    }

    // Comparison pages (static list)
    const comparisons = ['fd-vs-sip','fd-vs-ppf','ppf-vs-nps','epf-vs-nps','ssy-vs-ppf','fd-vs-rd','sip-vs-lumpsum','gold-etf-vs-sgb','elss-vs-ppf','nps-vs-epf'];
    for (const slug of comparisons) {
      paths.push({ loc: `/compare/${slug}`, changefreq: 'monthly', priority: 0.8 });
    }

    return paths;
  },
};
