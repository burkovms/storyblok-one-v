import {
  StoryblokStory,
  StoryblokServerComponent,
  type ISbStoryData,
  type SbBlokData,
} from '@storyblok/react/rsc';

import { notFound } from 'next/navigation';

import { getStoryblokApi } from '@/lib/storyblok';
import Page from '@/components/storyblok/Page';
import NewsList from '@/components/News/NewsList';
import { DEFAULT_PAGE } from '@/components/storyblok/defaultStory';

// Draft = show unpublished changes (needed for the Visual Editor preview).
// Switch to "published" + add revalidation for production traffic.
const VERSION = 'draft';

async function fetchStory(
  slug: string,
  lang: string,
): Promise<ISbStoryData | null> {
  // No token configured yet → fall back to the built-in default page.
  if (!process.env.NEXT_PUBLIC_STORYBLOK_TOKEN) return null;

  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: VERSION,
      // Field-level translations: Storyblok returns the `lang` translation per
      // field, falling back to the default (English) where none exists. Passing
      // the default code "en" (not a configured dimension) simply yields default.
      language: lang,
      // Expand `global_reference` blocks: replace the stored story UUID with the
      // full referenced story so GlobalReference can render its content inline.
      resolve_relations: ['global_reference.reference'],
    });
    return data.story;
  } catch {
    // 404 (story not created yet) or network error → use the default page.
    return null;
  }
}

export default async function CatchAllPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang, slug } = await params;
  const { _storyblok } = await searchParams;
  const path = slug?.join('/') || 'home';

  const story = await fetchStory(path, lang);
  if (!story) {
    // Dev-friendly fallback so the site renders before any content exists.
    return <Page blok={DEFAULT_PAGE} />;
  }

  // Global, non-routable stories (e.g. the shared "config" story the layout
  // reads for header nav) have no page representation.
  if (story.content.component === 'config') {
    // Public traffic → 404 (don't expose a duplicate of the home page).
    // Inside the Visual Editor (URL carries `_storyblok`) → preview the locale
    // home page instead, so editing config shows a live page with the header.
    if (_storyblok === undefined) notFound();

    const home = await fetchStory('home', lang);
    if (!home) return <Page blok={DEFAULT_PAGE} />;
    return <StoryblokStory story={home} />;
  }

  // The News archive is the `news` folder's start page (content type
  // news_overview), so it resolves natively at /news while posts stay at
  // /news/<slug>. Render its editable chrome (heading/intro) via StoryblokStory,
  // then the automatic post list, then any blocks the editor added — below it.
  if (story.content.component === 'news_overview') {
    const body = (story.content.body ?? []) as SbBlokData[];
    return (
      <>
        <StoryblokStory story={story} />
        <NewsList lang={lang} />
        {body.map((nested) => (
          <StoryblokServerComponent blok={nested} key={nested._uid} />
        ))}
      </>
    );
  }

  // StoryblokStory renders the story AND loads the bridge for live editing.
  return <StoryblokStory story={story} />;
}
