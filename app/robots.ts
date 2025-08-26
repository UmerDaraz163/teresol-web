// app/robots.ts

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // This applies to all web crawlers
        allow: '/',       // This allows crawling of the entire site...
        disallow: '/admin/', // ...except for any URL starting with /admin/
      },
    ],
    sitemap: 'https://www.teresol.com/sitemap.xml', 
  };
}
