import { Helmet } from "react-helmet-async";

const BASE_URL = "https://www.applyons.com";

/**
 * SEO par page : titre, description, canonical, Open Graph.
 * - title: obligatoire (ex: "Contact" → "Contact | ApplyOns")
 * - description: optionnel, sinon réutilisation de la meta globale
 * - canonicalPath: optionnel (ex: "/about" → canonical = BASE_URL/about)
 */
const PageMetaData = ({ title, description, canonicalPath }) => {
  const fullTitle = title ? `${title} | ApplyOns` : "ApplyOns - Instant Document Authentication and Verification";
  const canonical = canonicalPath ? `${BASE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
};

export default PageMetaData;
