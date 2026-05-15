import React from "react";
import { Briefcase, Heart, Zap, Globe, Target, Shield } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function CareersPage() {
  return (
    <GenericContentPage
      title="Careers"
      subtitle="Join the Lab"
      heroBadge="Internal Hiring"
      heroDescription="We're building the future of technical sovereignty. Join our internal engineering lab."
      sections={[
        {
          title: "Engineering Lab",
          description: "Build the world's most rigorous technical audit and knowledge platform.",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "Product Design",
          description: "Create high-fidelity industrial interfaces for engineering experts.",
          icon: <Target className="w-6 h-6" />
        },
        {
          title: "AI Research",
          description: "Develop the next generation of automated code review and audit intelligence.",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "Global Operations",
          description: "Scale our technical infrastructure and expert network across 120+ countries.",
          icon: <Globe className="w-6 h-6" />
        },
        {
          title: "Technical Content",
          description: "Curate and verify the world's deepest repository of technical protocols.",
          icon: <Briefcase className="w-6 h-6" />
        },
        {
          title: "Sovereign Culture",
          description: "A developer-first environment focused on technical excellence and impact.",
          icon: <Heart className="w-6 h-6" />
        }
      ]}
      ctaTitle="Explore Roles"
      ctaDescription="Join a team of world-class engineers building the future of knowledge."
      ctaButton="View Openings"
      primaryColor="primary"
    />
  );
}
