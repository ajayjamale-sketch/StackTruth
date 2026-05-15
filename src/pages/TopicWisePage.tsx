import React from "react";
import { Tag, BookOpen, Layers, Cpu, Shield, Zap } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function TopicWisePage() {
  return (
    <GenericContentPage
      title="Topic Wise"
      subtitle="Knowledge Hub"
      heroBadge="Curated Learning"
      heroDescription="Deep-dive technical audits organized by specific engineering domains and technical disciplines."
      sections={[
        {
          title: "Frontend Systems",
          description: "Protocols for React, Vue, and modern browser-side engineering audits.",
          icon: <Tag className="w-6 h-6" />
        },
        {
          title: "Backend Core",
          description: "Distributed systems, Node.js, and multi-threaded execution audits.",
          icon: <BookOpen className="w-6 h-6" />
        },
        {
          title: "Database Index",
          description: "SQL, NoSQL, and advanced data persistence protocol audits.",
          icon: <Layers className="w-6 h-6" />
        },
        {
          title: "Infrastructure",
          description: "Kubernetes, Docker, and cloud-native orchestration protocol audits.",
          icon: <Cpu className="w-6 h-6" />
        },
        {
          title: "Cyber Security",
          description: "Penetration testing, encryption, and secure communication audits.",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "AI & ML Labs",
          description: "LLM integration, model training, and data science protocol audits.",
          icon: <Zap className="w-6 h-6" />
        }
      ]}
      ctaTitle="Browse Topics"
      ctaDescription="Explore our deep repository of topic-specific technical documentation."
      ctaButton="Explore Topics"
      primaryColor="indigo-500"
    />
  );
}
