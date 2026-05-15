import React from "react";
import { Terminal, Database, Cpu, Globe, Zap, Code2 } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function PythonTutorialPage() {
  return (
    <GenericContentPage
      title="Python"
      subtitle="Engineering Track"
      heroBadge="General Purpose"
      heroDescription="Industrial-grade Python engineering from foundational syntax to advanced distributed automation."
      sections={[
        {
          title: "Foundational Syntax",
          description: "Master Pythonic idioms and foundational execution protocols.",
          icon: <Terminal className="w-6 h-6" />
        },
        {
          title: "Data Engineering",
          description: "Pandas, NumPy, and high-performance data manipulation protocols.",
          icon: <Database className="w-6 h-6" />
        },
        {
          title: "Backend Services",
          description: "FastAPI and Django industrial-grade API development audits.",
          icon: <Cpu className="w-6 h-6" />
        },
        {
          title: "Automation Labs",
          description: "Complex system automation and orchestration protocol audits.",
          icon: <Globe className="w-6 h-6" />
        },
        {
          title: "Asynchronous I/O",
          description: "Master asyncio and high-concurrency execution protocols.",
          icon: <Zap className="w-6 h-6" />
        },
        {
          title: "AI Integration",
          description: "Machine learning integration and LLM orchestration audits.",
          icon: <Code2 className="w-6 h-6" />
        }
      ]}
      ctaTitle="Start Python Track"
      ctaDescription="Access the full Python engineering curriculum and laboratory."
      ctaButton="Initialize Learning"
      primaryColor="blue-500"
    />
  );
}
