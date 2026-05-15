import React from "react";
import { Bot, Zap, Shield, Cpu, Terminal, Search } from "lucide-react";
import GenericContentPage from "@/components/templates/GenericContentPage";

export default function AIAssistantPage() {
  return (
    <GenericContentPage
      title="AI Assistant"
      subtitle="Neural Audit Lab"
      heroBadge="Intelligent Agent"
      heroDescription="High-fidelity AI-powered code auditing, bug discovery, and architectural optimization protocols."
      sections={[
        {
          title: "Neural Code Review",
          description: "Automated analysis of security vulnerabilities and performance bottlenecks.",
          icon: <Bot className="w-6 h-6" />
        },
        {
          title: "Logic Debugging",
          description: "Intelligent bug discovery and automated remediation protocol audits.",
          icon: <Terminal className="w-6 h-6" />
        },
        {
          title: "Arch Optimization",
          description: "System design suggestions for high-availability and distributed scaling.",
          icon: <Cpu className="w-6 h-6" />
        },
        {
          title: "Security Hardening",
          description: "Automated verification of encryption and authentication protocol audits.",
          icon: <Shield className="w-6 h-6" />
        },
        {
          title: "Knowledge Retrieval",
          description: "Instant access to verified technical documentation and audit registries.",
          icon: <Search className="w-6 h-6" />
        },
        {
          title: "Real-time Pair",
          description: "High-frequency pair programming and live logic verification audits.",
          icon: <Zap className="w-6 h-6" />
        }
      ]}
      ctaTitle="Initialize AI"
      ctaDescription="Activate your personal neural auditor and elevate your engineering protocol."
      ctaButton="Start Chat Protocol"
      primaryColor="purple-600"
    />
  );
}
