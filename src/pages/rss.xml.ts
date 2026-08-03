import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { esBlogSlugs } from '../data/blog-slugs';

export async function GET(context: any) {
  const posts = await getCollection('blog');
  const spanishPosts = posts
    .filter((post) => esBlogSlugs.includes(post.id))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'RemodelaT Venezuela | Blog',
    description: 'Consejos, tendencias y guías prácticas para tu proyecto de reforma en Venezuela.',
    site: context.site ?? 'https://remodelat.net',
    customData: `<language>es-VE</language>`,
    items: spanishPosts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      category: post.data.category,
    })),
  });
}
