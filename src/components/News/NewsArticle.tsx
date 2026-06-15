import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";
import styles from "./NewsArticle.module.css";
import type { NewsArticleBlok } from "@/components/storyblok/types";

// Renders ONE news post. The route fetches the story by its slug
// (e.g. news/my-post → /<lang>/news/my-post) and StoryblokStory mounts this
// component because the story's content type is `news_article`.
export default function NewsArticle({ blok }: { blok: NewsArticleBlok }) {
  const html = blok.content ? renderRichText(blok.content) : "";
  const date = blok.date ? formatDate(blok.date) : null;

  return (
    <article className={styles.article} {...storyblokEditable(blok)}>
      <div className="container">
        <header className={styles.header}>
          {date && <time className={styles.date}>{date}</time>}
          <h1 className={styles.title}>{blok.title}</h1>
          {blok.teaser && <p className={styles.teaser}>{blok.teaser}</p>}
        </header>

        {blok.image?.filename && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.cover}
            src={blok.image.filename}
            alt={blok.image.alt || blok.title || ""}
          />
        )}

        {html && (
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </article>
  );
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
