import React from "react";
import { Layers, Database, Cpu, Shield, Zap, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function DataStructuresPage() {
  const navigate = useNavigate();

  return (
    <GenericContentPage
      title="Data Structures"
      subtitle="Mastery Track"
      heroBadge="Technical Core"
      heroDescription="Industrial-grade mastery of foundational memory organization and data manipulation protocols."
      primaryColor="emerald-500"
      sections={[
        {
          title: "Linear Arrays",
          description: "Master contiguous memory allocation and optimization protocols for high-frequency data access.",
          icon: <Layers className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/linear-arrays")
        },
        {
          title: "Linked Registries",
          description: "Implementation of dynamic memory structures and complex pointer manipulation audits.",
          icon: <Database className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/linked-lists")
        },
        {
          title: "Tree Hierarchies",
          description: "Advanced binary search trees, AVL protocols, and multi-way tree balancing audits.",
          icon: <Cpu className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/trees")
        },
        {
          title: "Graph Networks",
          description: "Complex relationship modeling and traversal algorithms for distributed system audits.",
          icon: <Shield className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/graphs")
        },
        {
          title: "Hash Protocols",
          description: "Collision resolution strategies and high-speed retrieval optimization audits.",
          icon: <Zap className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/hashing")
        }
      ]}
      ctaTitle="Begin Core Audit"
      ctaDescription="Access the full laboratory of data structure challenges and verification protocols."
      ctaButton="Initialize Audit"
      ctaOnClick={() => navigate("/practice/lab/data-structures-comprehensive")}
    />
  );
}
