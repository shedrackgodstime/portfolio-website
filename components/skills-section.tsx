import { getTechnicalSkillsInfo } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { CodeIcon } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

const SkillTagComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 py-1 bg-zinc-800 rounded-full text-xs font-medium text-zinc-400">
      {children}
    </div>
  );
};

export function SkillsSection() {
  const technicalSkills = getTechnicalSkillsInfo();

  return (
    <Card className="bg-zinc-900/70 border-zinc-800 backdrop-blur-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center mb-4">
          <CodeIcon className="w-5 h-5 mr-2 text-cyan-400" />
          <h3 className="text-lg font-medium">Technical Skills</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {Object.entries(technicalSkills).map(([category, skills], index) => (
            <AnimatedSection
              key={category}
              animation={index % 2 === 0 ? "slide-right" : "slide-left"}
              delay={100 + index * 100}
            >
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-zinc-400">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, skillIndex: number) => (
                    <SkillTagComponent key={skillIndex}>{skill}</SkillTagComponent>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}