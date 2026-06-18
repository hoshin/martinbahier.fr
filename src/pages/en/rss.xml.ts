import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { postSlug } from '../../lib/date';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  return rss({
    title: 'Martin Bahier — Blog (EN)',
    description: 'Notes, thoughts and learnings.',
    site: context.site!,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/en/blog/${postSlug(post.id)}`,
    })),
    customData: `<language>en-US</language>`,
  });
}
