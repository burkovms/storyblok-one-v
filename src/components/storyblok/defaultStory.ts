import type { PageBlok } from "./types";

// Rendered when no matching Storyblok story exists yet (e.g. before you create
// content in your Space). The bloks below have empty fields — and since each
// component now renders only the fields that are filled, these sections appear
// empty until you add content. Once you create a "home" story in Storyblok with
// real field values, that content takes over.
export const DEFAULT_PAGE: PageBlok = {
  _uid: "default-page",
  component: "page",
  body: [
    { _uid: "default-hero", component: "hero" },
    { _uid: "default-stats", component: "stats" },
    { _uid: "default-about", component: "about" },
    { _uid: "default-features", component: "features" },
    { _uid: "default-testimonials", component: "testimonials" },
    { _uid: "default-cta", component: "cta" },
    { _uid: "default-contact", component: "contact" },
  ],
};
