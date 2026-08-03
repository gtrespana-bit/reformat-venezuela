import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { enBlogSlugs } from '../../data/blog-slugs';

export async function GET(context: any) {
  const posts = await getCollection('blog');
  const englishPosts = posts
    .filter((post) => enBlogSlugs.includes(post.id))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'RemodelaT Venezuela | Blog',
    description: 'Practical guides, trends and advice for your remodeling project in Venezuela.',
    site: context.site ?? 'https://remodelat.net',
    customData: `<language>en-US</language>`,
    items: englishPosts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: `/en/blog/${post.id}/`,
      category: post.data.category,
    })),
  });
}
