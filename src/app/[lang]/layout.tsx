import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { getStoryblokApi } from '@/lib/storyblok';
import type { ConfigBlok, NavLinkBlok } from '@/components/storyblok/types';

// The global "config" story holds content shared across every page (header nav
// today, footer/social later). Fetched once per layout render and passed down.
// Returns null when no token is set or the story doesn't exist yet → the Header
// falls back to its built-in links, so the site still renders.
async function fetchConfig(lang: string): Promise<ConfigBlok | null> {
  if (!process.env.NEXT_PUBLIC_STORYBLOK_TOKEN) return null;

  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories/config', {
      version: 'draft',
      language: lang,
    });
    return data.story.content as ConfigBlok;
  } catch {
    return null;
  }
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nebula — Analytics you can trust',
  description:
    'Nebula turns raw product events into clear, actionable decisions. Realtime analytics for fast-growing teams.',
};

// Pre-render both locales. Add a code here when you add a language in Storyblok.
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'uk' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const config = await fetchConfig(lang);
  const navLinks: NavLinkBlok[] = config?.nav_links ?? [];

  return (
    <StoryblokProvider>
      <html
        lang={lang}
        className={`${geistSans.variable} ${geistMono.variable}`}
        data-scroll-behavior="smooth"
      >
        <body>
          <Header navLinks={navLinks} />
          {children}
          <Footer />
        </body>
      </html>
    </StoryblokProvider>
  );
}
