import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const spanishSlugs = [
    'cuanto-cuesta-reforma-cocina-valencia',
    'porcelanato-vs-ceramica',
    'presupuesto-reforma-errores',
    'reformas-banos-carabobo',
    'tendencias-cocinas-2025'
  ];
  
  const posts = await getCollection('blog');
  const spanishPosts = posts
    .filter(post => spanishSlugs.includes(post.id))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'ReformaT Venezuela | Blog',
    description: 'Consejos, tendencias y guías prácticas para tu proyecto de reforma en Venezuela.',
    site: context.site,
    customData: `<language>es-VE</language>`,
    items: spanishPosts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      category: post.data.category,
    })),
  });
}