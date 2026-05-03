import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hondadailoi.vn';

  // Static routes
  const staticRoutes = [
    '',
    '/parts',
    '/categories',
    '/vehicles',
    '/about',
    '/contact',
    '/faq',
    '/shipping-policy',
    '/return-policy',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In a real production app, you would fetch all dynamic paths:
  // const parts = await getParts();
  // const categories = await getCategories();
  // ...and map them to sitemap entries

  return [...staticRoutes];
}
