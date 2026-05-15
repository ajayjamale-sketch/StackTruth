import React from "react";
import { BookOpen, Award, Target, Users, Zap, Shield } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function CoursesPage() {
  return (
    <GenericContentPage
      title="Courses"
      subtitle="Certification Lab"
      heroBadge="Mastery"
      heroDescription="Professional-grade technical mastery programs with verified industrial certification protocols."
      sections={[
        {
          title: "Full-Stack Audit",
          description: "MERN, Next.js, and advanced web ecosystem mastery programs.",
          icon: <BookOpen className="w-6 h-6" />
        },
        {
          title: "Architecture Lab",
          description: "System design and distributed systems industrial-grade certification.",
          icon: <Award className="w-6 h-6" />
        },
        {
          title: "AI Engineering",
          description: "LLM orchestration, neural auditing, and data science mastery programs.",
          icon: <Target className="w-6 h-6" />
        },
        {
          title: "Security Master",
          description: "Cyber security, encryption, and secure protocol development audits.",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "Ops & Infrastructure",
          description: "Kubernetes, AWS, and cloud-scale infrastructure mastery programs.",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "Expert Mentorship",
          description: "1-on-1 technical audits with verified industry leaders and architects.",
          icon: <Users className="w-6 h-6" />
        }
      ]}
      ctaTitle="Explore Catalog"
      ctaDescription="Browse our verified technical curricula and begin your mastery protocol."
      ctaButton="View Courses"
      primaryColor="primary"
    />
  );
}
