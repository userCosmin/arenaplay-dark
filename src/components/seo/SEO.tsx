import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/config/site.config';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}

/**
 * Per-page SEO: title, meta description, canonical URL, Open Graph and
 * Twitter Card tags. Use alongside <JsonLd> for structured data.
 */
export function SEO({ title, description, path, image, noindex = false, type = 'website' }: SEOProps) {
  const fullTitle = title.includes(siteConfig.brand.name) ? title : `${title} | ${siteConfig.brand.name}`;
  const canonicalUrl = `${siteConfig.url.production}${path}`;
  const ogImage = image ?? `${siteConfig.url.production}/images/og/arena-play-og.webp`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.brand.name} />
      <meta property="og:locale" content="ro_RO" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
