import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./Features.module.css";
import type { FeaturesBlok } from "@/components/storyblok/types";

export default function Features({ blok = {} as FeaturesBlok }: { blok?: FeaturesBlok }) {
  const items = blok.items ?? [];

  return (
    <section className={styles.features} id="features" {...storyblokEditable(blok)}>
      <div className="container">
        {(blok.eyebrow || blok.title || blok.subtitle) && (
          <div className={styles.head}>
            {blok.eyebrow && <span className={styles.eyebrow}>{blok.eyebrow}</span>}
            {blok.title && <h2 className={styles.title}>{blok.title}</h2>}
            {blok.subtitle && <p className={styles.subtitle}>{blok.subtitle}</p>}
          </div>
        )}

        {items.length > 0 && (
          <div className={styles.grid}>
            {items.map((feature, i) => (
              <article
                key={feature._uid ?? i}
                className={styles.card}
                {...(feature._uid ? storyblokEditable(feature) : {})}
              >
                {feature.icon && (
                  <div className={styles.icon} aria-hidden>
                    {feature.icon}
                  </div>
                )}
                {feature.title && <h3 className={styles.cardTitle}>{feature.title}</h3>}
                {feature.text && <p className={styles.cardText}>{feature.text}</p>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
