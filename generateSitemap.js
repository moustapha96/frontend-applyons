import { create } from 'xmlbuilder2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const BASE_URL = 'https://www.applyons.com';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getRoutes() {
  // Define your static routes here
  return [
    '', '/privacy-policy', '/terms-and-conditions',
    '/#Home', '/#concuPour',
    '/#features',  '/about',
    '/contact', '#faq', '/auth/sign-in', '/auth/demandeur',
    '/auth/institut'
  ];
}


async function generateSitemap() {
  const routes = getRoutes();

  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  // Add static routes
  routes.forEach((route) => {
    root.ele('url')
      .ele('loc').txt(`${BASE_URL}${route}`).up()
      .ele('lastmod').txt(new Date().toISOString()).up()
      .ele('changefreq').txt('weekly').up()
      .ele('priority').txt('0.8').up();
  });

  const xml = root.end({ prettyPrint: true });

  // Write to file
  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  // //console.log('Sitemap generated successfully at', sitemapPath);
}

generateSitemap().catch((error) => {
  // console.error('Error generating sitemap:', error.message);
});
