import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Components & Context
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";
import { AnimationProvider } from "@/contexts/animation-context";
import { PortfolioHeader } from "@/components/portfolio-header";
import { AnimatedSection } from "@/components/animated-section";
import { EnhancedScrollIndicator } from "@/components/enhanced-scroll-indicator";

// Data helpers
import { getPersonalInfo, getSeoInfo } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

const personalInfo = getPersonalInfo();
const seo = getSeoInfo();

// ✅ SEO Metadata from seo-data.json
export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  openGraph: { ...seo.openGraph },
  twitter: { ...seo.twitter },
  authors: [{ name: seo.author.name }],
  metadataBase: new URL(seo.siteUrl),
  alternates: { canonical: seo.siteUrl },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Schema.org JSON-LD with richer Person info */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: seo.author.name,
              alternateName: seo.author.alternateNames,
              description: seo.description,
              jobTitle: seo.author.jobTitle,
              gender: "Male",
              birthPlace: {
                "@type": "Place",
                name: "Auchi, Edo State, Nigeria",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Auchi",
                addressRegion: "Edo",
                addressCountry: "Nigeria",
              },
              url: seo.siteUrl,
              image: [
                "/profile-picture.webp",
                "/profile-picture2.webp",
              ],
              sameAs: seo.author.sameAs,
            }),
          }}
        />

        {/* ✅ Extra hint for crawlers */}
        <link
          rel="image_src"
          href="https://yourdomain.com/images/profile.jpg"
        />
      </head>
      <body className={inter.className}>
        <AnimationProvider>
          <ScrollProgressIndicator />

          <main className="min-h-screen bg-black text-white">
            {/* Background Grid Pattern */}
            <div className="fixed inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] bg-size-[20px_20px] opacity-20 z-0"></div>

            {/* Header */}
            <PortfolioHeader />

            <div className="relative z-10 container mx-auto p-3 sm:p-4 pt-20 sm:pt-24 pb-6 sm:pb-8">
              {children}

              {/* Footer */}
              <AnimatedSection
                animation="fade-in"
                delay={500}
                className="mt-8 sm:mt-12 py-4 sm:py-6 text-center text-xs sm:text-sm text-zinc-500"
              >
                <p>
                  © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                </p>
              </AnimatedSection>
            </div>

            {/* Scroll to Top Button */}
            <EnhancedScrollIndicator />
          </main>
        </AnimationProvider>
      </body>
    </html>
  );
}
