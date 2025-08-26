"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BrainCircuit, Clock, ExternalLink, Github } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { getAllProjects } from "@/lib/data"

// Define the ProjectsPage component
export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main>
      {/* Header */}
      <AnimatedSection animation="fade-up" className="mb-8 sm:mb-10 md:mb-12">
        <h3 className="text-lg font-medium">
          My Projects
        </h3>
        <p className="text-zinc-300 max-w-xl">
          Explore a collection of my work from security-focused tools to web
          applications. Each project reflects my growth, creativity, and passion
          for technology.
        </p>
      </AnimatedSection>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <AnimatedSection key={project.id} animation="fade-up" delay={100 * (index + 1)}>
            <ProjectCard
              title={project.title}
              shortDescription={project.shortDescription}
              category={project.category}
              timeline={project.timeline}
              slug={project.slug}
              image={project.thumbnailImage}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          </AnimatedSection>
        ))}
      </div>
    </main>
  )
}

// Define the ProjectCard component
function ProjectCard({
  title,
  shortDescription,
  category,
  timeline,
  slug,
  image,
  liveUrl,
  githubUrl,
}: {
  title: string
  shortDescription: string
  category: string
  timeline: string
  slug: string
  image: string
  liveUrl?: string
  githubUrl?: string
}) {
  return (
    <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm overflow-hidden group">
      <Link href={`/projects/${slug}`}>
        <div className="relative h-48 sm:h-56 rounded-t-lg overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={`${title} thumbnail`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>
      </Link>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-400 mb-2">
          <BrainCircuit className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{category}</span>
        </div>
        <Link href={`/projects/${slug}`}>
          <h3 className="text-base sm:text-lg font-medium group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-2">
          {shortDescription}
        </p>
        <div className="flex items-center gap-1 mt-3 text-xs sm:text-sm text-zinc-400">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{timeline}</span>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
          {liveUrl && (
            <Button
              asChild
              size="sm"
              className="bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-xs sm:text-sm"
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                View Live
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button asChild variant="outline" size="sm" className="text-xs sm:text-sm">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}