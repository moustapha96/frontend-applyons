import { create } from 'xmlbuilder2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const BASE_URL = 'https://www.applyons.com';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Routes publiques à inclure dans le sitemap (SEO / Google) */
function getRoutes() {
  return [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.9', changefreq: 'monthly' },
    { path: '/contact', priority: '0.9', changefreq: 'monthly' },
    { path: '/terms-and-conditions', priority: '0.7', changefreq: 'yearly' },
    { path: '/privacy-policy', priority: '0.7', changefreq: 'yearly' },
    { path: '/auth/sign-in', priority: '0.6', changefreq: 'monthly' },
    { path: '/auth/demandeur', priority: '0.6', changefreq: 'monthly' },
    { path: '/auth/institut', priority: '0.6', changefreq: 'monthly' },
  ];
}


async function generateSitemap() {
  const routes = getRoutes();
  const lastmod = new Date().toISOString().split('T')[0];

  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  routes.forEach(({ path: routePath, priority, changefreq }) => {
    const loc = routePath === '/' ? BASE_URL : `${BASE_URL}${routePath}`;
    root.ele('url')
      .ele('loc').txt(loc).up()
      .ele('lastmod').txt(lastmod).up()
      .ele('changefreq').txt(changefreq).up()
      .ele('priority').txt(priority).up();
  });

  const xml = root.end({ prettyPrint: true });

  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
}

generateSitemap().catch((error) => {
  // console.error('Error generating sitemap:', error.message);
});
