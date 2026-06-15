import {
  StoryblokStory,
  StoryblokServerComponent,
  type ISbStoryData,
  type SbBlokData,
} from "@storyblok/react/rsc";

import { getStoryblokApi } from "@/lib/storyblok";
import Page from "@/components/storyblok/Page";
import NewsList from "@/components/News/NewsList";
import { DEFAULT_PAGE } from "@/components/storyblok/defaultStory";

// Draft = show unpublished changes (needed for the Visual Editor preview).
// Switch to "published" + add revalidation for production traffic.
const VERSION = "draft";

async function fetchStory(slug: string, lang: string): Promise<ISbStoryData | null> {
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
      resolve_relations: ["global_reference.reference"],
    });
    return data.story;
  } catch {
    // 404 (story not created yet) or network error → use the default page.
    return null;
  }
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { lang, slug } = await params;
  const path = slug?.join("/") || "home";

  // The News archive lives at /news. Storyblok can't host a story at a folder's
  // own path, so the editable "chrome" (heading, intro, blocks) is a separate
  // story `news-overview` whose Real path is set to /news in Storyblok. We render
  // that story via StoryblokStory (gets the Visual Editor bridge) and append the
  // automatic post list. If the story doesn't exist yet, fall back to a default
  // heading so the page still works.
  if (path === "news") {
    const overview = await fetchStory("news-overview", lang);
    const body = (overview?.content?.body ?? []) as SbBlokData[];
    return (
      <>
        {/* Editable heading (title + intro) above the list. */}
        {overview && <StoryblokStory story={overview} />}
        <NewsList lang={lang} heading={overview ? undefined : "News"} />
        {/* Editable blocks render BELOW the post list. */}
        {body.map((nested) => (
          <StoryblokServerComponent blok={nested} key={nested._uid} />
        ))}
      </>
    );
  }

  const story = await fetchStory(path, lang);
  if (!story) {
    // Dev-friendly fallback so the site renders before any content exists.
    return <Page blok={DEFAULT_PAGE} />;
  }

  // StoryblokStory renders the story AND loads the bridge for live editing.
  return <StoryblokStory story={story} />;
}
