'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react';
import styles from './Header.module.css';
import type { NavLinkBlok } from '@/components/storyblok/types';

// `link` is appended to the current locale: "/about-us" → "/en/about-us",
// "#features" → "/en#features" (the section lives on the locale home page).
// Used when Storyblok has no "config" story yet, so the header still renders.
const fallbackNavLinks: NavLinkBlok[] = [
  { _uid: 'fallback-about', component: 'nav_link', link: '/about-us', label: 'About' },
  { _uid: 'fallback-features', component: 'nav_link', link: '#features', label: 'Features' },
  { _uid: 'fallback-testimonials', component: 'nav_link', link: '#testimonials', label: 'Testimonials' },
  { _uid: 'fallback-news', component: 'nav_link', link: '/news', label: 'News' },
  { _uid: 'fallback-contact', component: 'nav_link', link: '#contact', label: 'Contact' },
];

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UK' },
];

export default function Header({ navLinks }: { navLinks?: NavLinkBlok[] }) {
  const [open, setOpen] = useState(false);
  const links = navLinks?.length ? navLinks : fallbackNavLinks;
  const pathname = usePathname();
  const router = useRouter();

  // First path segment is the active locale, e.g. "/uk/about" → "uk".
  const currentLang = pathname.split('/')[1] || 'en';

  function switchLang(code: string) {
    const segments = pathname.split('/');
    segments[1] = code; // replace the locale segment
    router.push(segments.join('/') || `/${code}`);
    setOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link
          href={`/${currentLang}`}
          className={styles.logo}
          onClick={() => setOpen(false)}
        >
          <span className={styles.logoMark} aria-hidden />
          Nebula
        </Link>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
          {links.map((link, i) => (
            <Link
              key={link._uid ?? i}
              href={`/${currentLang}${link.link ?? ''}`}
              className={styles.navLink}
              onClick={() => setOpen(false)}
              {...storyblokEditable(link)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={`/${currentLang}#contact`}
            className={styles.cta}
            onClick={() => setOpen(false)}
          >
            Get started
          </Link>

          <div className={styles.langSwitch} role="group" aria-label="Language">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`${styles.langButton} ${
                  lang.code === currentLang ? styles.langActive : ''
                }`}
                aria-pressed={lang.code === currentLang}
                onClick={() => switchLang(lang.code)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`${styles.burgerBar} ${open ? styles.burgerBarOpen : ''}`}
          />
        </button>
      </div>
    </header>
  );
}
