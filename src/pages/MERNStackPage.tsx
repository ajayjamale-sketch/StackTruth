import React from "react";
import { Globe, Database, Cpu, Zap, Code2, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function MERNStackPage() {
  const navigate = useNavigate();

  return (
    <GenericContentPage
      title="MERN Stack"
      subtitle="Full-Stack Audit"
      heroBadge="Web Ecosystem"
      heroDescription="Industrial-grade full-stack engineering using MongoDB, Express, React, and Node.js."
      primaryColor="primary"
      sections={[
        {
          title: "Frontend Mastery",
          description: "Advanced React patterns and high-performance UI protocol audits.",
          icon: <Globe className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/mern-frontend")
        },
        {
          title: "Backend Architecture",
          description: "Node.js and Express industrial-grade API orchestration audits.",
          icon: <Cpu className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/mern-backend")
        },
        {
          title: "Document Storage",
          description: "MongoDB indexing, aggregation, and data modeling protocols.",
          icon: <Database className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/mern-database")
        },
        {
          title: "Security Protocols",
          description: "JWT, OAuth, and advanced authentication/authorization audits.",
          icon: <Zap className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/mern-security")
        },
        {
          title: "Real-time Sync",
          description: "WebSocket and Socket.io industrial communication protocols.",
          icon: <Code2 className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/mern-realtime")
        }
      ]}
      ctaTitle="Start MERN Audit"
      ctaDescription="Access the full-stack MERN laboratory and build global-scale applications."
      ctaButton="Initialize Stack"
      ctaOnClick={() => navigate("/practice/lab/mern-comprehensive")}
    />
  );
}
