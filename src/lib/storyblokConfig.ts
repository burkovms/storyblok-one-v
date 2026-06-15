// Single source of truth for the Storyblok access token + component registry.
// Imported by BOTH the server init (lib/storyblok.ts) and the client init
// (StoryblokProvider.tsx), so the same map is registered in each environment.
import Page from "@/components/storyblok/Page";
import Hero from "@/components/Hero/Hero";
import Stats from "@/components/Stats/Stats";
import About from "@/components/About/About";
import Features from "@/components/Features/Features";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import Cta from "@/components/Cta/Cta";
import NewsArticle from "@/components/News/NewsArticle";
import NewsOverview from "@/components/News/NewsOverview";
import GlobalReference from "@/components/storyblok/GlobalReference";

export const accessToken = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;

// Keys must match the technical names of your Storyblok blocks.
export const storyblokComponents = {
  page: Page,
  hero: Hero,
  stats: Stats,
  about: About,
  features: Features,
  testimonials: Testimonials,
  contact: Contact,
  cta: Cta,
  news_article: NewsArticle,
  news_overview: NewsOverview,
  global_reference: GlobalReference,
};
