import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./NewsOverview.module.css";
import type { NewsOverviewBlok } from "@/components/storyblok/types";

// Editable heading of the News archive (title + intro), shown above the post
// list. Client-safe and registered in storyblokConfig, so it renders through
// StoryblokStory and gets the full Visual Editor bridge (live preview). The
// `body` blocks are rendered separately by the route, BELOW the post list.
export default function NewsOverview({ blok }: { blok: NewsOverviewBlok }) {
  return (
    <section className={styles.head} {...storyblokEditable(blok)}>
      <div className="container">
        <h1 className={styles.title}>{blok.title || "News"}</h1>
        {blok.intro && <p className={styles.intro}>{blok.intro}</p>}
      </div>
    </section>
  );
}
