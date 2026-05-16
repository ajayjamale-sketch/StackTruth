import React from "react";
import { Zap, Target, Search, Share2, GitBranch, Terminal } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

import { useNavigate } from "react-router-dom";

export default function AlgorithmsPage() {
  const navigate = useNavigate();

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
          icon: <Search className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/search-optimization")
        },
        {
          title: "Sorting Protocols",
          description: "Industrial-grade sorting algorithms and memory-efficient ordering audits.",
          icon: <Zap className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/sorting-protocols")
        },
        {
          title: "Dynamic Strategy",
          description: "Optimization through memoization and bottom-up computational protocols.",
          icon: <Target className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/dynamic-strategy")
        },
        {
          title: "Graph Traversal",
          description: "BFS, DFS, and shortest path protocols for complex network analysis.",
          icon: <Share2 className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/graph-traversal")
        },
        {
          title: "Greedy Heuristics",
          description: "Local optimization strategies for complex global constraint resolution.",
          icon: <GitBranch className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/greedy-heuristics")
        },
        {
          title: "Backtracking",
          description: "Exhaustive search protocols for complex state-space exploration audits.",
          icon: <Terminal className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/backtracking")
        }
      ]}
      ctaTitle="Initiate Logic Audit"
      ctaDescription="Access advanced algorithmic challenges and performance verification labs."
      ctaButton="Start Algorithm Audit"
      primaryColor="emerald-500"
    />
  );
}
