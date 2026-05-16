import React from "react";
import { Users, Shield, Cpu, Zap, Globe, Star, Award, Search, MessageSquare, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function FacultyPage() {
  const navigate = useNavigate();

  return (
    <GenericContentPage
      title="Global Faculty"
      subtitle="The Auditors"
      heroBadge="Technical Sovereignty"
      heroDescription="Learn from a decentralized node of world-class engineers, architects, and technical auditors dedicated to industrial excellence."
      primaryColor="primary"
      sections={[
        {
          title: "Core Engineering Auditors",
          description: "Senior engineering leadership from global technology hubs, providing deep-logic verification and performance audits.",
          icon: <Users className="w-6 h-6" />,
          onClick: () => navigate("/questions")
        },
        {
          title: "Architectural Mentors",
          description: "Systems architects specializing in high-concurrency clusters, distributed systems, and atomic data integrity.",
          icon: <Shield className="w-6 h-6" />,
          onClick: () => navigate("/practice/system-design")
        },
        {
          title: "AI Research Node",
          description: "Neural infrastructure experts building the next generation of industrial intelligence and machine learning pipelines.",
          icon: <Cpu className="w-6 h-6" />,
          onClick: () => navigate("/tutorials/ai")
        },
        {
          title: "Security & Risk Protocols",
          description: "Cyber-security veterans auditing mission-critical systems and enforcing global security standards.",
          icon: <Zap className="w-6 h-6" />,
          onClick: () => navigate("/tutorials/devops")
        },
        {
          title: "Industrial Practitioners",
          description: "Full-stack engineers and DevOps leads with proven experience in deploying global-scale production environments.",
          icon: <Globe className="w-6 h-6" />,
          onClick: () => navigate("/tutorials/mern")
        }
      ]}
      ctaTitle="Connect with Experts"
      ctaDescription="Access direct mentorship and architectural reviews from our global faculty of technical auditors."
      ctaButton="Join Expert Lab"
      ctaOnClick={() => navigate("/register")}
    />
  );
}
