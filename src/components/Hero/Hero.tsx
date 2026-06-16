import { storyblokEditable } from '@storyblok/react/rsc';
import styles from './Hero.module.css';
import type { HeroBlok } from '@/components/storyblok/types';

export default function Hero({ blok = {} as HeroBlok }: { blok?: HeroBlok }) {
  const logos = (blok.trust_logos || '')
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <section className={styles.hero} id="top" {...storyblokEditable(blok)}>
      <div className={`container ${styles.inner}`}>
        {blok.badge && <span className={styles.badge}>{blok.badge}</span>}

        {(blok.title || blok.highlight) && (
          <h1 className={styles.title}>
            {blok.title}{' '}
            {blok.highlight && (
              <span className={styles.gradient}>{blok.highlight}</span>
            )}
          </h1>
        )}

        {blok.subtitle && <p className={styles.subtitle}>{blok.subtitle}</p>}

        {(blok.primary_label || blok.secondary_label) && (
          <div className={styles.actions}>
            {blok.primary_label && (
              <a
                href={blok.primary_href || '#contact'}
                className={styles.primary}
              >
                {blok.primary_label}
              </a>
            )}
            {blok.secondary_label && (
              <a
                href={blok.secondary_href || '#features'}
                className={styles.secondary}
              >
                {blok.secondary_label}
              </a>
            )}
          </div>
        )}

        {(blok.trust_label || logos.length > 0) && (
          <div className={styles.trust}>
            {blok.trust_label}
            <div className={styles.logos}>
              {logos.map((logo) => (
                <span key={logo}>{logo}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.glow} aria-hidden />
    </section>
  );
}
