import React from "react";
import { 
  Shield, Zap, Award, CheckCircle, ArrowRight, 
  Layers, Code2, Sparkles, BookOpen, Clock, Target, 
  Terminal, Cpu, Network, Database
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function PracticePage() {
  const navigate = useNavigate();

  return (
    <GenericContentPage
      title="Engineering"
      subtitle="Hub"
      heroBadge="Technical Sovereignty"
      heroDescription="Industrial-grade laboratory for verifying implementation protocols across foundational and advanced engineering disciplines."
      primaryColor="primary"
      sections={[
        {
          title: "Data Structures",
          description: "Master contiguous memory allocation, linked registries, and complex hierarchy audits.",
          icon: <Database className="w-6 h-6" />,
          onClick: () => navigate("/practice/data-structures")
        },
        {
          title: "Algorithms Mastery",
          description: "Computational complexity audits, graph traversal protocols, and dynamic optimization.",
          icon: <Zap className="w-6 h-6" />,
          onClick: () => navigate("/practice/algorithms")
        },
        {
          title: "System Design",
          description: "Architectural patterns for high-concurrency clusters and distributed data integrity.",
          icon: <Shield className="w-6 h-6" />,
          onClick: () => navigate("/practice/system-design")
        },
        {
          title: "Technical Audits",
          description: "Real-world engineering challenges and community-verified solution protocols.",
          icon: <Code2 className="w-6 h-6" />,
          onClick: () => navigate("/questions")
        },
        {
          title: "Live Laboratory",
          description: "Real-time computational benchmarks and collaborative protocol verification.",
          icon: <Terminal className="w-6 h-6" />,
          onClick: () => navigate("/live-coding")
        }
      ]}
      ctaTitle="Initialize Global Audit"
      ctaDescription="Access the complete registry of engineering challenges and earn verified mastery credentials."
      ctaButton="Start Engineering Track"
      ctaOnClick={() => navigate("/questions")}
    />
  );
}
