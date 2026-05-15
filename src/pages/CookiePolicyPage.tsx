import React from "react";
import { Cookie, Settings, BarChart3, Shield, ToggleRight } from "lucide-react";

const SECTIONS = [
  {
    icon: Cookie,
    title: "What Are Cookies?",
    content: "Cookies are small text files stored on your device when you visit StackTruth. They help us remember your preferences, understand how you use our platform, and improve your experience. Cookies may be set by us (first-party cookies) or by third-party services we use for analytics and functionality. Session cookies are temporary and deleted when you close your browser, while persistent cookies remain until they expire or you delete them.",
  },
  {
    icon: Settings,
    title: "Essential Cookies",
    content: "These cookies are necessary for StackTruth to function properly and cannot be disabled. They include authentication cookies that keep you logged in, CSRF protection tokens, theme preference storage (dark/light mode), and session management cookies. Without these cookies, core features like posting questions, submitting code reviews, and accessing your dashboard would not work correctly.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Performance Cookies",
    content: "We use analytics cookies to understand how users interact with StackTruth, which pages are most visited, and where users encounter issues. This data helps us improve platform performance and user experience. Analytics data is aggregated and anonymized. We use tools like Web Vitals to monitor page load times and interaction responsiveness. You can opt out of analytics cookies through your browser settings or our cookie preferences panel.",
  },
  {
    icon: Shield,
    title: "Third-Party Cookies",
    content: "Some cookies are placed by third-party services we integrate with, including GitHub and Google for social authentication, and embedded content providers. These third-party cookies are governed by their respective privacy policies. We do not use advertising cookies or tracking pixels for targeted advertising. Social login providers may set their own cookies when you authenticate through their services.",
  },
  {
    icon: ToggleRight,
    title: "Managing Your Cookie Preferences",
    content: "You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies, though this may affect your StackTruth experience. Essential cookies cannot be disabled as they are required for platform functionality. To clear existing cookies, access your browser's privacy settings and select 'Clear browsing data.' For more granular control, look for 'Cookie settings' or 'Site permissions' in your browser preferences.",
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-sm text-[10px] font-black uppercase tracking-widest border border-primary/20">
          <Cookie className="w-4 h-4" /> Legal Protocol
        </div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Cookie Policy</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Last updated: May 14, 2026 • Effective immediately</p>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          This Cookie Policy explains how StackTruth uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are, why we use them, and your rights to control their use.
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
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cookie Preferences</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Questions about cookies? Contact <span className="text-primary font-bold">privacy@stacktruth.com</span></p>
      </div>
    </div>
  );
}
