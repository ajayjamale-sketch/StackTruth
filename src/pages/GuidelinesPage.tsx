import React from "react";
import { Shield, CheckCircle, Lock, Users, Zap, FileText } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function GuidelinesPage() {
  return (
    <GenericContentPage
      title="Community"
      subtitle="Guidelines"
      heroBadge="Operational Protocol"
      heroDescription="Ensuring high technical fidelity and objective discourse through community-verified audit standards."
      primaryColor="primary"
      sections={[
        {
          title: "Technical Accuracy",
          description: "All solution protocols must be verified against official documentation or industrial benchmarks before publication.",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "Objective Discourse",
          description: "Maintain professional neutrality. Focus on architectural merits and computational efficiency rather than subjective preference.",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "Security Standards",
          description: "Ensure no proprietary data or sensitive credentials are included in code reviews or discussion audits.",
          icon: <Lock className="w-6 h-6" />
        },
        {
          title: "Collaborative Integrity",
          description: "Respect contributor consensus. Utilize the voting registry to highlight high-fidelity solutions and archive deprecated patterns.",
          icon: <Users className="w-6 h-6" />
        },
        {
          title: "Documentation Hygiene",
          description: "Use clean, semantic markdown and proper syntax highlighting for all technical contributions and audit reports.",
          icon: <FileText className="w-6 h-6" />
        }
      ]}
      ctaTitle="Commit to Standards"
      ctaDescription="By participating in the registry, you agree to maintain these industrial-grade auditing protocols."
      ctaButton="I Accept Protocols"
      ctaOnClick={() => navigate("/register")}
    />
  );
}
