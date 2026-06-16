import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./Stats.module.css";
import type { StatsBlok } from "@/components/storyblok/types";

export default function Stats({ blok = {} as StatsBlok }: { blok?: StatsBlok }) {
  const items = blok.items ?? [];

  if (items.length === 0) return null;

  return (
    <section className={styles.stats} {...storyblokEditable(blok)}>
      <div className={`container ${styles.grid}`}>
        {items.map((stat, i) => (
          <div
            key={stat._uid ?? i}
            className={styles.item}
            {...(stat._uid ? storyblokEditable(stat) : {})}
          >
            {stat.value && <div className={styles.value}>{stat.value}</div>}
            {stat.label && <div className={styles.label}>{stat.label}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
