import React from "react";
import { Building, Target, Shield, Users, Award, Globe } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function CompanyWisePage() {
  return (
    <GenericContentPage
      title="Company Wise"
      subtitle="Audit Tracks"
      heroBadge="Strategic Prep"
      heroDescription="Industrial-grade interview protocols and technical audits tailored to global technology firms."
      sections={[
        {
          title: "FAANG Protocols",
          description: "Audit questions and technical standards from top-tier engineering labs.",
          icon: <Building className="w-6 h-6" />
        },
        {
          title: "FinTech Audits",
          description: "Specialized protocols for high-frequency trading and financial systems.",
          icon: <Target className="w-6 h-6" />
        },
        {
          title: "Startup Scalability",
          description: "Technical standards for high-growth, venture-backed engineering firms.",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "Recruiter Insights",
          description: "Internal hiring metrics and technical evaluation protocol audits.",
          icon: <Users className="w-6 h-6" />
        },
        {
          title: "Interview bluePrints",
          description: "Structured preparation tracks for specific engineering roles.",
          icon: <Award className="w-6 h-6" />
        },
        {
          title: "Global Benchmarks",
          description: "Competitive analysis of technical standards across global markets.",
          icon: <Globe className="w-6 h-6" />
        }
      ]}
      ctaTitle="Explore Companies"
      ctaDescription="Access company-specific audit registries and prepare for your next mandate."
      ctaButton="Search Companies"
      primaryColor="blue-600"
    />
  );
}
