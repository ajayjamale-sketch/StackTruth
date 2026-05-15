import React from "react";
import { Shield, Lock, Eye, Database, Globe } from "lucide-react";

const SECTIONS = [
  {
    icon: Shield,
    title: "Information We Collect",
    content: "We collect information you provide directly to us, such as when you create an account, post questions, submit code reviews, or contact us for support. This includes your name, email address, username, profile information, and any content you choose to share on the platform. We also automatically collect certain technical information when you use StackTruth, including your IP address, browser type, device identifiers, and usage analytics to improve our services.",
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: "We use the information we collect to provide, maintain, and improve StackTruth's services. This includes personalizing your experience, displaying relevant questions and job opportunities, powering our reputation system, enabling AI-assisted code reviews, facilitating team collaboration features, and communicating with you about platform updates. We process your data based on legitimate interests in providing a functional developer community platform.",
  },
  {
    icon: Eye,
    title: "Information Sharing & Disclosure",
    content: "Your public profile information, questions, answers, and code reviews are visible to other StackTruth users by default. We do not sell your personal information to third parties. We may share anonymized, aggregated analytics data with partners. We will disclose information when required by law or to protect the safety and integrity of our platform and users. Recruiter accounts may view public developer profiles and reputation scores.",
  },
  {
    icon: Database,
    title: "Data Retention & Security",
    content: "We retain your account data for as long as your account is active. You may request deletion of your account and associated personal data at any time through your profile settings. We implement industry-standard security measures including encryption at rest and in transit, regular security audits, and access controls to protect your information. Code submitted for review is processed securely and not shared beyond the review context.",
  },
  {
    icon: Globe,
    title: "Your Rights & Choices",
    content: "You have the right to access, correct, or delete your personal information. You can manage your notification preferences, control profile visibility, and opt out of non-essential communications from your account settings. If you are located in the EEA, you have additional rights under GDPR including data portability and the right to restrict processing. To exercise any of these rights, contact our privacy team at privacy@stacktruth.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-sm text-[10px] font-black uppercase tracking-widest border border-primary/20">
          <Shield className="w-4 h-4" /> Legal Protocol
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Last updated: May 14, 2026 • Effective immediately</p>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          At StackTruth, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data when you use our developer knowledge and collaboration platform.
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
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Questions About Your Privacy?</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Contact our privacy team at <span className="text-primary font-bold">privacy@stacktruth.com</span></p>
      </div>
    </div>
  );
}
