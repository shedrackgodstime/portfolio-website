import { GlobeIcon, BriefcaseIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProjectCard } from "@/components/project-card"
import { SkillsSection } from "@/components/skills-section"
import { getAllProjects } from "@/lib/data"
import { ExperienceCard } from "@/components/experience-card"
import { AnimatedSection } from "@/components/animated-section"
import { EnhancedProfile } from "@/components/enhanced-profile"
import { CredentialsSection } from "@/components/credentials-section"
import { getExperienceInfo } from "@/lib/data"
import Link from "next/link"


export default function Home() {
  const projects = getAllProjects()
  const experienceInfo = getExperienceInfo()

  return (

    <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Enhanced Profile Section */}
      <div className="md:sticky md:top-24 self-start">
        <AnimatedSection animation="slide-right">
          <EnhancedProfile />
        </AnimatedSection>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-4 sm:space-y-6">
        {/* Experience Section - Expanded */}
        <AnimatedSection animation="fade-up" id="experience">
          <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <BriefcaseIcon className="w-5 h-5 mr-2 text-cyan-400" />
                <h3 className="text-lg font-medium">Experience</h3>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {experienceInfo.map((experience, index) => (
                  <AnimatedSection key={index} animation="fade-up" delay={100 * (index + 1)}>
                    <ExperienceCard
                      title={experience.title}
                      company={experience.company}
                      period={experience.period}
                      description={experience.description}
                      achievements={experience.achievements}
                      technologies={experience.technologies}
                    />
                  </AnimatedSection>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Credentials Section */}
        <AnimatedSection animation="fade-up" id="credentials">
          <CredentialsSection />
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection animation="fade-up" id="skills">
          <SkillsSection />
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection animation="fade-up" id="projects">
          <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center">
                  <GlobeIcon className="w-5 h-5 mr-2 text-cyan-400" />
                  <h3 className="text-lg font-medium">Recent Projects</h3>
                </div>
                <Link href="/projects">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {projects.slice(0, 3).map((project, index) => (
                  <AnimatedSection key={project.id} animation="zoom-in" delay={100 * (index + 1)}>
                    <ProjectCard
                      title={project.title}
                      category={project.category}
                      image={project.thumbnailImage}
                      slug={project.slug}
                    />
                  </AnimatedSection>
                ))}
              </div>

            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </main>
  )
}