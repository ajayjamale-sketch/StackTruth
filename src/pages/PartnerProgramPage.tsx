import React from "react";
import { Globe, Shield, Zap, Target, Users, Award } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function PartnerProgramPage() {
  return (
    <GenericContentPage
      title="Partner Program"
      subtitle="Strategic Alliance"
      heroBadge="Institutional"
      heroDescription="Collaborate with StackTruth to establish global technical standards and architectural audits."
      sections={[
        {
          title: "Corporate Audit",
          description: "Internal technical assessment protocols for institutional engineering teams.",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "API Integration",
          description: "High-fidelity integration protocols for technical assessment automation.",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "Certified Labs",
          description: "Verification of corporate training programs and technical curricula.",
          icon: <Award className="w-6 h-6" />
        },
        {
          title: "Strategic Talent",
          description: "Direct access to verified expert pipelines and high-growth mandates.",
          icon: <Target className="w-6 h-6" />
        },
        {
          title: "Global Visibility",
          description: "Brand recognition within the world's most rigorous engineering hub.",
          icon: <Globe className="w-6 h-6" />
        },
        {
          title: "Sovereign Support",
          description: "Priority technical support and custom architectural audit protocols.",
          icon: <Users className="w-6 h-6" />
        }
      ]}
      ctaTitle="Become a Partner"
      ctaDescription="Establish a strategic alliance and drive the future of technical sovereignty."
      ctaButton="Contact Sales Lab"
      primaryColor="slate-900"
    />
  );
}
