import type React from "react"
import type {
  Metadata
} from "next"
import {
  Inter
} from "next/font/google"
import "./globals.css"
import {
  ScrollProgressIndicator
} from "@/components/scroll-progress-indicator"
import {
  AnimationProvider
} from "@/contexts/animation-context"
import {
  getMetaInfo
} from "@/lib/data"

import { getPersonalInfo } from "@/lib/data";

// Added missing imports
import {
  PortfolioHeader
} from "@/components/portfolio-header"
import {
  AnimatedSection
} from "@/components/animated-section"
import {
  EnhancedScrollIndicator
} from "@/components/enhanced-scroll-indicator"

const inter = Inter( {
  subsets: ["latin"]
})

const metaInfo = getMetaInfo()
const personalInfo = getPersonalInfo();

export const metadata: Metadata = {
  title: metaInfo.title,
  description: metaInfo.description,
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
  )
}