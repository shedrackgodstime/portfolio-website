"use client"

import { ContactForm } from "@/components/contact-form"
import { getPersonalInfo } from "@/lib/data"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Twitter, Instagram, MessageCircle, Mail, Phone, MapPin, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const personalInfo = getPersonalInfo()

  // Fallback UI if personalInfo is missing
  if (!personalInfo) {
    return (
      <main className="container mx-auto px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-12 min-h-screen">
        <AnimatedSection animation="fade-in" className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Error</h1>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">Unable to load contact information. Please try again later.</p>
          <Link href="/" className="inline-flex items-center mt-6 text-sm sm:text-base text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Back to Portfolio
          </Link>
        </AnimatedSection>
      </main>
    )
  }

  const iconMap = {
    Github: Github,
    Linkedin: Linkedin,
    Twitter: Twitter,
    Instagram: Instagram,
    MessageCircle: MessageCircle,
  }

  return (
    <main>
    {/* Header */}
      <AnimatedSection animation="fade-up" className="mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Let&apos;s Connect
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-zinc-400 max-w-xl sm:max-w-2xl">
          I&apos;m excited to collaborate, discuss projects, or just chat about tech. Reach out via the form or my contact details below.
        </p>
      </AnimatedSection>


      <div className="md:flex gap-4">
        {/* Contact Form */}
        <AnimatedSection animation="fade-up" delay={100} className="md:sticky">
          <Card className="bg-zinc-900/90 border-zinc-800/60 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="p-4 sm:p-6 border-b border-zinc-800/50">
              <CardTitle className="text-xl sm:text-2xl font-semibold text-white">
                Send a Message
              </CardTitle>
              <p className="text-sm sm:text-base text-zinc-400 mt-1">
                Drop me a message, and I&apos;ll get back to you promptly.
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Contact Sidebar */}
        <AnimatedSection animation="fade-up" delay={200} className="">
          <Card className="bg-zinc-900/90 border-zinc-800/60 backdrop-blur-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="p-4 sm:p-6 border-b border-zinc-800/50">
              <CardTitle className="text-xl sm:text-2xl font-semibold text-white">
                Get in Touch
              </CardTitle>
              <p className="text-sm sm:text-base text-zinc-400 mt-1">
                Connect with me directly or on social media.
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-zinc-300">Email</h3>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-base text-zinc-200 hover:text-cyan-400 transition-colors duration-300"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-zinc-300">Phone</h3>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-base text-zinc-200 hover:text-cyan-400 transition-colors duration-300"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-zinc-300">Location</h3>
                    <p className="text-base text-zinc-200">{personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-zinc-300">Working Hours</h3>
                    <p className="text-base text-zinc-200">{personalInfo.workingHours}</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4 border-t border-zinc-800/50">
                <h3 className="text-sm font-medium text-zinc-300 mb-3">Follow Me</h3>
                <div className="flex flex-col gap-2">
                  {personalInfo.social.map((item, index) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap]
                    return (
                      <AnimatedSection key={index} animation="fade-up" delay={100 * (index + 1)}>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-base text-zinc-200 hover:text-cyan-400 hover:bg-zinc-800/30 transition-all duration-300"
                        >
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            <Icon className="w-5 h-5 mr-2 text-cyan-400" />
                            {item.platform}
                          </a>
                        </Button>
                      </AnimatedSection>
                    )
                  })}
                </div>
              </div>

              {/* Availability Badge */}
              {personalInfo.availableForWork && (
                <div className="pt-4">
                  <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full">
                    Available for Work
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </main>
  )
}