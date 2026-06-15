import type {
  SbBlokData,
  ISbStoryData,
  StoryblokRichTextNode,
} from "@storyblok/react/rsc";

// Storyblok "Asset" field — an image/file picked in the editor.
export interface StoryblokAsset {
  filename?: string;
  alt?: string;
  title?: string;
}

export interface HeroBlok extends SbBlokData {
  badge?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primary_label?: string;
  primary_href?: string;
  secondary_label?: string;
  secondary_href?: string;
  trust_label?: string;
  trust_logos?: string; // comma-separated
}

export interface StatItemBlok extends SbBlokData {
  value?: string;
  label?: string;
}

export interface StatsBlok extends SbBlokData {
  items?: StatItemBlok[];
}

export interface AboutBlok extends SbBlokData {
  eyebrow?: string;
  title?: string;
  text?: string;
  points?: string; // newline-separated
  chart_label?: string;
  chart_trend?: string;
}

export interface FeatureCardBlok extends SbBlokData {
  icon?: string;
  title?: string;
  text?: string;
}

export interface FeaturesBlok extends SbBlokData {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FeatureCardBlok[];
}

export interface TestimonialBlok extends SbBlokData {
  quote?: string;
  name?: string;
  role?: string;
}

export interface TestimonialsBlok extends SbBlokData {
  eyebrow?: string;
  title?: string;
  items?: TestimonialBlok[];
}

export interface ContactBlok extends SbBlokData {
  eyebrow?: string;
  title?: string;
  text?: string;
  email?: string;
  phone?: string;
  location?: string;
  submit_label?: string;
}

export interface CtaBlok extends SbBlokData {
  eyebrow?: string;
  title?: string;
  text?: string;
  primary_label?: string;
  primary_href?: string;
  secondary_label?: string;
  secondary_href?: string;
}

export interface GlobalReferenceBlok extends SbBlokData {
  // Before resolution this is a story UUID (string); after the route resolves
  // "global_reference.reference" it becomes the full referenced story object.
  reference?: ISbStoryData | string;
}

export interface PageBlok extends SbBlokData {
  body?: SbBlokData[];
}

// A single News entry — the Storyblok "Content type" block `news_article`.
// One Story of this type = one post; its slug (e.g. news/my-post) is the URL.
export interface NewsArticleBlok extends SbBlokData {
  title?: string;
  date?: string; // Datetime field, ISO string
  teaser?: string;
  image?: StoryblokAsset;
  content?: StoryblokRichTextNode; // Richtext field
}

// The News archive "chrome" — the Storyblok "Content type" block
// `news_overview`. Editable heading, intro, and any nestable blocks the editor
// adds; the automatic post list is rendered separately (NewsList).
export interface NewsOverviewBlok extends SbBlokData {
  title?: string;
  intro?: string;
  body?: SbBlokData[];
}
