import React from "react";
import { FileText, Scale, AlertTriangle, Users, Gavel } from "lucide-react";

const SECTIONS = [
  {
    icon: FileText,
    title: "Acceptance of Terms",
    content: "By accessing or using StackTruth, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the platform. These terms apply to all visitors, users, and contributors including developers, experts, recruiters, and administrators. We reserve the right to update these terms at any time, and continued use constitutes acceptance of modifications.",
  },
  {
    icon: Users,
    title: "User Accounts & Responsibilities",
    content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to provide accurate, current, and complete information during registration. You must not impersonate another person or entity. Each user is allowed one account. Expert and Recruiter accounts are subject to additional verification processes. You agree not to use automated tools to create accounts, post content, or manipulate the reputation system.",
  },
  {
    icon: Scale,
    title: "Content & Intellectual Property",
    content: "By posting questions, answers, code snippets, or articles on StackTruth, you grant us a non-exclusive, worldwide, royalty-free license to display, distribute, and make your content available to other users. You retain ownership of your original content. Code submitted for review remains your intellectual property. You must not post content that infringes on third-party copyrights, patents, or trademarks. All StackTruth branding, design elements, and platform code are protected intellectual property.",
  },
  {
    icon: AlertTriangle,
    title: "Prohibited Conduct",
    content: "Users must not: post spam, misleading, or malicious content; harass, threaten, or abuse other users; attempt to manipulate voting, reputation, or ranking systems; reverse engineer or scrape the platform; share malware or exploit security vulnerabilities without responsible disclosure; use the platform for unauthorized commercial purposes; or circumvent access controls or moderation decisions. Violations may result in temporary suspension or permanent ban at our discretion.",
  },
  {
    icon: Gavel,
    title: "Limitation of Liability & Disputes",
    content: "StackTruth is provided 'as is' without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Code review suggestions and AI-generated recommendations are provided for informational purposes and should not be considered professional security audits. Any disputes shall be resolved through binding arbitration in accordance with applicable laws. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-sm text-[10px] font-black uppercase tracking-widest border border-primary/20">
          <FileText className="w-4 h-4" /> Legal Protocol
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Terms of Service</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Last updated: May 14, 2026 • Effective immediately</p>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Welcome to StackTruth. These Terms of Service govern your access to and use of our developer knowledge and collaboration platform. Please read these terms carefully before using our services.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((section, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 shadow-sm space-y-4 hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <section.icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{section.title}</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 text-center space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Have Questions About These Terms?</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Reach out to our legal team at <span className="text-primary font-bold">legal@stacktruth.com</span></p>
      </div>
    </div>
  );
}
