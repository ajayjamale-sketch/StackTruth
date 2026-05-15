import React from "react";
import { Globe, Database, Cpu, Zap, Code2, Layers } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function MERNStackPage() {
  return (
    <GenericContentPage
      title="MERN Stack"
      subtitle="Full-Stack Audit"
      heroBadge="Web Ecosystem"
      heroDescription="Industrial-grade full-stack engineering using MongoDB, Express, React, and Node.js."
      sections={[
        {
          title: "Frontend Mastery",
          description: "Advanced React patterns and high-performance UI protocol audits.",
          icon: <Globe className="w-6 h-6" />
        },
        {
          title: "Backend Architecture",
          description: "Node.js and Express industrial-grade API orchestration audits.",
          icon: <Cpu className="w-6 h-6" />
        },
        {
          title: "Document Storage",
          description: "MongoDB indexing, aggregation, and data modeling protocols.",
          icon: <Database className="w-6 h-6" />
        },
        {
          title: "Security Protocols",
          description: "JWT, OAuth, and advanced authentication/authorization audits.",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "Real-time Sync",
          description: "WebSocket and Socket.io industrial communication protocols.",
          icon: <Code2 className="w-6 h-6" />
        },
        {
          title: "Deployment Labs",
          description: "Docker, CI/CD, and cloud-scale deployment protocol audits.",
          icon: <Layers className="w-6 h-6" />
        }
      ]}
      ctaTitle="Start MERN Audit"
      ctaDescription="Access the full-stack MERN laboratory and build global-scale applications."
      ctaButton="Initialize Stack"
      primaryColor="emerald-600"
    />
  );
}
