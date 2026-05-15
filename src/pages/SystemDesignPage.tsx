import React from "react";
import { Network, Server, Database, Shield, Globe, Cpu } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function SystemDesignPage() {
  return (
    <GenericContentPage
      title="System Design"
      subtitle="Architectural Audits"
      heroBadge="Infrastructure"
      heroDescription="Industrial-grade architectural design for high-availability, distributed engineering ecosystems."
      sections={[
        {
          title: "Distributed Systems",
          description: "Master CAP theorem trade-offs and consistency protocol audits.",
          icon: <Network className="w-6 h-6" />
        },
        {
          title: "Load Balancing",
          description: "Traffic management protocols and high-availability redirection audits.",
          icon: <Server className="w-6 h-6" />
        },
        {
          title: "Scalable Databases",
          description: "Sharding, replication, and multi-region data synchronization protocols.",
          icon: <Database className="w-6 h-6" />
        },
        {
          title: "Microservices",
          description: "Decoupled architecture and inter-service communication protocol audits.",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "Global CDNs",
          description: "Edge computing and low-latency content delivery network audits.",
          icon: <Globe className="w-6 h-6" />
        },
        {
          title: "Caching Layers",
          description: "Multi-tier caching strategies and invalidation protocol audits.",
          icon: <Cpu className="w-6 h-6" />
        }
      ]}
      ctaTitle="Begin Design Audit"
      ctaDescription="Access the architectural laboratory and design your next global ecosystem."
      ctaButton="Initialize Design"
      primaryColor="purple-500"
    />
  );
}
