import { type ISbStoryData } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";
import styles from "./NewsList.module.css";
import type { NewsArticleBlok } from "@/components/storyblok/types";

const VERSION = "draft";

// The automatic post list. Async + server-only (it fetches every published
// `news_article` under the `news/` folder), so it is rendered directly by the
// route, not through the shared client registry. `heading` is rendered only as a
// fallback when there is no editable NewsOverview story to provide one.
export default async function NewsList({
  lang,
  heading,
}: {
  lang: string;
  heading?: string;
}) {
  const posts = await fetchPosts(lang);

  return (
    <section className={styles.list}>
      <div className="container">
        {heading && <h1 className={styles.title}>{heading}</h1>}

        {posts.length === 0 ? (
          <p className={styles.empty}>No posts yet.</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => {
              const content = post.content as NewsArticleBlok;
              return (
                <a
                  key={post.uuid}
                  href={`/${lang}/${post.full_slug}`}
                  className={styles.card}
                >
                  {content.image?.filename && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className={styles.thumb}
                      src={content.image.filename}
                      alt={content.image.alt || content.title || ""}
                    />
                  )}
                  <div className={styles.cardBody}>
                    {content.date && (
                      <time className={styles.date}>{formatDate(content.date)}</time>
                    )}
                    <h2 className={styles.cardTitle}>{content.title}</h2>
                    {content.teaser && (
                      <p className={styles.cardTeaser}>{content.teaser}</p>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

async function fetchPosts(lang: string): Promise<ISbStoryData[]> {
  if (!process.env.NEXT_PUBLIC_STORYBLOK_TOKEN) return [];
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get("cdn/stories", {
      version: VERSION,
      starts_with: "news/",
      content_type: "news_article",
      sort_by: "content.date:desc",
      language: lang,
    });
    return data.stories;
  } catch {
    return [];
  }
}

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
