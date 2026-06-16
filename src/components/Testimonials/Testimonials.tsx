import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./Testimonials.module.css";
import type { TestimonialsBlok } from "@/components/storyblok/types";

export default function Testimonials({ blok = {} as TestimonialsBlok }: { blok?: TestimonialsBlok }) {
  const items = blok.items ?? [];

  return (
    <section className={styles.testimonials} id="testimonials" {...storyblokEditable(blok)}>
      <div className="container">
        {(blok.eyebrow || blok.title) && (
          <div className={styles.head}>
            {blok.eyebrow && <span className={styles.eyebrow}>{blok.eyebrow}</span>}
            {blok.title && <h2 className={styles.title}>{blok.title}</h2>}
          </div>
        )}

        {items.length > 0 && (
          <div className={styles.grid}>
            {items.map((t, i) => (
              <figure
                key={t._uid ?? i}
                className={styles.card}
                {...(t._uid ? storyblokEditable(t) : {})}
              >
                <div className={styles.stars} aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                {t.quote && <blockquote className={styles.quote}>{t.quote}</blockquote>}
                {(t.name || t.role) && (
                  <figcaption className={styles.author}>
                    {t.name && (
                      <span className={styles.avatar} aria-hidden>
                        {t.name.charAt(0)}
                      </span>
                    )}
                    <span>
                      {t.name && <span className={styles.name}>{t.name}</span>}
                      {t.role && <span className={styles.role}>{t.role}</span>}
                    </span>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
