import React from "react";
import { Terminal, Database, Cpu, Globe, Zap, Code2, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function PythonTutorialPage() {
  const navigate = useNavigate();

  return (
    <GenericContentPage
      title="Python"
      subtitle="Engineering Track"
      heroBadge="General Purpose"
      heroDescription="Industrial-grade Python engineering from foundational syntax to advanced distributed automation."
      primaryColor="primary"
      sections={[
        {
          title: "Foundational Syntax",
          description: "Master Pythonic idioms and foundational execution protocols.",
          icon: <Terminal className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/python-basics")
        },
        {
          title: "Data Engineering",
          description: "Pandas, NumPy, and high-performance data manipulation protocols.",
          icon: <Database className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/python-data")
        },
        {
          title: "Backend Services",
          description: "FastAPI and Django industrial-grade API development audits.",
          icon: <Cpu className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/python-backend")
        },
        {
          title: "Automation Labs",
          description: "Complex system automation and orchestration protocol audits.",
          icon: <Globe className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/python-automation")
        },
        {
          title: "Asynchronous I/O",
          description: "Master asyncio and high-concurrency execution protocols.",
          icon: <Zap className="w-6 h-6" />,
          onClick: () => navigate("/practice/lab/python-async")
        }
      ]}
      ctaTitle="Start Python Track"
      ctaDescription="Access the full Python engineering curriculum and laboratory."
      ctaButton="Initialize Learning"
      ctaOnClick={() => navigate("/practice/lab/python-comprehensive")}
    />
  );
}
