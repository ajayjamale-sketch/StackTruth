import React from "react";
import { Zap, Target, Search, Share2, GitBranch, Terminal } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function AlgorithmsPage() {
  return (
    <GenericContentPage
      title="Algorithms"
      subtitle="Execution Protocols"
      heroBadge="Computational Logic"
      heroDescription="Professional-grade optimization and problem-solving protocols for complex industrial logic."
      sections={[
        {
          title: "Search Optimization",
          description: "Master binary search variants and high-speed data retrieval protocols.",
          icon: <Search className="w-6 h-6" />
        },
        {
          title: "Sorting Protocols",
          description: "Industrial-grade sorting algorithms and memory-efficient ordering audits.",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "Dynamic Strategy",
          description: "Optimization through memoization and bottom-up computational protocols.",
          icon: <Target className="w-6 h-6" />
        },
        {
          title: "Graph Traversal",
          description: "BFS, DFS, and shortest path protocols for complex network analysis.",
          icon: <Share2 className="w-6 h-6" />
        },
        {
          title: "Greedy Heuristics",
          description: "Local optimization strategies for complex global constraint resolution.",
          icon: <GitBranch className="w-6 h-6" />
        },
        {
          title: "Backtracking",
          description: "Exhaustive search protocols for complex state-space exploration audits.",
          icon: <Terminal className="w-6 h-6" />
        }
      ]}
      ctaTitle="Initiate Logic Audit"
      ctaDescription="Access advanced algorithmic challenges and performance verification labs."
      ctaButton="Start Algorithm Audit"
      primaryColor="emerald-500"
    />
  );
}
