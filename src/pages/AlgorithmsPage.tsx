import React from "react";
import { Zap, TrendingUp, GitBranch, Target, Cpu, Terminal, Layers } from "lucide-react";
/** High-Fidelity Algorithms Mastery Protocol */
import { useNavigate } from "react-router-dom";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function AlgorithmsPage() {
  const navigate = useNavigate();

  return (
    <GenericContentPage
      title="Algorithms"
      subtitle="Mastery Track"
      heroBadge="Computational Logic"
      heroDescription="Verify mission-critical logic protocols through rigorous computational complexity audits and optimization labs."
      primaryColor="primary"
      sections={[
        {
          title: "Sorting Protocols",
          description: "Quicksort, Mergesort, and Heapsort implementation audits for high-volume data streams.",
          icon: <Target className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/sorting")
        },
        {
          title: "Search Optimization",
          description: "Binary search variations, jump search, and exponential search protocol verification.",
          icon: <Zap className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/searching")
        },
        {
          title: "Graph Traversal",
          description: "BFS, DFS, and shortest-path algorithm audits (Dijkstra, A*) for network coordination.",
          icon: <GitBranch className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/graph")
        },
        {
          title: "Dynamic Programming",
          description: "Overlapping subproblems, optimal substructure audits, and memoization protocols.",
          icon: <Layers className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/dynamic-programming")
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
      ctaOnClick={() => navigate("/practice/lab/algorithms-elite")}
    />
  );
}
