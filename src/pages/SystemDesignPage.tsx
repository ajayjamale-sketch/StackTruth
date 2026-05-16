import React from "react";
import { Shield, Zap, Award, CheckCircle, ArrowRight, Network, Database, Cpu, Globe, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function SystemDesignPage() {
  const navigate = useNavigate();

  return (
    <GenericContentPage
      title="System Design"
      subtitle="Mastery Track"
      heroBadge="Architectural Audit"
      heroDescription="Master the deployment and scaling of high-concurrency clusters and atomic data integrity protocols."
      primaryColor="amber-600"
      sections={[
        {
          title: "Load Balancing",
          description: "Global traffic distribution, health monitoring, and failover coordination protocols.",
          icon: <Globe className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/load-balancing")
        },
        {
          title: "Distributed Caching",
          description: "Redis clustering, eviction policies, and eventual consistency audit protocols.",
          icon: <Zap className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/caching")
        },
        {
          title: "Database Sharding",
          description: "Horizontal scaling, shard key selection, and cross-shard consistency audits.",
          icon: <Database className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/sharding")
        },
        {
          title: "Message Queues",
          description: "Asynchronous processing, event-driven architecture, and dead-letter queue protocols.",
          icon: <Layers className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/message-queues")
        },
        {
          title: "Microservices",
          description: "Service discovery, circuit breakers, and distributed tracing audit protocols.",
          icon: <Network className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/microservices")
        }
      ]}
      ctaTitle="Initialize Architect Audit"
      ctaDescription="Access the full architectural laboratory for advanced system design verification."
      ctaButton="Join Architect Lab"
      ctaOnClick={() => navigate("/practice/lab/system-design-elite")}
    />
  );
}
