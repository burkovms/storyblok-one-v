import { storyblokEditable } from '@storyblok/react/rsc';
import styles from './About.module.css';
import type { AboutBlok } from '@/components/storyblok/types';

export default function About({
  blok = {} as AboutBlok,
}: {
  blok?: AboutBlok;
}) {
  const points = blok.points
    ? blok.points
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  return (
    <section className={styles.about} id="about" {...storyblokEditable(blok)}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          {blok.eyebrow && <span className={styles.eyebrow}>{blok.eyebrow}</span>}
          {blok.title && <h2 className={styles.title}>{blok.title}</h2>}
          {blok.text && <p className={styles.text}>{blok.text}</p>}

          {points.length > 0 && (
            <ul className={styles.list}>
              {points.map((point) => (
                <li key={point} className={styles.listItem}>
                  <span className={styles.check} aria-hidden>
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.panel} aria-hidden>
          <div className={styles.panelBar}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.chart}>
            {[42, 68, 55, 80, 62, 95, 74].map((h, i) => (
              <div key={i} className={styles.bar} style={{ height: `${h}%` }} />
            ))}
          </div>
          {(blok.chart_label || blok.chart_trend) && (
            <div className={styles.panelMeta}>
              {blok.chart_label && <span>{blok.chart_label}</span>}
              {blok.chart_trend && <span className={styles.trend}>{blok.chart_trend}</span>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
