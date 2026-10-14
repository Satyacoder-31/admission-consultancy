import { MetadataRoute } from 'next';
import { initialCourses } from '@/data/courses';
import { initialUniversities } from '@/data/universities';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sahiraahconsultancy.com';

  const staticRoutes = [
    '',
    '/about',
    '/courses',
    '/universities',
    '/regular-education',
    '/distance-online-education',
    '/school-guidance',
    '/vocational-courses',
    '/admission-process',
    '/faqs',
    '/contact',
    '/enquiry',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-10-12'),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const courseRoutes = initialCourses.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: new Date('2026-10-12'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const uniRoutes = initialUniversities.map((u) => ({
    url: `${baseUrl}/universities/${u.slug}`,
    lastModified: new Date('2026-10-12'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...uniRoutes];
}
