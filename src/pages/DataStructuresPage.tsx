import React from "react";
import { Layers, Database, Cpu, Shield, Zap, Code2 } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function DataStructuresPage() {
  return (
    <GenericContentPage
      title="Data Structures"
      subtitle="Mastery Track"
      heroBadge="Technical Core"
      heroDescription="Industrial-grade mastery of foundational memory organization and data manipulation protocols."
      sections={[
        {
          title: "Linear Arrays",
          description: "Master contiguous memory allocation and optimization protocols for high-frequency data access.",
          icon: <Layers className="w-6 h-6" />
        },
        {
          title: "Linked Registries",
          description: "Implementation of dynamic memory structures and complex pointer manipulation audits.",
          icon: <Database className="w-6 h-6" />
        },
        {
          title: "Tree Hierarchies",
          description: "Advanced binary search trees, AVL protocols, and multi-way tree balancing audits.",
          icon: <Cpu className="w-6 h-6" />
        },
        {
          title: "Graph Networks",
          description: "Complex relationship modeling and traversal algorithms for distributed system audits.",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "Hash Protocols",
          description: "Collision resolution strategies and high-speed retrieval optimization audits.",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "Buffer Management",
          description: "Stack and Queue implementation for low-level system communication protocols.",
          icon: <Code2 className="w-6 h-6" />
        }
      ]}
      ctaTitle="Begin Core Audit"
      ctaDescription="Access the full laboratory of data structure challenges and verification protocols."
      ctaButton="Initialize Audit"
    />
  );
}
