import { storyblokEditable } from "@storyblok/react/rsc";
import styles from "./Cta.module.css";
import type { CtaBlok } from "@/components/storyblok/types";

export default function Cta({ blok = {} as CtaBlok }: { blok?: CtaBlok }) {
  return (
    <section className={styles.cta} {...storyblokEditable(blok)}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.panel}>
          {blok.eyebrow && <span className={styles.eyebrow}>{blok.eyebrow}</span>}
          {blok.title && <h2 className={styles.title}>{blok.title}</h2>}
          {blok.text && <p className={styles.text}>{blok.text}</p>}
          {(blok.primary_label || blok.secondary_label) && (
            <div className={styles.actions}>
              {blok.primary_label && (
                <a href={blok.primary_href || "#contact"} className={styles.primary}>
                  {blok.primary_label}
                </a>
              )}
              {blok.secondary_label && (
                <a href={blok.secondary_href || "#features"} className={styles.secondary}>
                  {blok.secondary_label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
