import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import StoryblokProvider from "@/components/StoryblokProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nebula — Analytics you can trust",
  description:
    "Nebula turns raw product events into clear, actionable decisions. Realtime analytics for fast-growing teams.",
};

// Pre-render both locales. Add a code here when you add a language in Storyblok.
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uk" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <StoryblokProvider>
      <html lang={lang} className={`${geistSans.variable} ${geistMono.variable}`}>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </StoryblokProvider>
  );
}
